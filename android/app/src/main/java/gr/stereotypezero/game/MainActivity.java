package gr.stereotypezero.game;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Insets;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebResourceError;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Button;
import android.widget.LinearLayout;
import java.io.ByteArrayInputStream;

/** Offline, dependency-free shell for the bundled single-file game. */
public final class MainActivity extends Activity {
    private static final String GAME_URL = "https://appassets.androidplatform.net/";
    private WebView web;
    private final Handler startupHandler = new Handler(Looper.getMainLooper());
    private LinearLayout startup;
    private TextView startupText;
    private Button retry;
    private long startupStarted;
    private boolean startupFailed;
    private final Runnable startupCheck = new Runnable() {
        @Override public void run() {
            if (web == null || startupFailed || isFinishing()) return;
            web.evaluateJavascript("Boolean(document.getElementById('boot') && document.getElementById('boot').hidden && document.querySelector('#overlay [role=dialog]'))", ready -> {
                if (isFinishing() || startupFailed) return;
                if ("true".equals(ready)) {
                    startup.setVisibility(View.GONE);
                } else if (SystemClock.uptimeMillis() - startupStarted > 90000) {
                    startupError("The game did not finish opening. Tap Retry. Your saved game is kept.");
                } else {
                    if (SystemClock.uptimeMillis() - startupStarted > 15000) startupText.setText("Still opening the neighbourhood…");
                    startupHandler.postDelayed(this, 500);
                }
            });
        }
    };
    private void startupError(String message) {
        startupFailed = true;
        startupHandler.removeCallbacks(startupCheck);
        startupText.setText(message);
        retry.setVisibility(View.VISIBLE);
        startup.setVisibility(View.VISIBLE);
    }

    @Override public void onCreate(Bundle savedState) {
        super.onCreate(savedState);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(23, 43, 41));
        setContentView(root);
        // Respect status/navigation bars and display cutouts, including Android 15 edge-to-edge.
        root.setOnApplyWindowInsetsListener((view, insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                Insets safe = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                view.setPadding(safe.left, safe.top, safe.right, safe.bottom);
            } else {
                view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                    insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        web = new WebView(this);
        web.setTag("game-web");
        web.setBackgroundColor(Color.rgb(23, 43, 41));
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));
        startup = new LinearLayout(this);
        startup.setOrientation(LinearLayout.VERTICAL);
        startup.setGravity(Gravity.CENTER);
        startup.setPadding(32, 32, 32, 32);
        startup.setBackgroundColor(Color.rgb(23, 43, 41));
        startupText = new TextView(this);
        startupText.setText("Opening Stereotype Zero 0.14.0…");
        startupText.setTextColor(Color.WHITE);
        startupText.setTextSize(18);
        startupText.setGravity(Gravity.CENTER);
        startup.addView(startupText);
        retry = new Button(this);
        retry.setText("Retry");
        retry.setVisibility(View.GONE);
        retry.setOnClickListener(view -> recreate());
        startup.addView(retry);
        root.addView(startup, new FrameLayout.LayoutParams(-1, -1));
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setBlockNetworkLoads(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(true);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (GAME_URL.equals(request.getUrl().toString())) return false;
                // Source citations open only after a user tap, in the phone's browser.
                // The game document itself stays offline and never navigates away.
                if (request.isForMainFrame() && request.hasGesture()
                        && "https".equals(request.getUrl().getScheme())
                        && !"appassets.androidplatform.net".equals(request.getUrl().getHost())) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, request.getUrl()));
                    } catch (ActivityNotFoundException error) {
                        Toast.makeText(MainActivity.this, "No browser is available to open the source.", Toast.LENGTH_SHORT).show();
                    }
                }
                return true;
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                if (GAME_URL.equals(request.getUrl().toString())) {
                    try {
                        // Stream the APK asset: do not pass the entire large document
                        // through loadDataWithBaseURL and a generated data URL.
                        return new WebResourceResponse("text/html", "UTF-8", getAssets().open("stereotype-zero.html"));
                    } catch (java.io.IOException error) {
                        runOnUiThread(() -> startupError("The bundled game could not be read. Tap Retry."));
                    }
                }
                if ("data".equals(request.getUrl().getScheme())) return null;
                return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
            }
            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) startupError("The game could not open (" + error.getErrorCode() + "). Tap Retry. Your save is kept.");
            }
            @Override public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                root.removeView(view);
                view.destroy();
                web = null;
                startupError("The display stopped while opening the game. Tap Retry. Your save is kept.");
                return true;
            }
        });
        startupStarted = SystemClock.uptimeMillis();
        web.loadUrl(GAME_URL);
        startupHandler.postDelayed(startupCheck, 500);
    }

    @Override protected void onPause() {
        if (web != null) {
            web.evaluateJavascript("window.dispatchEvent(new Event('stereotype-zero-pause'));", null);
            web.onPause();
        }
        super.onPause();
    }

    @Override protected void onResume() {
        super.onResume();
        if (web != null) {
            web.onResume();
            web.evaluateJavascript("window.dispatchEvent(new Event('stereotype-zero-resume'));", null);
        }
    }

    @Override public void onBackPressed() {
        new AlertDialog.Builder(this).setTitle("Leave the block?")
            .setMessage("Your evening will be saved. Choose Continue a saved evening next time.")
            .setPositiveButton("Save and leave", (dialog, which) -> {
                web.evaluateJavascript("window.dispatchEvent(new Event('stereotype-zero-pause'));", result -> finish());
            }).setNegativeButton("Keep playing", null).show();
    }

    @Override protected void onDestroy() {
        startupHandler.removeCallbacks(startupCheck);
        if (web != null) {
            ((FrameLayout) web.getParent()).removeView(web);
            web.destroy();
        }
        super.onDestroy();
    }
}
