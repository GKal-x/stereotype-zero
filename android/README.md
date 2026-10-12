# Stereotype Zero for Android

Version 0.3.0 is a signed prototype APK for **Android 8.0 or newer**. It bundles the first chapter, graphics and procedural music. It needs no account, server or internet permission. A reasonably current Android System WebView is required for the JavaScript game.

## Install on your phone

1. On your phone, sign into GitHub and open [Stereotype Zero releases](https://github.com/GKal-x/stereotype-zero/releases). Open the newest Android preview, expand **Assets** and download `stereotype-zero-0.3.0.apk`. You can also transfer a locally built APK using USB or your own Drive.
2. Open the APK in your phone's Files app.
3. If Android asks, open Settings and allow that file manager to **Install unknown apps / Allow from this source**, then return to the installer.
4. Tap **Install**, then **Open**. The launcher icon is called **Stereotype Zero**.
5. Tap **Step outside** to begin. The music-note button enables music. Hold the left thumbstick to walk and release to stop. Press **A** beside a person or doorway, or tap them to walk there. **B** closes dialogue. The top-left menu opens the journal, directions and saves; the top-right phone opens messages.

Reference: [Android's alternative distribution instructions](https://developer.android.com/distribute/marketing-tools/alternative-distribution).

The app saves every 15 seconds and when backgrounded or when leaving through Android Back. On the next launch, choose **Continue a saved evening**. **Save evening** is also available in the journal menu. Saves are stored privately on this device; uninstalling or clearing app storage deletes them. The browser prototype's save does not transfer to Android. Dialogue saves resume on the street; battle and ending saves retain their state. A force-stop or sudden power loss can lose changes since the most recent save. Install this update over the old version to retain its save.

Android Back opens a Save and leave confirmation. The game's **B** button closes conversations. The prototype supports portrait and landscape, with scrolling when necessary.

## Build again on Windows

From the game repository root (the `stereotype-zero` folder in the original workspace), with Node.js available:

```powershell
# Once, after reviewing the linked SDK licence:
./setup-android.ps1 -AcceptAndroidSdkLicense
./build-android.ps1
```

The setup script downloads Eclipse Temurin JDK 17, Android SDK Platform 35 and Build Tools 35 from their official sources. It verifies archive checksums against vendor metadata and extracts them under `stereotype-zero/.android-tools/`. It performs no system installation and does not modify PATH. The Android SDK licence is saved alongside the tools. Build tools and generated output are ignored by Git.

This small shell uses the SDK's AAPT2, javac, D8, zipalign and apksigner directly; Gradle and Android Studio are not required. The build script regenerates the portable game, adds Android layout mode, compiles the Java activity and resources, signs the APK, verifies the signature and alignment, prints its manifest information and writes a SHA-256 file next to the APK.

Keep `android/signing/prototype.keystore` locally for future compatible updates. This is a development certificate with the standard development password, not a production publishing key. Neither the key nor build tools are included in the APK. Future builds must retain this key and application ID to update an installation without uninstalling it. Increment the manifest's versionCode/versionName and the output filename for future versions.

## GitHub builds

The `Stereotype Zero Android APK` workflow runs on pushes to `main` and can also be started using **Actions → Stereotype Zero Android APK → Run workflow**. It uses a Windows runner's Android SDK plus Java 17 and Node 22, runs the game tests, compiles and verifies the APK, uploads an artifact and creates an Android preview release. The release provides a direct APK download for your phone; workflow artifacts are ZIP files.

The persistent development signing key is encrypted in the repository Actions secret `STEREOTYPE_ZERO_KEYSTORE_B64`. Builds stop if that secret is missing instead of silently changing the signing key. CI assigns versionCode `1000 + GITHUB_RUN_NUMBER`, allowing later builds to update earlier previews. The workflow uses no Waxlog signing keys or repository files.

## Implementation and validation

- Package: `gr.stereotypezero.game`, separate from the unrelated Waxlog Android app.
- One native Activity with a WebView loading a single bundled HTML asset through `loadDataWithBaseURL`, using a stable HTTPS origin for localStorage. No JavaScript-to-Java bridge.
- No requested Android permissions. File/content access, network loads and off-page navigation are blocked.
- Status/navigation bars and display cutouts are respected. Background events save progress, stop held movement and suspend WebAudio.
- Official reference: [loading bundled HTML in WebView](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content).

Rules, movement, new map reachability and old-save migration have 24 passing Node tests. The bundled HTML includes both sprite atlases and the attributed street-reference SVG; it needs no network. Tap the minimap for local directions, the Athens overview and the real-street reference. Wider districts are future chapters.

The APK passes compilation, v2/v3 signature verification, zip alignment and manifest/content inspection. The bundled HTML is checked in a phone-size desktop browser. **No Android phone or emulator run has been performed**, so touch behaviour, sound, lifecycle saves and system navigation still need a device check. This is an APK for testing the first chapter, not a Play Store release.
