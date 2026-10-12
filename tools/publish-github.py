"""Publish this standalone prototype to a new private GitHub repository.

Uses the existing Git Credential Manager login without printing credentials.
The publish operation requires PyNaCl to encrypt the Android signing secret.
"""
import argparse
import base64
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
LIBRARIES = ROOT / '.android-tools' / 'python-libs'
sys.path.insert(0, str(LIBRARIES))
REPO = 'GKal-x/stereotype-zero'


def credential():
    env = dict(os.environ, GIT_TERMINAL_PROMPT='0', GCM_INTERACTIVE='never')
    result = subprocess.run(['git', 'credential', 'fill'],
        input='protocol=https\nhost=github.com\n\n', text=True,
        capture_output=True, check=True, env=env, timeout=30)
    values = dict(line.split('=', 1) for line in result.stdout.splitlines() if '=' in line)
    if not values.get('password'):
        raise RuntimeError('No existing GitHub login found in Git Credential Manager.')
    return values['password']


def request(token, path, method='GET', body=None):
    data = None if body is None else json.dumps(body).encode()
    headers = {'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'StereotypeZeroBuild',
        'Content-Type': 'application/json'}
    req = urllib.request.Request('https://api.github.com' + path, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=45) as response:
        raw = response.read()
        return json.loads(raw) if raw else None


def git(folder, *args):
    env = dict(os.environ, GIT_TERMINAL_PROMPT='0', GCM_INTERACTIVE='never')
    result = subprocess.run(['git', '-C', str(folder), *args], capture_output=True,
        text=True, env=env, timeout=120)
    if result.returncode:
        raise RuntimeError('Git operation failed: ' + result.stderr.strip())
    return result.stdout.strip()


def export_source():
    folder = Path(tempfile.mkdtemp(prefix='stereotype-zero-github-'))
    files = ['.gitignore', 'README.md', 'DESIGN.md', 'QA.md', 'index.html', 'style.css',
        'engine.js', 'engine.test.js', 'game.js', 'audio.js', 'build.js', 'serve.js',
        'setup-android.ps1', 'build-android.ps1', 'android/README.md']
    for directory in ['android/app/src', '.github', 'research', 'tools']:
        base = ROOT / directory
        if base.exists():
            files.extend(str(path.relative_to(ROOT)) for path in base.rglob('*')
                if path.is_file() and '__pycache__' not in path.parts)
    for name in files:
        destination = folder / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / name, destination)
    git(folder, 'init', '-b', 'main')
    git(folder, 'add', '--all')
    staged = git(folder, 'diff', '--cached', '--name-only').splitlines()
    if any(any(part in path for part in ['.android-tools/', '/signing/', '.keystore', 'dist/', '/build/', '.env']) for path in staged):
        raise RuntimeError('Export contains a generated file or secret; refusing to publish.')
    git(folder, '-c', 'user.name=GKal-x', '-c', 'user.email=231666646+GKal-x@users.noreply.github.com',
        'commit', '-m', 'Add Stereotype Zero first chapter and Android APK workflow')
    return folder, len(staged)


def publish(token):
    from nacl.public import PublicKey, SealedBox
    profile = request(token, '/user')
    if profile['login'].lower() != 'gkal-x':
        raise RuntimeError('Existing GitHub login does not match the intended account.')
    try:
        request(token, '/repos/' + REPO)
    except urllib.error.HTTPError as error:
        if error.code != 404:
            raise
    else:
        raise RuntimeError('Repository already exists. Refusing to overwrite it; inspect it first.')
    key_path = ROOT / 'android/signing/prototype.keystore'
    if not key_path.is_file():
        raise RuntimeError('Build locally once to create the persistent prototype signing key.')
    folder, count = export_source()
    repo = request(token, '/user/repos', 'POST', {
        'name': 'stereotype-zero', 'private': True, 'auto_init': False,
        'description': 'An original Athens social survival RPG prototype. Offline Android chapter and GitHub APK builds.'})
    print('Created private repository:', repo['html_url'], flush=True)
    public = request(token, '/repos/' + REPO + '/actions/secrets/public-key')
    box = SealedBox(PublicKey(base64.b64decode(public['key'])))
    encrypted = base64.b64encode(box.encrypt(base64.b64encode(key_path.read_bytes()))).decode()
    request(token, '/repos/' + REPO + '/actions/secrets/STEREOTYPE_ZERO_KEYSTORE_B64', 'PUT',
        {'key_id': public['key_id'], 'encrypted_value': encrypted})
    print('Configured encrypted Android signing secret.', flush=True)
    git(folder, 'remote', 'add', 'origin', repo['clone_url'])
    git(folder, 'push', '-u', 'origin', 'main')
    print(json.dumps({'repository': repo['html_url'], 'commit': git(folder, 'rev-parse', 'HEAD'),
        'files': count, 'checkout': str(folder), 'actions': repo['html_url'] + '/actions'}, indent=2), flush=True)


def status(token):
    data = request(token, '/repos/' + REPO + '/actions/runs?per_page=3')
    runs = [{key: run.get(key) for key in ['id', 'html_url', 'name', 'status', 'conclusion', 'head_sha', 'run_number']}
        for run in data['workflow_runs']]
    releases = request(token, '/repos/' + REPO + '/releases?per_page=2')
    print(json.dumps({'runs': runs, 'releases': [
        {'url': release['html_url'], 'assets': [
            {key: asset[key] for key in ['name', 'size', 'browser_download_url']} for asset in release['assets']]}
        for release in releases]}, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('operation', choices=['inspect', 'publish', 'status', 'jobs'])
    parser.add_argument('--run-id', type=int)
    args = parser.parse_args()
    token = credential()
    if args.operation == 'inspect':
        profile = request(token, '/user')
        print(json.dumps({'account': profile['login']}))
    elif args.operation == 'publish':
        publish(token)
    elif args.operation == 'status':
        status(token)
    elif args.operation == 'jobs':
        if not args.run_id:
            parser.error('--run-id is required')
        jobs = request(token, f'/repos/{REPO}/actions/runs/{args.run_id}/jobs')
        print(json.dumps([{'name': job['name'], 'status': job['status'], 'conclusion': job['conclusion'],
            'id': job['id'], 'steps': [{key: step.get(key) for key in ['name', 'status', 'conclusion']}
                for step in job.get('steps', [])]} for job in jobs['jobs']], indent=2))


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as error:
        print(f'GitHub request failed: HTTP {error.code}.', file=sys.stderr)
        sys.exit(1)
    except (RuntimeError, urllib.error.URLError, subprocess.SubprocessError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
