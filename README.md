# Stereotype Zero

Playable first chapter: **Before the Last Train**, a fictional Kato Patisia block.

## Play

On your Android phone, sign into GitHub and open [the Android releases](https://github.com/GKal-x/stereotype-zero/releases). Open the newest preview, expand **Assets**, download `stereotype-zero-0.2.0.apk` and open it to install. No computer or Android Studio is needed. The app requires Android 8.0 or newer; physical-device testing is still pending.

GitHub builds, tests and signs an APK whenever changes are pushed to `main`. Each successful build creates a release with a directly downloadable APK and also keeps a workflow artifact. The repository is private, so sign in with an account that can access it. See [Android installation and build instructions](android/README.md).

Open `index.html` in a modern browser. All scripts, graphics and music are local. Press **Step outside**. Hold the left thumbstick to walk; release to stop after the current step. Press **A** beside a person or doorway, or tap them to walk over and interact. Tap empty pavement to walk to that tile. **B** closes dialogue. The top-left menu holds the journal, bag, saves and directions. The phone and music buttons sit at the top right. Keyboard: WASD/arrows, Z/Enter, X/Escape, J for journal, P for phone.

Version **0.2.0** replaces the first prototype's primitive figures and dashboard with directional character sprites, detailed apartment/kiosk/shop art, a following camera, time-based walking, dialogue portraits and larger touch controls. Existing saves use the same format and signing key. The overworld remains a single fictional chapter; this revision improves its presentation and input.

For a local server, from this directory:

```powershell
node serve.js
```

Then open <http://127.0.0.1:8765>. The server binds only to localhost. Stop it with Ctrl+C. Direct file access works without a server; browser-local saves may be restricted under file URLs.

## Build portable edition and music sketches

```powershell
node build.js
```

Outputs `dist/stereotype-zero.html`, a single-file edition, and original WAV street/battle sketches. The audio sketches mirror the melody direction; live music additionally uses filtered noise and interaction sounds. The single file can be copied to another computer. Use the Android APK on phones, where browsers may restrict opening HTML from the Files app.

## Check

```powershell
node --test engine.test.js motion.test.js
node --check game.js
node --check art.js
node --check audio.js
```

Read [DESIGN.md](DESIGN.md) for the character, map, dialogue, economy, encounter math, music and scope. The [art brief and atlas notes](assets/README.md) describe the new assets. Research context remains in [the Athens dossier](research/research-dossier.md).

This prototype uses placeholder prices and fictional people/places. Its browser game is also packaged in an offline Android APK. It lives separately from Waxlog and uses no Waxlog data, credentials or code.
