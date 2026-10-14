"""Apply the 0.15.2 walking release metadata and avoid unchanged DOM rewrites."""
from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'game.js';s=p.read_text(encoding='utf-8')
old="prompt.hidden=!p||state.mode!=='explore';"
assert old in s;s=s.replace(old,"const hide=!p||state.mode!=='explore';if(prompt.hidden!==hide)prompt.hidden=hide;")
old="prompt.querySelector('b').textContent=({home:"
assert old in s;s=s.replace(old,"const label=({home:")
old="||p.name;}const id=p?.id"
assert old in s;s=s.replace(old,"||p.name;const text=prompt.querySelector('b');if(text.textContent!==label)text.textContent=label;}const id=p?.id")
p.write_text(s,encoding='utf-8')
for name in ['build-android.ps1','tools/verify-package.py','.github/workflows/android-apk.yml','android/app/src/main/AndroidManifest.xml','android/app/src/main/java/gr/stereotypezero/game/MainActivity.java']:
 p=r/name;s=p.read_text(encoding='utf-8').replace('0.15.1','0.15.2').replace('android:versionCode="1033"','android:versionCode="1035"');p.write_text(s,encoding='utf-8')
p=r/'tools/publish-github.py';s=p.read_text(encoding='utf-8').replace('Refine narrator curls and scout shirt colour','Remove tile-boundary walking pauses and redundant HUD updates');p.write_text(s,encoding='utf-8')
p=r/'.github/workflows/android-apk.yml';s=p.read_text(encoding='utf-8');start=s.index('--notes "');end=s.index(' Android 8.0+.',start);s=s[:start]+'--notes "Continuous held-arrow walking: removes the 180/90 ms stops at tile boundaries while keeping a measured 720 ms outdoor and 760 ms indoor step. Single taps, bounded tap queue, collisions and automatic doors remain. Avoids rewriting unchanged prompts and quest DOM. Adds ten-step continuity tests and sustained native Android arrow-hold coverage. Narrator curls and scout shirt from 0.15.1 retained. Saves supported.'+s[end:];p.write_text(s,encoding='utf-8')
print('Prepared 0.15.2 continuous walking patch.')
