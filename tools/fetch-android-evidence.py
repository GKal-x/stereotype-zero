"""Fetch private Android CI evidence, without forwarding credentials on redirects."""
import argparse
import io
from pathlib import Path
import runpy
import urllib.error
import urllib.request
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument('run', type=int)
parser.add_argument('number', type=int)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
publisher = runpy.run_path(str(root / 'tools/publish-github.py'))
token = publisher['credential']()
metadata = publisher['request'](token, f'/repos/GKal-x/stereotype-zero/actions/runs/{args.run}/artifacts')
artifact = next(a for a in metadata['artifacts'] if a['name'] == f'android-startup-{args.number}')

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

request = urllib.request.Request(artifact['archive_download_url'], headers={
    'Authorization': 'Bearer ' + token, 'User-Agent': 'StereotypeZeroVerification'})
try:
    with urllib.request.build_opener(NoRedirect).open(request, timeout=45) as response:
        raw = response.read()
except urllib.error.HTTPError as error:
    if error.code != 302:
        raise
    with urllib.request.urlopen(error.headers['Location'], timeout=45) as response:
        raw = response.read()
with zipfile.ZipFile(io.BytesIO(raw)) as archive:
    for entry in archive.namelist():
        name = Path(entry).name
        if name not in ['android-startup.txt', 'android-startup.png', 'android-walk.png', 'android-logcat.txt']:
            continue
        target = root / 'dist' / f'run{args.number}-{name}'
        target.write_bytes(archive.read(entry))
        if name == 'android-startup.txt':
            print(target.read_text(encoding='utf-8').encode('ascii', 'backslashreplace').decode())
