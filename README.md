## Level refinement 0.5.0

Chapter 01 now has four walkable fictional interiors attached to the existing doors: the shared apartment, neighborhood market, stockroom and basement venue. Approach a doorway and press A. Indoors, walk or tap people and objects; furniture blocks movement. B routes to the exit instead of teleporting. Home contains Eleni, a bed, notes and a table; the market has a counter and community board; the stockroom has the supervisor and shift board; the basement has Dimos, a mixer and the stage. Entering the venue no longer ends the chapter: staying for the set does. Home rest is distinct from ending the night. The kiosk remains a pavement counter.

Walking is 360 ms per tile outdoors, 420 ms indoors, and 480 ms with Menu → Walking pace: Extra slow. The setting persists locally. Compared with 0.4.1 outdoor speed is about 32% slower. Release still finishes only the current tile; game time remains step-based.

Eleni, Mina and Dimos each have two additional authored topics about study, dreams, unstable work, keeping records, creative anxiety and friendship. Topics remember visits, award trust/calm only once, and remain readable without repeatedly consuming time. Journal relationships are described in words. Conversations about Eleni’s dream or Dimos’s music can echo in the ending. This is a small first-chapter cast; wider relationship arcs and romance remain future content.

The wage encounter shows resistance, player energy/stress, the current tactic, exact action effects and recent conversation history. Commands are grouped into Speak, Pause/support and Resolve/leave. Evidence counters stalling, boundaries counter blame, negotiation counters an offer. Repeated explanations weaken. At 85+ stress, response strength drops by 25%; recovery does not advance the tactic. Half-pay is an explicit choice when an offer is made or stress is high. Stress never automatically accepts money for the player. Walking away yields no pay. €24 full pay / €12 compromise are unchanged fictional chapter amounts.

Save schema 3 preserves rooms, the exact return doorway and topic memories. Existing schema 1/2 saves migrate; older battles remain resumable. Interiors are authored for play, not actual floor plans. The compact level and city map remain the scope; other districts and transit journeys are future chapters.

Validation: 33 automated tests cover rooms/obstacles and all local interaction routes, a full door-to-door chapter, save migration, conversation replay, counter previews, high stress, explicit settlement, recovery and motion. Browser checks and Android build results are recorded in the task delivery. Physical-phone touch and sound review is still needed.

## Character refinement 0.4.1

Restores the expressive 0.2 character proportions and identities, replacing the overly minimal 0.4 cast with a light cleanup of the original sheet. `assets/cast-refined.png` is edited from `cast-source.png` using the built-in imagegen tool, with true alpha transparency. `assets/cast-refined.js` contains newly measured frame bounds. Original art is preserved. No claim is made that the edited sheet is human-drawn. Buildings, signs, slower controls and score from 0.4 remain.

Edit brief: preserve all 24 poses, six columns/four rows, faces, hair, body/head proportions, clothing and accessories; reduce detail by only 15–20%, removing speckled texture, glossy highlights and surplus color changes; use deliberate pixel clusters, about three shades per material and consistent outlines; avoid geometric/block characters, blur, gradients and painted filters; transparent 1536 × 1024 atlas. Built-in image tool mode, not CLI.

## Revision 0.4 — clearer art, walking and chapter score

The live renderer now uses original coordinate-drawn pixel artwork (`assets/pixel-art.js`), replacing generated PNGs. Greek street signs use a 5 × 7 bitmap font; phone labels use larger system text. Buildings vary palettes, balcony/shutter layouts, laundry, roof equipment and storefronts. The researched map, original warm colors and story are retained. Historical 0.2 art notes below describe superseded assets.

Walking takes 245 ms per tile (previously 155 ms), with a 20% joystick dead zone and 30% axis hysteresis to reduce unintentional turns. Release finishes the current tile. Tap-to-walk is retained. Game minutes still advance per tile, so slower real-time walking does not punish quest timing.

Four original synthesized arrangements share a D-minor motif: sparse street evening (84 BPM), wage dispute (96 BPM with semitone tension), basement soundcheck (108 BPM with offbeat chords), and quiet home ending (72 BPM). A shared event score drives live music and exported WAVs. No recordings or existing songs are used. This is an original mood study, not a claim to reproduce a specific Greek genre. Music remains opt-in. Physical Android sound and touch review is still needed.

# Stereotype Zero

Playable first chapter: **Before the Last Train**, a fictional Kato Patisia block.

## Play

On your Android phone, sign into GitHub and open [the Android releases](https://github.com/GKal-x/stereotype-zero/releases). Open the newest preview, expand **Assets**, download `stereotype-zero-0.5.0.apk` and open it to install. No computer or Android Studio is needed. The app requires Android 8.0 or newer; physical-device testing is still pending.

GitHub builds, tests and signs an APK whenever changes are pushed to `main`. Each successful build creates a release with a directly downloadable APK and also keeps a workflow artifact. The repository is private, so sign in with an account that can access it. See [Android installation and build instructions](android/README.md).

Open `index.html` in a modern browser. All scripts, graphics and music are local. Press **Step outside**. Hold the left thumbstick to walk; release to stop after the current step. Press **A** beside a person or doorway, or tap them to walk over and interact. Tap empty pavement to walk to that tile. **B** closes dialogue. The top-left menu holds the journal, bag, saves and directions. The phone and music buttons sit at the top right. Keyboard: WASD/arrows, Z/Enter, X/Escape, J for journal, P for phone.

Version **0.3.0** adds a researched, north-up Kato Patisia map: 64 × 48 tiles, Acharnon and Patision as distinct streets, three squares, smaller connecting streets, a correctly placed station quarter, a bus-stop scene, a minimap and interactive district overview. Tap the minimap or press **M** for **Neighborhood / Athens / Real streets**, with zoom and destination walking. The [map design and sources](research/map-design.md) explain the compressed geography. Wider districts appear as future chapters; Kato Patisia is playable.

The character art, following camera, smooth walking and thumbstick controls from 0.2 remain. Existing saves keep their story progress and resume at a safe corresponding place on the new map. Install the APK over the previous release to retain them.

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
node --test engine.test.js motion.test.js world.test.js
node --check game.js
node --check art.js
node --check map-ui.js
node --check audio.js
```

Read [DESIGN.md](DESIGN.md) for the character, map, dialogue, economy, encounter math, music and scope. The [artwork source and historical concept notes](assets/README.md) describe the new assets. Research context remains in [the Athens dossier](research/research-dossier.md).

This prototype uses placeholder prices and fictional people/places. Its browser game is also packaged in an offline Android APK. It lives separately from Waxlog and uses no Waxlog data, credentials or code.
