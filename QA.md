Android runtime testing caught a duplicate activation: touch pointer input was followed by a compatibility click with detail=0, which the keyboard fallback treated as a second press. Direction buttons now suppress recent-pointer compatibility clicks, while a separate pointer press remains an independent input. The native release test checks both one short tap (one tile) and two deliberate rapid taps (two tiles).

## Controls and sound — 0.14.0

85 automated tests pass. New coverage checks one-step taps, the delayed first repeat, queued short presses, pointer cancellation, attached ankle geometry, slower door completion, four monophonic chip channels, sixteen-bar development, deterministic 8-bit PCM, headroom/DC offset, individual room cues and silence.

Android instrumentation has been extended with native touchscreen injection: one short left-arrow tap must move exactly one tile after navigating into the bedroom through its real door, followed by a real music-button tap. Release remains gated on that emulator result. Audio sample/format checks do not substitute for listening on the physical phone; user review of mix and touch feel remains valuable.

## Life redesign — 0.13.0

79 automated checks pass, including both practical encounter strategies, effort recovery and resuming, all seven chapters, every connected-room path, collected prop/interaction removal after reload, and existing Aris/transit/save behavior. JS syntax checks cover the UI and cinematic renderer.

Phone-size browser review checks school character height, camp task commands/costs and outcome text, Notes and December street layout. New film scenes are labelled historical cut or personal recollection. Published Android startup evidence remains required from the release workflow; physical-phone controls/audio still require user feedback.

## Native startup regression — 0.12.1

A user screenshot of preview 21 showed only the Activity background, before the HTML boot screen. Package inspection alone did not catch this. The startup path has been changed from a giant loadDataWithBaseURL string to a streamed APK asset at the same origin, with a visible native loader and retry/error states. Both main and test APKs compile and sign locally; embedded content checks pass.

Release publication is now gated on an Android 15 emulator instrumentation job. It checks initial playable dialog, seven chapters and new atlases, stable origin, save availability on a second launch and opening the memory notebook. Its result and actual Android screenshot are stored in the run’s android-startup artifact. Check that job for the runtime result; a successful package build alone is no longer sufficient. The reporting physical phone remains the final device-specific verification.

## Life-world expansion 0.12.0

77 automated tests pass. New coverage checks two seven-child patrols, notebook/kit idempotence, encounter prerequisites, ordinary-action bypass prevention, zero-focus agency, pauses, exact save recovery, stepping away without losing kit, all seven chapters through the Aris reset, old-save migration and malformed notebook/encounter state. All new destinations and existing interiors remain reachable with furniture/person collisions.

Phone-size browser review at 412×915 verifies a saved Hyper-ego encounter resuming at concern 2/3, appropriate commands reaching completion, a compact two-column command layout, and opening the notebook with the collected kit and new page. Scout sprites use twelve measured views from the unchanged generated PNG, including Gerasimos’s taller proportions. School and student stages have eight additional age-specific views. Browser error logs are empty. Historic facts, personal testimony and composite dialogue are distinguished in the notebook and research ledger.

The signed local APK contains eight embedded PNGs and the full offline game; v2/v3 signatures and packaged HTML are checked. Citation taps are routed to the Android browser without giving the game network access.

The new school/campus layouts, unnamed patrol children and battle feedback are first-pass content. Focus is currently feedback rather than a command gate. Camp music is original and does not reproduce the requested commercial song. Full later-life chapters and physical-device touch/audio QA remain outstanding.

## Childhood shadow opening 0.11.0

68 Node tests pass, including the complete opening route, blocked early exit, Dad's animated departure, cooperative play retries, return-home proximity, unexplained final exchange, automatic age transition, save recovery during the island timer, malformed timing rejection, schema 7 migration and score changes. Existing Aris encounters, railway journeys, doors, collisions and movement checks pass.

Phone-size browser review (412 × 915) confirms compact named dialogue, family framing, the island shadow, absence of explicit impact, and final dialogue. Children in the sky scene are positioned above the dialogue panel. Browser error log is empty. New source modules pass syntax checks. The local signed APK passes v2/v3 signature verification and contains six embedded PNGs, the opening/cinematics modules, all atlases, offline map and compiled Activity; exact packaged HTML is checked. APK version 0.11.0-prototype, local versionCode 1020. No physical Android device was available for a touch/audio playthrough.

The island/sky scenes are an initial code-drawn cinematic pass. Adult likeness refinements are generated from existing art and reference, not hand-drawn sprites. The opening is an adaptation and the full biography remains in development. Historical release notes follow.

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

Validation: 24 rule/map/movement tests pass; changed scripts pass syntax checks. Local Android 0.4.0 compiles, v2/v3 signing and zip alignment pass, versionCode 1004. Package verification confirms the exact bundled HTML, coordinate art, offline SVG and no generated PNG artwork. Browser portraits 390 × 844 and 320 × 640 fit without document overflow; music toggle and a route to Eleni complete. Landscape controls were raised by 6 px to keep the joystick inside the viewport. Physical device listening and thumb-control review remain with the user.

The live renderer now uses original coordinate-drawn pixel artwork (`assets/pixel-art.js`), replacing generated PNGs. Greek street signs use a 5 × 7 bitmap font; phone labels use larger system text. Buildings vary palettes, balcony/shutter layouts, laundry, roof equipment and storefronts. The researched map, original warm colors and story are retained. Historical 0.2 art notes below describe superseded assets.

Walking takes 245 ms per tile (previously 155 ms), with a 20% joystick dead zone and 30% axis hysteresis to reduce unintentional turns. Release finishes the current tile. Tap-to-walk is retained. Game minutes still advance per tile, so slower real-time walking does not punish quest timing.

Four original synthesized arrangements share a D-minor motif: sparse street evening (84 BPM), wage dispute (96 BPM with semitone tension), basement soundcheck (108 BPM with offbeat chords), and quiet home ending (72 BPM). A shared event score drives live music and exported WAVs. No recordings or existing songs are used. This is an original mood study, not a claim to reproduce a specific Greek genre. Music remains opt-in. Physical Android sound and touch review is still needed.

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



## 0.6.0 transit and presentation verification — 13 October 2026

- 38 Node tests pass: original evening, motion and world checks plus ticket activation/expiry, gate blocking, complete outward/return trip, local reachability, train save restore, malformed trip rejection, penniless return assistance and schema 3 migration.
- Browser at 390 × 844: evidence response reduces objections 68 → 32 and opens an explicit result screen; Next reply reveals the blame counter and starred boundary. Both characters appear in the encounter stage and supervisor matches the cast.
- Browser through actual controls: ticket purchase €8.40 → €7.20 at 17:23; gate validation → platform at 17:24; route to train doors and board; carriage destination prompt shows Agios Nikolaos / Attiki; arrive Victoria at 17:32; exit to the small square. Journey rules including reverse route additionally covered by deterministic tests.
- PNG source assets preserved; supervisor has true alpha and measured crop bounds. Canvas smoothing disabled; integer CSS sizing avoids fractional resampling; façades retain aspect ratios. New source-backed supervisor replaces placeholder.
- Local Android 0.6.0 signed with existing key; signature v2/v3, alignment, SDK metadata and three embedded atlases/offline bundle checked. GitHub workflow and release checked at delivery.
- Physical Android graphics, feel, touch and sound still need user review. Victoria is a small authored square; intermediate districts are not playable. Train timing and station plans are fictional. Transit NPCs currently reuse cast appearances.


## 0.7.0 playable memory introduction

- 45 deterministic tests pass, including all existing world, train, motion and wage checks, plus every memory objective's reachability, local action gates, memory dialogue/save recovery, malformed save rejection, schema 4 train migration, fresh independent Aris state after the complete three-scene path, and optional musician continuity without wage/trust rewards.
- Browser 390 × 844: new Begin the memories entry and age/role HUD; walk-to-ball via journal, choose Pass to Omiros, return to exploration. Saved home memory loads with correct avatar and objectives; window interaction opens explicit handover; Take control of Aris restores 17:20 / €8.40, normal map/phone and independent quests.
- Art: separate provisional child, scout, adult and partner sprites with measured alpha bounds; no likeness claims. Shared home uses supplied blue/yellow/parquet/furniture vocabulary in an invented compact layout. Room props and ball effect are native canvas graphics.
- Three adapted moments are a short introduction test, not the complete narrated life. Sensitive raw narration and reference photos stay outside publisher exports. Existing chapter score reused; dedicated prologue score and multi-frame memory walk animation remain future work.
- APK signing, offline package and GitHub build/release results checked at delivery. Physical Android controls, sound, visual clarity and narrative pacing require phone review.

0.8.0: 50 rules/motion/audio tests pass. Android 8+ local APK builds and verifies with v2/v3 signing. Interior browser review uses the offline bundle at phone viewport. New props retain collision footprints; all existing level/memory routes remain reachable. Physical-phone controls and listening feedback remain user review items.

0.9.0: 58 tests pass. Connected memory rooms, solid NPCs/trees, doorway crossings, gate validation and legacy furniture relocation covered. Browser review checks named bottom dialogue and entering a bedroom by movement only. Memory appearances and parent dialogue are provisional adaptations. Full autobiographical chapters and new childhood encounters remain future work.

0.10.0: 65 automated tests cover the family outing, three-rally cooperative encounter, partial save recovery, schema 6 migration and existing rules. New family atlas has 12 measured frames, full alpha range 0–254, unchanged source pixels. Younger appearances and family-afternoon dialogue remain adapted proposals.
