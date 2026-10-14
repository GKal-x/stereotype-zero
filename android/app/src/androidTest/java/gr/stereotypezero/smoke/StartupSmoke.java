package gr.stereotypezero.smoke;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.SystemClock;
import android.webkit.WebView;
import android.view.MotionEvent;
import android.view.InputDevice;
import org.json.JSONArray;
import java.io.File;
import java.io.FileOutputStream;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

/** Runs inside an actual Android WebView, against the signed release APK. */
public final class StartupSmoke extends Instrumentation {
    @Override public void onCreate(Bundle arguments) { super.onCreate(arguments); start(); }
    private Activity launch() {
        return startActivitySync(new Intent(Intent.ACTION_MAIN).setClassName("gr.stereotypezero.game", "gr.stereotypezero.game.MainActivity").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
    }
    private String js(Activity activity, String source) throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();
        runOnMainSync(() -> {
            WebView web = activity.getWindow().getDecorView().findViewWithTag("game-web");
            if (web == null) { result.set("null"); latch.countDown(); return; }
            web.evaluateJavascript(source, value -> { result.set(value); latch.countDown(); });
        });
        if (!latch.await(30, TimeUnit.SECONDS)) throw new AssertionError("WebView did not answer within 30 seconds");
        return result.get();
    }
    private void ready(Activity activity) throws Exception {
        long until = SystemClock.uptimeMillis() + 90000;
        while (SystemClock.uptimeMillis() < until) {
            if ("true".equals(js(activity, "Boolean(document.getElementById('boot') && document.getElementById('boot').hidden && document.querySelector('#overlay [role=dialog]') && window.CityMemories && CityMemories.scenes.length===7 && window.CityLife && window.YouthAtlas)"))) return;
            Thread.sleep(400);
        }
        throw new AssertionError("Game did not reach a playable dialog: " + js(activity, "document.body && document.body.innerText.slice(0,500)"));
    }
    private void waitForUi(Activity activity, String condition, String message) throws Exception {
        long until = SystemClock.uptimeMillis() + 90000;
        while (SystemClock.uptimeMillis() < until) {
            if ("true".equals(js(activity, condition))) return;
            Thread.sleep(400);
        }
        throw new AssertionError(message);
    }
    private void check(boolean value, String message) { if (!value) throw new AssertionError(message); }
    private void tap(Activity activity, String selector) throws Exception {
        touch(activity, selector, 80);
    }
    private void touch(Activity activity, String selector, long duration) throws Exception {
        // A freshly created modal exists before WebView has presented its first frame.
        // Wait for paint and the short entrance animation before injecting a real touch.
        js(activity, "window.__smokeTouchReady=false;requestAnimationFrame(()=>requestAnimationFrame(()=>window.__smokeTouchReady=true))");
        waitForUi(activity, "window.__smokeTouchReady && !Array.from(document.querySelectorAll('.overlay.open .scene-panel')).some(p=>p.getAnimations().some(a=>a.playState==='running'))", "Touch target did not settle");
        JSONArray box = new JSONArray(js(activity, "(()=>{const r=document.querySelector(" + org.json.JSONObject.quote(selector) + ").getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2,innerWidth];})()"));
        final float[] point = new float[2];
        runOnMainSync(() -> {
            WebView web = activity.getWindow().getDecorView().findViewWithTag("game-web");
            int[] location = new int[2]; web.getLocationOnScreen(location);
            float scale = (float) web.getWidth() / (float) box.optDouble(2);
            point[0] = location[0] + (float) box.optDouble(0) * scale;
            point[1] = location[1] + (float) box.optDouble(1) * scale;
        });
        long down = SystemClock.uptimeMillis();
        MotionEvent press = MotionEvent.obtain(down, down, MotionEvent.ACTION_DOWN, point[0], point[1], 0);
        press.setSource(InputDevice.SOURCE_TOUCHSCREEN);
        check(getUiAutomation().injectInputEvent(press, true), "Touch down failed"); press.recycle();
        Thread.sleep(duration);
        MotionEvent release = MotionEvent.obtain(down, SystemClock.uptimeMillis(), MotionEvent.ACTION_UP, point[0], point[1], 0);
        release.setSource(InputDevice.SOURCE_TOUCHSCREEN);
        check(getUiAutomation().injectInputEvent(release, true), "Touch up failed"); release.recycle();
    }
    private void screenshot() throws Exception { screenshot("android-startup.png"); }
    private void dragPad(Activity activity) throws Exception {
        JSONArray box = new JSONArray(js(activity, "(()=>{const r=document.getElementById('direction-pad').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2,r.width,innerWidth];})()"));
        final float[] point = new float[3];
        runOnMainSync(() -> {
            WebView web = activity.getWindow().getDecorView().findViewWithTag("game-web");
            int[] location = new int[2]; web.getLocationOnScreen(location);
            float scale = (float)web.getWidth() / (float)box.optDouble(3);
            point[0]=location[0]+(float)box.optDouble(0)*scale;
            point[1]=location[1]+(float)box.optDouble(1)*scale;
            point[2]=(float)box.optDouble(2)*scale/124f;
        });
        long down=SystemClock.uptimeMillis();
        js(activity, "window.__padPhase='centre-start'");
        padEvent(down, MotionEvent.ACTION_DOWN, point, 0, 0); Thread.sleep(160);
        js(activity, "window.__padPhase='right'");
        padEvent(down, MotionEvent.ACTION_MOVE, point, 40, 0); Thread.sleep(450);
        js(activity, "window.__padPhase='outside'");
        padEvent(down, MotionEvent.ACTION_MOVE, point, 90, 0); Thread.sleep(450);
        js(activity, "window.__padPhase='up'");
        padEvent(down, MotionEvent.ACTION_MOVE, point, 0, -40); Thread.sleep(900);
        js(activity, "window.__padPhase='centre-stop'");
        padEvent(down, MotionEvent.ACTION_MOVE, point, 0, 0); Thread.sleep(950);
        padEvent(down, MotionEvent.ACTION_UP, point, 0, 0); Thread.sleep(160);
    }
    private void padEvent(long down, int action, float[] point, float x, float y) {
        MotionEvent event=MotionEvent.obtain(down,SystemClock.uptimeMillis(),action,point[0]+x*point[2],point[1]+y*point[2],0);
        event.setSource(InputDevice.SOURCE_TOUCHSCREEN);
        check(getUiAutomation().injectInputEvent(event,true),"Pad gesture injection failed");event.recycle();
    }
    private void fixture(Activity activity, String name) throws Exception {
        java.io.ByteArrayOutputStream bytes = new java.io.ByteArrayOutputStream();
        try (java.io.InputStream input = getContext().getAssets().open(name + ".json")) {
            byte[] buffer = new byte[4096]; int count;
            while ((count = input.read(buffer)) != -1) bytes.write(buffer, 0, count);
        }
        String saved = new String(bytes.toByteArray(), java.nio.charset.StandardCharsets.UTF_8);
        // Load through the same production save reader, without a reload/pagehide race.
        js(activity, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
        check("true".equals(js(activity, "Boolean(SZ.restore(" + org.json.JSONObject.quote(saved) + "))")), "Invalid test save");
        js(activity, "localStorage.setItem('stereotype-zero-save'," + org.json.JSONObject.quote(saved) + ");document.getElementById('load').click();window.dispatchEvent(new Event('stereotype-zero-resume'))");
        String room = new org.json.JSONObject(saved).getString("room");
        waitForUi(activity, "document.getElementById('game').getAttribute('aria-label').startsWith(CityRooms.rooms[" + org.json.JSONObject.quote(room) + "].name+'.') && document.body.dataset.mode==='explore'", "Fixture did not reach its visible room: " + name);
        Thread.sleep(800);
    }
    private void screenshot(String name) throws Exception {
        Bitmap image = getUiAutomation().takeScreenshot();
        check(image != null, "Screenshot unavailable");
        File file = new File(getTargetContext().getExternalFilesDir(null), name);
        try (FileOutputStream out = new FileOutputStream(file)) { image.compress(Bitmap.CompressFormat.PNG, 100, out); }
        image.recycle();
    }
    @Override public void onStart() {
        Bundle result = new Bundle();
        try {
            Activity activity = launch();
            ready(activity);
            check("true".equals(js(activity, "location.origin==='https://appassets.androidplatform.net'")), "Save origin changed");
            js(activity, "document.querySelector('#overlay button').click()");
            js(activity, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
            check("true".equals(js(activity, "Boolean(JSON.parse(localStorage.getItem('stereotype-zero-save')).memory.life.pages.notebook)")), "Memory save missing");
            runOnMainSync(activity::finish);
            waitForIdleSync();
            Activity restored = launch();
            ready(restored);
            check("true".equals(js(restored, "Array.from(document.querySelectorAll('#overlay button')).some(b=>b.textContent.includes('Continue a saved evening') && !b.disabled)")), "Saved game not available on relaunch");
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Continue a saved evening')).click()");
            js(restored, "document.getElementById('journal').click()");
            check("true".equals(js(restored, "Array.from(document.querySelectorAll('#overlay button')).some(b=>b.textContent.includes('Notes · next step and past moments'))")), "Notebook command absent");
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Notes · next step and past moments')).click()");
            // Reach the bedroom through the real journal route and automatic door.
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Return to the scene')).click()");
            js(restored, "document.getElementById('journal').click()");
            check("true".equals(js(restored, "Array.from(document.querySelectorAll('#overlay button')).some(b=>b.textContent.includes('Go to your bedroom'))")), "Bedroom route absent");
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Go to your bedroom')).click()");
            waitForUi(restored, "document.getElementById('game').getAttribute('aria-label').startsWith('Childhood home · bedroom.')", "Automatic bedroom door did not complete");
            Thread.sleep(800);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
            JSONArray before = new JSONArray(js(restored, "(()=>{const s=JSON.parse(localStorage.getItem('stereotype-zero-save'));return [s.x,s.y];})()"));
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-resume'))");
            check("true".equals(js(restored, "Boolean(document.getElementById('direction-pad') && document.getElementById('stick-knob') && document.querySelectorAll('[data-move]').length===4)")), "Thumb pad absent");
            tap(restored, "[data-move=left]");
            Thread.sleep(190);
            screenshot("android-walk.png");
            Thread.sleep(1060);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
            JSONArray after = new JSONArray(js(restored, "(()=>{const s=JSON.parse(localStorage.getItem('stereotype-zero-save'));return [s.x,s.y,s.room,s.mode];})()"));
            check(after.getInt(0) == before.getInt(0)-1 && after.getInt(1) == before.getInt(1)
                && "memory-child-bedroom".equals(after.getString(2)) && "explore".equals(after.getString(3)),
                "One arrow tap did not move exactly one tile: " + before + " -> " + after);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-resume'))");
            tap(restored, "[data-move=left]");
            tap(restored, "[data-move=left]");
            Thread.sleep(1800);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
            JSONArray quick = new JSONArray(js(restored, "(()=>{const s=JSON.parse(localStorage.getItem('stereotype-zero-save'));return [s.x,s.y];})()"));
            check(quick.getInt(0) == after.getInt(0)-2 && quick.getInt(1) == after.getInt(1), "Two deliberate arrow taps did not move two tiles: " + after + " -> " + quick);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-resume'))");
            tap(restored, "#sound");
            Thread.sleep(1200);
            check("true".equals(js(restored, "document.getElementById('sound').getAttribute('aria-pressed')==='true'")), "Chip music did not enable after touch");
            screenshot();
            // Observe the actual controller during a sustained native arrow press.
            // This hook lives only in instrumentation; the release has no frame-logging work.
            js(restored, "window.__heldWalk=[];window.__walkUpdate=CityMotion.Motion.prototype.update;CityMotion.Motion.prototype.update=function(dt){const result=window.__walkUpdate.call(this,dt);if(this.held==='right'&&this.getState().room==='memory-child-bedroom')window.__heldWalk.push([this.x,this.y,!!this.active]);return result;}");
            touch(restored, "[data-move=right]", 3300);
            Thread.sleep(850);
            check("true".equals(js(restored, "(()=>{const a=window.__heldWalk;return a.length>30&&a.at(-1)[0]-a[0][0]>=3&&a.every(p=>p[2])&&a.every((p,i)=>!i||p[0]>a[i-1][0]);})()")), "Sustained walking paused between tiles");
            js(restored, "CityMotion.Motion.prototype.update=window.__walkUpdate;delete window.__walkUpdate");
            js(restored, "window.__padSamples=[];window.__padUpdate=CityMotion.Motion.prototype.update;CityMotion.Motion.prototype.update=function(dt){const result=window.__padUpdate.call(this,dt);window.__padSamples.push([window.__padPhase,this.x,this.y,this.held,!!this.active]);return result;}");
            dragPad(restored);
            check("true".equals(js(restored, "(()=>{const a=window.__padSamples,c=a.filter(p=>p[0]==='centre-start'),outside=a.filter(p=>p[0]==='outside'),up=a.filter(p=>p[0]==='up'),stop=a.filter(p=>p[0]==='centre-stop').slice(-5);return c.length>2&&c.every(p=>p[1]===c[0][1]&&p[2]===c[0][2])&&outside.length>3&&outside.every(p=>p[3]==='right')&&up.some(p=>p[3]==='up'&&p[2]<c[0][2])&&stop.length===5&&stop.every(p=>p[3]===null&&!p[4]&&p[1]===stop[0][1]&&p[2]===stop[0][2]);})()")), "Pad drag, outside capture, turn or recenter failed");
            js(restored, "CityMotion.Motion.prototype.update=window.__padUpdate;delete window.__padUpdate");
            screenshot("android-pad.png");
            fixture(restored, "cast");
            screenshot("android-cast.png");
            fixture(restored, "camp");
            tap(restored, "#action");
            waitForUi(restored, "Boolean(document.querySelector('.overlay.open .tactical-arena'))", "Camp battle view absent");
            tap(restored, ".choice[data-choice='0']");
            waitForUi(restored, "document.querySelector('.choice[data-choice=\"1\"]').textContent.includes('Brace')", "Defence move absent");
            check("true".equals(js(restored, "(()=>{const p=document.querySelector('.tactical-panel'),last=p.querySelector('.choice-list').lastElementChild;return last.getBoundingClientRect().bottom<=p.getBoundingClientRect().bottom-2;})()")), "Fight moves require scrolling");
            tap(restored, ".choice[data-choice='1']");
            Thread.sleep(190);
            screenshot("android-guard.png");
            Thread.sleep(850);
            check("true".equals(js(restored, "(()=>{const d=JSON.parse(localStorage.getItem('stereotype-zero-save')).memory.life.active.duel;return d.hp===97&&d.effort===78&&d.turn===1;})()")), "Guard did not block the reply and restore effort");
            tap(restored, ".choice[data-choice='0']");
            waitForUi(restored, "document.querySelector('.choice[data-choice=\"1\"]').textContent.includes('Brace')", "Attack command menu did not appear");
            tap(restored, ".choice[data-choice='0']");
            Thread.sleep(900);
            check("true".equals(js(restored, "JSON.parse(localStorage.getItem('stereotype-zero-save')).memory.life.active.duel.foe===54")), "Attack did not reduce opponent stamina");
            js(restored, "document.getElementById('load').click()");
            check("true".equals(js(restored, "Boolean(document.querySelector('.overlay.open .tactical-arena'))")), "Battle save did not resume");
            check("true".equals(js(restored, "(()=>{const p=document.querySelector('.tactical-panel'),last=p.querySelector('.choice-list').lastElementChild;return last.getBoundingClientRect().bottom<=p.getBoundingClientRect().bottom-2;})()")), "Root commands require scrolling");
            screenshot("android-battle.png");
            fixture(restored, "cordon");
            tap(restored, "#action");
            waitForUi(restored, "Boolean(document.querySelector('.overlay.open .tactical-arena'))", "Cordon battle view absent");
            check("true".equals(js(restored, "document.querySelector('.tactical-panel h2').textContent==='A route out'")), "Wrong battle at the cordon");
            Thread.sleep(600);
            screenshot("android-cordon.png");
            result.putString("result", "PASS");
            result.putString("checks", "actual WebView startup; seven chapters; same storage origin; saved game relaunch; notes; automatic door; native pad taps; sustained held walking; centre dead zone; drag outside capture; pad turn and recenter stop; chip music; distinct camp cast; native FIGHT/defence/attack; exact combat effects; battle save resume; police battle view");
            finish(Activity.RESULT_OK, result);
        } catch (Throwable error) {
            try { screenshot(); } catch (Exception ignored) { }
            result.putString("result", "FAIL");
            result.putString("error", error.toString());
            finish(Activity.RESULT_CANCELED, result);
        }
    }
}
