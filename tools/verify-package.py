"""Check that a locally built APK contains the complete offline game."""
from pathlib import Path
import re
import zipfile

root = Path(__file__).resolve().parents[1]
apk = root / 'dist/stereotype-zero-0.3.0.apk'
with zipfile.ZipFile(apk) as archive:
    html = archive.read('assets/stereotype-zero.html')
    assert html == (root / 'android/build/assets/stereotype-zero.html').read_bytes()
    assert html.count(b'data:image/png;base64,') == 2
    assert html.count(b'data:image/svg+xml;base64,') == 1
    assert not re.search(rb'<script\b[^>]*\bsrc\s*=', html)
    assert 'classes.dex' in archive.namelist()
print('APK contains both inline atlases, offline street reference, compiled Activity and exact bundled game HTML.')
print('APK bytes:', apk.stat().st_size)
