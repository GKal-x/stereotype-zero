from pathlib import Path
root=Path(__file__).resolve().parents[1]
for name in ['build-android.ps1','tools/verify-package.py','.github/workflows/android-apk.yml','android/app/src/main/AndroidManifest.xml','android/app/src/main/java/gr/stereotypezero/game/MainActivity.java']:
 p=root/name;s=p.read_text(encoding='utf-8').replace('0.14.0','0.15.0').replace('android:versionCode="1029"','android:versionCode="1030"');p.write_text(s,encoding='utf-8')
p=root/'tools/verify-package.py';s=p.read_text(encoding='utf-8').replace("== 8","== 14").replace("assert b'Read the next reply' in html","assert b'tactical-arena' in html\n    assert b'root.CityCombat=' in html\n    assert b'window.EnsembleAtlas=' in html");p.write_text(s,encoding='utf-8')
p=root/'.github/workflows/android-apk.yml';s=p.read_text(encoding='utf-8').replace('childhood.test.js life.test.js','childhood.test.js life.test.js combat.test.js');
names=['android-cast.png','android-guard.png','android-battle.png','android-cordon.png']
anchor='            adb pull /sdcard/Android/data/gr.stereotypezero.game/files/android-walk.png dist/android-walk.png'
s=s.replace(anchor,anchor+'\n'+'\n'.join('            adb pull /sdcard/Android/data/gr.stereotypezero.game/files/'+n+' dist/'+n for n in names))
s=s.replace('            dist/android-walk.png','            dist/android-walk.png\n'+'\n'.join('            dist/'+n for n in names))
old='Four direction arrows replace the analog stick. Slower fixed walking pace, first-repeat delay and bounded input queue; attached-foot walking animation. Sixteen original four-voice chiptunes and intentional silence: rock and garage riffs, warm home/book themes, doom and dungeon-synth moods. Shared unsigned 8-bit PCM renderer for live music and WAV soundtrack. Release gated by Android startup, save/relaunch, actual arrow-touch and music-enable checks.'
new='Individual camp, school, campus, train and police characters. Original rear-player/front-opponent battle view with FIGHT/BAG/ALLY/LEAVE, attack, defence, feints, effort and limited strong moves. Contextual friendly tag, debates, wage dispute and optional cordon escape. Existing saves supported. Release gated by Android startup, native arrow and combat touches, save/resume and music checks.'
assert old in s;s=s.replace(old,new);p.write_text(s,encoding='utf-8')
p=root/'tools/fetch-android-evidence.py';s=p.read_text(encoding='utf-8').replace("'android-logcat.txt']", "'android-logcat.txt', "+', '.join(repr(n) for n in names)+']');p.write_text(s,encoding='utf-8')
# Keep the named friend visually consistent through the station aftermath.
p=root/'life-world.js';s=p.read_text(encoding='utf-8').replace("6,4,'mina','Friend'","6,4,'school-yannis','Yannis'").replace("point('hyper-ego','Check the camp plan'","point('hyper-ego','Join the patrol practice'");p.write_text(s,encoding='utf-8')
p=root/'rooms.js';s=p.read_text(encoding='utf-8').replace("{id:'grocer',name:'Shop at the counter',x:7,y:5}","{id:'grocer',name:'Shop with Manos',x:7,y:5,who:'town-manos'}");p.write_text(s,encoding='utf-8')
# Remove obsolete word-only battle presentation, leaving engine compatibility for older saves.
p=root/'game.js';s=p.read_text(encoding='utf-8').replace("  let battleGroup='speak';\n",'')
start=s.index('  function drawMemoryEncounter(');end=s.index('  function driveOpening(',start)
s=s[:start]+s[end:]
start=s.index('  function encounterScene(');end=s.index('  function battle(){',start)
s=s[:start]+s[end:];p.write_text(s,encoding='utf-8')
print('Prepared Android 0.15.0 release.')
