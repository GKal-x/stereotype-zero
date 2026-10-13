"""Check that a locally built APK contains the complete offline game."""
from pathlib import Path
import re
import zipfile

root = Path(__file__).resolve().parents[1]
apk = root / 'dist/stereotype-zero-0.13.0.apk'
with zipfile.ZipFile(apk) as archive:
    html = archive.read('assets/stereotype-zero.html')
    assert html == (root / 'android/build/assets/stereotype-zero.html').read_bytes()
    assert html.count(b'data:image/png;base64,') == 8
    assert b'window.CityAtlas=' in html
    assert b'root.CityPixels=' in html
    assert b'root.CityRooms=' in html
    assert b'window.SupervisorAtlas=' in html
    assert b'window.MemoryAtlas=' in html
    assert b'window.FamilyAtlas=' in html
    assert b'window.AdultAtlas=' in html
    assert b'window.ScoutAtlas=' in html
    assert b'window.YouthAtlas=' in html
    assert b'root.CityLife=' in html
    assert b'NOTES' in html
    assert b'root.CityOpening=' in html
    assert b'window.CityCinematics=' in html
    assert b'Keep the ball in play' in html
    assert b'root.CityMemories=' in html
    assert b'Take control of Aris' in html
    assert b'Validate and pass the gates' in html
    assert b'Read the next reply' in html
    assert b'Walking pace: Extra slow' in html
    assert b'cast-source.png' not in html
    assert b'buildings-source.png' not in html
    assert html.count(b'data:image/svg+xml;base64,') == 1
    assert not re.search(rb'<script\b[^>]*\bsrc\s*=', html)
    assert 'classes.dex' in archive.namelist()
print('APK contains refined character atlas, restored textured building atlas, offline street reference, compiled Activity and exact bundled game HTML.')
print('APK bytes:', apk.stat().st_size)
