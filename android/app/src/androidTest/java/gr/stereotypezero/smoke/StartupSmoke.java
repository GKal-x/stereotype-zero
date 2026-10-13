package gr.stereotypezero.smoke;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.SystemClock;
import android.webkit.WebView;
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
        if (!latch.await(5, TimeUnit.SECONDS)) throw new AssertionError("WebView did not answer");
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
    private void check(boolean value, String message) { if (!value) throw new AssertionError(message); }
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
            check("true".equals(js(restored, "Array.from(document.querySelectorAll('#overlay button')).some(b=>b.textContent.includes('Open the memory notebook'))")), "Notebook command absent");
            js(restored, "Array.from(document.querySelectorAll('#overlay button')).find(b=>b.textContent.includes('Open the memory notebook')).click()");
            Thread.sleep(800);
            Bitmap screenshot = getUiAutomation().takeScreenshot();
            check(screenshot != null, "Screenshot unavailable");
            File file = new File(getContext().getExternalFilesDir(null), "android-startup.png");
            try (FileOutputStream out = new FileOutputStream(file)) { screenshot.compress(Bitmap.CompressFormat.PNG, 100, out); }
            screenshot.recycle();
            result.putString("result", "PASS");
            result.putString("checks", "actual WebView startup; seven chapters; same storage origin; saved game relaunch; notebook accessible");
            finish(Activity.RESULT_OK, result);
        } catch (Throwable error) {
            result.putString("result", "FAIL");
            result.putString("error", error.toString());
            finish(Activity.RESULT_CANCELED, result);
        }
    }
}
