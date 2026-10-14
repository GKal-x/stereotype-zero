from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'art.js';s=p.read_text(encoding='utf-8')
old="const wantX=Math.max(0,Math.min(W-vw,m.x*T+12-vw/2)),wantY=Math.max(0,Math.min(H-vh,m.y*T+12-vh*.55));\n    const ease=1-Math.exp(-dt/85);if(!camera.ready){camera.x=wantX;camera.y=wantY;camera.ready=true;}else{camera.x+=(wantX-camera.x)*ease;camera.y+=(wantY-camera.y)*ease;}"
assert old in s;s=s.replace(old,"Object.assign(camera,window.CityMotion.cameraPosition(m.x*T+12,m.y*T+12,vw,vh,W,H),{ready:true});")
old="const focus=E.Opening.current(s)?.kind!=='explore'&&E.Opening.current(s)?{x:7,y:5}:m,wx=Math.max(0,Math.min(w-vw,focus.x*T+12-vw/2)),wy=Math.max(0,Math.min(h-vh,m.y*T+12-vh*.55)),ease=1-Math.exp(-dt/85);\n    if(!camera.ready){camera.x=wx;camera.y=wy;camera.ready=true;}else{camera.x+=(wx-camera.x)*ease;camera.y+=(wy-camera.y)*ease;}"
assert old in s;s=s.replace(old,"const focus=E.Opening.current(s)?.kind!=='explore'&&E.Opening.current(s)?{x:7,y:5}:m;\n    Object.assign(camera,window.CityMotion.cameraPosition(focus.x*T+12,m.y*T+12,vw,vh,w,h),{ready:true});")
s=s.replace("sprite(c,'aris',m.x*T+12,m.y*T+19,", "sprite(c,'aris',Math.round(m.x*T+12),Math.round(m.y*T+19),")
s=s.replace('x:m.x*T+12,y:m.y*T+19,player:true','x:Math.round(m.x*T+12),y:Math.round(m.y*T+19),player:true')
p.write_text(s,encoding='utf-8')
for name in ['build-android.ps1','tools/verify-package.py','.github/workflows/android-apk.yml','android/app/src/main/AndroidManifest.xml','android/app/src/main/java/gr/stereotypezero/game/MainActivity.java']:
 p=r/name;s=p.read_text(encoding='utf-8').replace('0.15.2','0.15.3').replace('android:versionCode="1035"','android:versionCode="1036"');p.write_text(s,encoding='utf-8')
p=r/'android/app/src/androidTest/java/gr/stereotypezero/smoke/StartupSmoke.java';s=p.read_text(encoding='utf-8').replace("!document.getElementById('stick-knob')","document.getElementById('stick-knob')").replace('Direction pad absent','Thumb pad absent');p.write_text(s,encoding='utf-8')
p=r/'tools/publish-github.py';s=p.read_text(encoding='utf-8').replace('Remove tile-boundary walking pauses and redundant HUD updates','Restore captured thumb-pad steering and tighten pixel camera tracking');p.write_text(s,encoding='utf-8')
p=r/'.github/workflows/android-apk.yml';s=p.read_text(encoding='utf-8');start=s.index('--notes "');end=s.index(' Android 8.0+.',start);s=s[:start]+'--notes "Restored circular thumb pad with captured drag steering, centre dead zone, direction hysteresis and fixed speed. Keeps continuous slow walking, bounded deliberate taps and automatic doors. Latest steering intent replaces stale input. Pixel camera follows without trailing; stride phase continues across turns. Existing saves and character art retained. Native touch, held-walking, combat and save checks gate release.'+s[end:];p.write_text(s,encoding='utf-8')
print('Prepared thumb pad and movement patch 0.15.3.')
