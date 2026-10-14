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
        Thread.sleep(80);
        MotionEvent release = MotionEvent.obtain(down, SystemClock.uptimeMillis(), MotionEvent.ACTION_UP, point[0], point[1], 0);
        release.setSource(InputDevice.SOURCE_TOUCHSCREEN);
        check(getUiAutomation().injectInputEvent(release, true), "Touch up failed"); release.recycle();
    }
    private void screenshot() throws Exception { screenshot("android-startup.png"); }
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
            // A disposable test scene exercises real touch events, not only JS clicks.
            js(restored, "(()=>{const s=SZ.fresh();SZ.startMemories(s);s.memory.opening={beat:'explore-home',elapsed:0};s.room='memory-child-bedroom';s.x=7;s.y=8;s.facing='down';const fixture=SZ.snapshot(s);window.addEventListener('pagehide',()=>localStorage.setItem('stereotype-zero-save',fixture),{once:true});location.reload();})()");
            Thread.sleep(800);
            ready(restored);
            waitForUi(restored, "Array.from(document.querySelectorAll('#overlay button')).some(b=>b.textContent.includes('Continue a saved evening'))", "Fixture reload did not reach the saved-game menu");
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Continue a saved evening')).click()");
            Thread.sleep(800);
            check("true".equals(js(restored, "Boolean(document.getElementById('direction-pad') && !document.getElementById('stick-knob') && document.querySelectorAll('[data-move]').length===4)")), "Direction pad absent");
            tap(restored, "[data-move=left]");
            Thread.sleep(190);
            screenshot("android-walk.png");
            Thread.sleep(1060);
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-pause'))");
            check("true".equals(js(restored, "(()=>{const s=JSON.parse(localStorage.getItem('stereotype-zero-save'));return s.x===6&&s.y===8&&s.mode==='explore';})()")), "One arrow tap did not move exactly one tile");
            js(restored, "window.dispatchEvent(new Event('stereotype-zero-resume'))");
            tap(restored, "#sound");
            Thread.sleep(1200);
            check("true".equals(js(restored, "document.getElementById('sound').getAttribute('aria-pressed')==='true'")), "Chip music did not enable after touch");
            screenshot();
            result.putString("result", "PASS");
            result.putString("checks", "actual WebView startup; seven chapters; same storage origin; saved game relaunch; notes accessible; native arrow tap moves one tile; chip music enables");
            finish(Activity.RESULT_OK, result);
        } catch (Throwable error) {
            try { screenshot(); } catch (Exception ignored) { }
            result.putString("result", "FAIL");
            result.putString("error", error.toString());
            finish(Activity.RESULT_CANCELED, result);
        }
    }
}
