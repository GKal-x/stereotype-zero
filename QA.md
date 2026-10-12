# First-chapter verification

Date: 12 October 2026.

## Athens map revision 0.3.0

- Read the OSM street map and retained a small attributed geometry extract. Checked STASY's Line 1 sequence and official municipal/OASA references for route 608. Sources and the distinction between real streets, compressed gameplay and fictional addresses are documented in `research/map-design.md`.
- 24 Node tests pass. New map tests cover all destination pairs, railway/tunnel access, north/south and east/west anchor relationships, station order, old-save migration and chapter walking budget. Syntax checks cover world, map UI, art, game and audio.
- Browser: loaded the existing 0.2 evening into the new world; €28.20, 17:45 and completed wages/dinner remained. Used the neighborhood map's station destination, walked to Kato Patisia, and verified the station scene at 17:46. The station's Read the Athens map option opens the Athens tab.
- Browser: inspected Neighborhood / Athens / Real streets. Verified selectable Zefyri explains its separate journey; the real-street SVG loads from the bundled edition. At 390 × 844, Zoom + expands the map inside its scroll area (536px content in 315px viewport) while document width remains 390px. Map destinations have separate larger buttons below the diagram. The reference retains attribution, real road geometry and the tunnel distinction.
- Android: local 0.3.0 compilation succeeds; v2/v3 signatures, zip alignment and package metadata pass. Application ID and signing key remain stable, versionCode 1003. The package embeds both PNG atlases and the street-reference SVG. The game requires no map network access.
- This is one expanded playable neighborhood plus an orientation atlas. Other districts, train/bus journeys, building interiors and live timetables are not implemented. Physical Android testing remains pending.

## Art and controls revision 0.2.0

- 18 Node tests pass: 12 engine/routing tests and 6 motion tests. New coverage includes exact pavement destinations, short taps, held input without OS repeat, release/cancellation, blocked movement, arrival timing, save position synchronization and continuous frame time across tile boundaries. Game, art and audio syntax checks pass.
- The portable edition builds with both original PNG atlases embedded. Android compilation, zip alignment, manifest inspection and v2/v3 signature verification pass for `stereotype-zero-0.2.0.apk` (4.39 MB). Same application ID and persistent signing key as the earlier release; versionCode 1002 locally, CI uses 1000 + run number.
- At 390 × 844: no page overflow; HUD, world and thumbstick/A/B deck fit. Inspected directional Aris, Eleni/Mina portraits, kiosk/apartment/stockroom art and the following camera. The eight-command battle fits in a two-column window with the encounter sprites visible above it.
- Browser interaction pass: journal routes to Mina and stockroom; listened for evidence/support; evidence → boundary → negotiate battle paid €24; market purchase left €28.20; walked home and delivered groceries. Journal showed wages and dinner complete. Saved at 17:45 and reloaded to the Continue option. Longer route observations in the browser automation sometimes lagged and required another observation; the final arrivals and interactions were verified.
- Physical Android touch feel has not been tested on a phone or emulator. Desktop automation cannot establish thumb comfort, real device frame rate, audio interruptions or process-death behavior. The supervisor currently reuses a desaturated Dimos sprite; additional resident art and interiors are future work.

The sections below record the earlier 0.1 prototype and are retained as history; its dashboard/D-pad presentation has been replaced.

## Automated

11 Node engine tests pass. Syntax checks pass for game.js and audio.js. The portable HTML and two WAV sketches build successfully with Node, with no dependency installation.

Coverage: all map interaction points reachable; building collision; dialogue movement locks; time updates; shopping limits; one-time delivery; evidence/counter timing; ally prerequisites; payout once; settlement and exit; recovery; complete story path; early/on-time/late arrivals; save round trips and malformed-save rejection.

## Browser checks

Local preview opened successfully after moving the localhost server outside the sandbox. Checked original pixel map, desktop handheld layout, tap-to-walk, Mina dialogue, evidence/support acquisition, the complete evidence → boundary → negotiate battle, €24 payout, quest update, grocery purchase, and save/reload restoration of a completed encounter. Completed the browser chapter through delivery to Eleni, a promise to Dimos and the gig ending, with all three threads marked complete and €28.20 remaining.

After that playthrough, corrected early-gig clock advancement and the exact 19:00 arrival boundary in the engine, with automated coverage; corrected the home conversation label to reflect recovered wages. Rebuilt and opened the portable edition successfully. Those final narrative refinements are covered by code review and engine tests rather than a second full UI playthrough.

At a 390 × 844 viewport, found an intrinsic-width overflow from the physical-control row. Reduced narrow-screen control spacing and button dimensions, and set grid children to min-width: 0. Recheck showed the console fitting the page width and no horizontal document overflow. Battle options remain inside a scrollable panel. Reset the temporary viewport afterward.

Sound button enabled successfully; browser captured no warning/error logs at that check. This does not substitute for listening tests or validation on a physical phone. The Web Audio melody implementation and generated WAV structure were checked in code.

## Remaining device and accessibility work

No native Android APK or physical Android-device test in this pass. Screen-reader-friendly spatial map navigation, longer music arrangements, Greek localization, controller support, detailed touch-target review and broad browser coverage are future work. Economy, dialogue and encounter difficulty still need human playtesting. This is a small first chapter, not the full researched Athens simulation.
# Android prototype 0.1.0

- Built `dist/stereotype-zero-0.1.0.apk`, package `gr.stereotypezero.game`, minimum API 26 (Android 8.0), target API 35.
- Verified APK Signature Scheme v2 and v3, zip alignment, launcher activity and package metadata. Manifest requests no permissions.
- Inspected the APK ZIP: manifest, vector icon, resource table, classes.dex and the complete game HTML are present. Embedded HTML exactly matches the Android build asset and has no external scripts.
- All 11 game engine tests and game/audio JavaScript syntax checks passed.
- Checked the exact Android HTML at a 390×844 browser viewport (375px content width with scrollbar): controls fit and there is no horizontal overflow; map, phone conversation and resources render.
- Sent Eleni an update at 17:22, reloaded the document and continued the save: time 17:22 and stress 13 were retained. Browser warning/error log was empty.
- Android build tools remain under the game's ignored `.android-tools` directory. The signing key is in ignored `android/signing/`; the unrelated root Android project was not modified.
- Not yet tested on an Android device/emulator: installation, native Back, display cutouts, audio interruptions, WebView storage and process death. Desktop browser checks do not establish Android runtime correctness.

