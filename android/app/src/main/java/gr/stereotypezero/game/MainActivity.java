package gr.stereotypezero.game;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Color;
import android.graphics.Insets;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.TextView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/** Offline, dependency-free shell for the bundled single-file game. */
public final class MainActivity extends Activity {
    private static final String GAME_URL = "https://appassets.androidplatform.net/";
    private WebView web;

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
        web.setBackgroundColor(Color.rgb(23, 43, 41));
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));
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
                return true; // All gameplay is in one document; never navigate away.
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
            }
        });
        try (InputStream input = getAssets().open("stereotype-zero.html")) {
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            byte[] buffer = new byte[8192];
            int length;
            while ((length = input.read(buffer)) != -1) output.write(buffer, 0, length);
            // Android's recommended API for a single self-contained HTML document.
            web.loadDataWithBaseURL(GAME_URL, new String(output.toByteArray(), StandardCharsets.UTF_8),
                "text/html", null, GAME_URL);
        } catch (Exception error) {
            TextView message = new TextView(this);
            message.setText("The bundled game could not load. Please reinstall Stereotype Zero.");
            message.setTextColor(Color.WHITE);
            root.addView(message);
        }
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
        if (web != null) {
            ((FrameLayout) web.getParent()).removeView(web);
            web.destroy();
        }
        super.onDestroy();
    }
}
