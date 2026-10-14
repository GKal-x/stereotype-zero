## Arrow controls and original chip score — 0.14.0

Four separate direction arrows replace the analog stick. A short press requests one tile; a new short press during a step can queue one additional step. Holding starts repeating after a 180 ms first delay, with 90 ms between subsequent held steps. Walking takes 640 ms per outdoor tile and 680 ms indoors; the existing Extra slow option adds 180 ms. Keyboard input uses the same movement logic. Cancelling a pointer or losing focus releases held input. Recent-pointer compatibility clicks are suppressed, preventing the duplicate step found in Android runtime testing. Doors still cross automatically and stop further walking.

The memory character rig no longer lifts the torso away from independently translated legs. A one-pixel foot lift keeps the ankle join fixed. Directional source art and Aris’s existing walk frames remain unchanged. This is a restrained rig improvement, not a new hand-drawn walk atlas.

Sixteen original four-voice chiptunes plus an intentional silence cue replace the old soft score. Pulse leads, pulse arpeggios, stepped triangle bass/kick and LFSR drums use sixteen-bar forms. The basement has a faster garage-rock arrangement; streets have minor rock grooves; the work/lab theme is slow doom; omen/December uses dungeon-synth colours. Bedrooms, kitchen, scout rooms and train have deliberate themes. Testimony retains silence. The shared renderer provides actual unsigned 8-bit PCM for live playback and downloadable WAVs; this is not hardware-accurate console emulation. [Music brief and track list](research/music-brief-2026-10.md).

The release includes an optional soundtrack ZIP with the same music used by the game. Existing saves and the storage origin are retained. The Android release gate also exercises a real native arrow tap and enables music through an actual touch event, alongside startup and save recovery.

## Life chapters redesign — 0.13.0

Notes now begin with the next objective, list automatically saved moments and show carried equipment. No page collecting or generic reflection button is required. Previous saves retain their notes and chapter. Later saves do not rewind chapters already passed: begin the memories again to replay the opening.

School teens now use the same displayed height as classmates and a wider pixel-grid silhouette. The childhood helicopter shadow has an identifiable cabin, boom, rotor, skids and a smoke trail. Collected supplies, handouts and notes disappear from the scene and collision map.

Camp keeps two patrols of seven, with distinct jobs and conversations. Three practical encounters replace the fixed-answer quiz. Every task offers two viable approaches with stated effort costs; taking a break restores effort, and leaving retains equipment. The tent is visibly assembled across its three tasks; assemblies gather notes and people. Hyper-ego appears through the impulse to carry everything yourself rather than as a translucent opponent. Aris’s existing wages system is unchanged pending its separate redesign.

December begins with an animated historical cut outside the player’s viewpoint: an officer fires and the teenager falls, without gore or invented dialogue. The player remains at school in Plaka. A compact adapted damaged centre street is playable, with burned frontage, debris, fire, a police cordon and an interaction helping someone get around the debris. Station and family violence are short animated adaptations of the narrator’s testimony. They are not archival reconstructions and do not claim a named station, exact date or officer. A parent recollection is optional in the later home. A return button allows each cut to be skipped; the resulting account remains readable.

Research and issue checklist: [life redesign](research/life-redesign-2026-10.md). The seven chapters are still short playable sketches; a larger geographically detailed December map and a full tactical redesign of Aris’s wages encounter remain future work. Android startup remains streamed with the same save origin, and release publication still requires an actual Android emulator startup/save/relaunch/Notes test.

## Android startup repair — 0.12.1

Preview 21 was reported to show only the native dark background on a phone. Its bundled HTML is roughly 19 MB. The Android host now streams that local asset through the existing appassets origin instead of passing a giant string to loadDataWithBaseURL. Inline images remain allowed; remote loads stay blocked. The same HTTPS origin preserves existing DOM storage. A native loading screen, timeout/error message and Retry action replace silent startup failure.

The Android workflow now builds a separate, same-key instrumentation APK and runs the release APK in an Android 15 emulator before publishing. The smoke check waits for the seven-chapter game and atlases, verifies the storage origin, saves/relaunches the game, opens the notebook and captures a device screenshot. Failed startup prevents release publication; evidence is retained as a GitHub artifact. This is Android runtime validation, beyond the earlier desktop browser and package checks. The test APK is not included in release downloads.

Game content and saves retain the v0.12.0 expansion. Device-specific behavior still needs confirmation on the reporting phone; the exact native cause cannot be proved from the blank screenshot alone.

## A life before Aris — 0.12.0

Seven playable periods now lead to Aris: the childhood opening, Deers scout preparation, a two-patrol summer camp, the Plaka school assembly, December 2008 news and a station recollection, TEI Chalkidas/Psachna, and the shared adult home. These are first-pass authored chapters and compact layouts, not a finished biography or a surveyed city. Erasmus, ISAP and the longer adult years still need expansion.

The memory analogue is a notebook. Exploring books, computers, people and places unlocks pages with source labels; a later margin reflection is saved. Harry Potter and The Lord of the Rings are reading interests, with original prose and adventure-map activities. The kit records gathered water, compass, cord, school handout and lab notes. Gathering is idempotent, and shared equipment is retained when leaving an encounter.

Three nonviolent command encounters introduce Hyper-ego, a school assembly and a campus discussion. Read the concern, then choose Listen, Check, Share or Ask for help; Pause recovers local focus and Step away permits a retry. Insisting alone leaves the concern unresolved. Three appropriate responses complete each encounter and open a notebook page. Focus is a feedback meter and never removes commands or forces an outcome. Local memory encounters never spend Aris money or change his stress/energy. Hyper-ego is a fictional inner voice of self-certainty, not a diagnosis. Existing Aris wages combat remains intact.

The Deers wear ochre T-shirts, green shorts and blue-white scarves. Gerasimos has taller proportions and blond hair; Vaggelis is the protagonist’s height with darker colouring. The camp has seven Deers including the player and seven composite neighbours, tents, visible supplies, conversations and an original camp chiptune. The remembered Tsopana Rave song is named, but its recording, lyrics and melody are not included. Unnamed children reuse the new scout atlas as placeholders. Artwork and final built-in generation prompt: assets/scouts-v2-art-brief.md. Separate teen and student sprites mark the later ages; their prompt is in assets/youth-art-brief.md.

School scenes use Ηπίτου 15, with a classroom, PC and reading corner. Notebook history separates the 2006–07 mobilisation, 6 December 2008 and Law 4009/2011. The independent-student challenge against DAP is placed around 2012–13 from the narrator’s account; no election result or tally is fabricated. The government context and sourced law are separate pages. Tapping a source on Android opens the phone browser; the game stays offline. Composite political dialogue conveys disagreement over party priorities and study needs.

The police-station episode preserves the narrator’s account of being dragged there and hit as a child. It uses an empty bench and optional brief fade; recording the account can avoid the fade. There is no police battle or reward for suffering. Aftermath offers a friend, water, writing and a call home. No officer, station or precise detention date is invented. Research ledger and sources: research/life-chapters-2026-10.md.

Save schema 9 adds notebook pages, margins, gathered kit and resumable encounters. Older saves preserve their period and Aris progress. A new story is needed to experience newly inserted chapters already passed in a later save. All 77 automated tests pass, including connected-room reachability, the complete seven-chapter handover, mode/proximity guards, command retries, kit and notebook persistence, migration, and the existing railway/wages systems. Phone-size browser review and a signed APK accompany delivery; physical-phone touch/audio review remains needed.

Earlier notes follow as release history.

## A shadow overhead — 0.11.0

Begin as a child at home with Omiros. Explore the connected rooms, then roll the ball to start the story. Dad leaves for work; after a little more play Mum sends the children outside. Complete the cooperative ball game and look up. A brief tropical island cut shows only a descending helicopter-like shadow and smoke, then an original bird silhouette crosses above the children. Return through the ordinary doorway and tell Mum. Dad comes home early: “You’re early.” / “Something happened.” Silence and a fade lead automatically to the scout age.

This is an authored, ambiguous adaptation of the supplied story. No explicit impact, named victim, explanation or supernatural claim is shown. The later scout and adult snapshots, handover to Aris, wages encounter and railway journey remain playable; the full life story still needs more chapters. The original bird is not a Pokémon character.

Save schema 8 stores the opening beat and elapsed cutscene time. Previous childhood saves gain the opening while preserving completed rallies and optional object choices; later memories and Aris saves continue where they were. The player cannot walk during scripted moments. Dad follows a clear path with walking animation, ordinary room exploration and doors remain available at the free-play stages, and music changes from childhood to a sparse ominous theme and then silence.

The adult couple's existing costumes and proportions are retained with subtle photo-inspired hair/beard changes. See assets/adults-art-brief.md for the unchanged generated source, final prompt and adaptation limits. Raw photographs and private biography notes are excluded from game exports.

68 automated tests cover the story, timed save recovery, old saves, earlier quests, transport, collisions and score. Browser phone-layout review and a signed offline APK accompany this release; physical-phone playback remains for user review.

Earlier release notes follow for history; the outing-bag opening below is superseded.

## A family afternoon 0.10.0

The childhood opening now starts beside Mum in the living room and follows an authored small story: help get a family outing bag ready, share a record with Dad, and play with Omiros before meeting at the courtyard gate. Fetch a filled bottle from the kitchen and a book from the bedroom, then put both in the living-room bag. The bag cannot be packed by merely drinking water or skipping the items. The journal gives the next concrete task; room doors remain automatic.

The courtyard has a cooperative three-rally encounter: read Omiros and the ball, choose a gentle pass, steady the return, then try the low wall. Wrong choices allow a supportive retry and never cost Aris money, energy or stress. Partial progress is saved. This introduces cues and commands through play, not a family fight. Completing the family tasks and the game leads to a short closing scene before the later scout snapshot. The full childhood years, bereavement and longer autobiography are still future chapters.

Mum and Dad have new original sprites inspired by the supplied later-life photo, interpreted around 30–35. Omiros has a separate small-child sprite inspired by the adult reference. Clothes and period likenesses remain provisional. The family album and journal record maternal grandparents Omiros/Tasoula, paternal grandparents George/Vilma, aunt Io and uncle Manolis, with distinct identities for brother Omiros and grandfather Omiros. Those relatives' appearances and personal voices are not invented in this release. Names/relationships come from the user's account; the afternoon, dialogue and outing are fictional adaptations for review.

Built-in image generation produced the new atlas; see assets/family-art-brief.md for the final prompt and limits. Only stylised sprites are included; the supplied photographs and raw biography remain outside publisher exports. Existing street artwork and other cast are preserved.

Save schema 7 retains outing choices and rally state. Schema 6 saves preserve previously completed ball play, later memories and Aris progress. 65 automated tests cover the chapter, earlier gameplay, interactions, collisions and audio. Phone-size browser checks and signed Android packaging are part of delivery; physical-phone feedback remains needed.

## Connected memories and solid movement 0.9.0

New players start as the child. Existing saves remain available; beginning a new story follows childhood, scouting and adult memories before the explicit handover to Aris. This remains three short adapted periods, not the full autobiography or a completed childhood battle chapter.

The courtyard connects to a childhood living room, bedroom and kitchen. The living room has a television, grey PlayStation with controller, records, books, heavy seating and a dining table; the PC is in the bedroom. Optional Mum and Dad conversations use provisional reused cast appearances and newly authored dialogue, not verified likenesses or remembered quotations. The scout hall includes Gerasimos and Vaggelis, maps and books; its kit room has a canvas tent, compass and equipment bags. The adult home has acoustic/electric guitars, books, records, TV and laptop, with a separate kitchen and bedroom. Layouts are compact adaptations rather than surveyed family floor plans. No personal photographs are exported.

Ordinary doors have visible frames/thresholds. Walking onto a threshold in its crossing direction changes rooms without a confirmation panel. Tapping a door or pressing A nearby walks to it. Holding a direction stops at the doorway before transitioning; arrival is inside the next room to prevent bouncing. Ticket gates still require validation, and scene/time jumps and the Aris handover remain explicit choices.

Tree trunks, street furniture, pots, people, walls and room furniture block movement/pathfinding. Tree canopies can overhang walkable pavement. Omiros, scout friends, Mina and Dimos have short authored patrols, pausing near the player and during dialogue. Both source and destination tiles are reserved during NPC steps. Runtime patrol positions reset on room entry/load; they are not a persistent city simulation. Memory sprites use pixel-grid leg rigging and torso bob to walk; bespoke multi-frame animation sheets remain future artwork.

Conversations and item interactions use compact bottom dialogue boxes with speaker labels and choices. Menus, encounters and chapter cards retain their dedicated panels. Object choices are saved: the television responds on/off, the laptop visibly closes, and record/guitar interactions play an original phrase when music is enabled. Books, computer, kitchen, tent and compass have small contextual actions. They are not full minigames or inventory systems.

58 automated tests cover the existing chapter and score plus solid actors/trees, connected-room routes, doorway arrivals, held-input transitions, ticket checks, NPC reservations, item save recovery and schema 5 migration. Schema 6 moves legacy saves clear of newly occupied tiles while preserving story/resources. Physical-phone review remains needed for the new doors and walking feel.

## Interiors, place scores and movement 0.8.0

Furniture uses code-native pixel art with transparent silhouettes, visible table legs, cabinet fronts, a monitor and keyboard, bedding, upholstered seating, stocked bookshelves, produce crates, labelled cartons, a drum kit, microphone, speaker cones and mixer controls. Existing room footprints and reachable interactions are preserved. Home and scout interiors use warm wooden floors; the basement uses darker tiles. Street buildings and character atlases are preserved.

Eleven original arrangements cover the street, home, market, stockroom, venue, station, train, Victoria square, childhood courtyard, scout centre and wage encounter. Stations share one theme; the two homes share another. Scores crossfade when changing places. Mute remains respected. Offline WAV previews are generated as `dist/score-*.wav`; Android synthesises the same note events without streaming. These are original prototype chiptune arrangements, not final recordings.

Walking now takes 480 ms per outdoor tile or 520 ms indoors, with up to 150 ms added for gentle joystick pressure. Extra slow adds 140 ms. Neutral-zone and axis hysteresis reduce accidental movement and diagonal switching. Each step captures its own duration so changing pressure cannot snap the sprite mid-step. Release finishes the current tile; a changed direction cannot queue another tile after release. Physical-phone touch review is still needed.

50 automated tests pass, including score coverage for every room, distinct deterministic sound events, joystick thresholds, direction release and changing pressure mid-step. Existing saves remain compatible.

## Playable story introduction 0.7.0

Choose **Begin the memories** to play three short adapted scenes: childhood in a Patisia courtyard, preparing together at the scout centre, and an adult shared home inspired by the supplied interior palette. Walk, interact, make small choices and meet each scene's objectives. The final window interaction explicitly hands control to Aris at 17:20 with €8.40 and his original independent quests. An optional fictional musician encounter becomes available in the basement afterward. You can also start directly as Aris or load an existing save.

This is the short introduction prototype discussed in the scenario plan, not the complete 40–50-minute autobiographical prologue. Dialogue, tasks and room plans are adaptations for review, not exact remembered events. Character appearances are provisional, not verified likenesses. Family bereavement, violence, diagnoses, doctoral disputes and other sensitive life events are not depicted in this slice. Raw life-story notes and photographs stay outside the game's publisher exports.

Memory play has its own objectives and age/role HUD, with money and stress meters hidden. B opens the memory journal; its destination buttons walk to interactions, and the journal saves progress. Save schema 5 preserves the scene, visited interactions, choices, handover and optional encounter; earlier saves migrate without losing existing evening or train progress. Childhood walking does not advance Aris's evening clock. Handover resets his resources and quests while preserving the memory record.

45 automated tests cover existing chapter rules plus reachable memory objectives, gates, saved choices, malformed save rejection, schema 4 train migration, independent Aris handover and optional musician continuity. Browser and Android packaging checks are recorded in task delivery; physical-phone review remains needed. The present release reuses the existing original chapter score; a dedicated prologue score and the longer biography remain future work.

## Transit and visual feedback 0.6.0

The first playable rail trip links Kato Patisia to a small Victoria square and returns through Agios Nikolaos and Attiki. Enter the existing Kato Patisia station on Acharnon, buy a €1.20 urban ticket at the machine, validate at the blue gate and board the train. Walk in the carriage, speak to a passenger, then continue to the stop. Tickets activate at validation for 90 story minutes and cover the return while valid. Expired tickets block re-entry; a fictional attendant assistance option prevents players without money becoming stranded. Intermediate districts and the wider line are not playable yet. Station layouts and the eight-minute story trip are authored approximations, not a real timetable or station survey. Four new fictional conversations remember visits; their temporary sprites reuse cast appearances.

Fare/validation references checked 13 October 2026: [OASA useful information](https://www.oasa.gr/en/tickets/useful-information/), [OASA FAQs](https://www.oasa.gr/en/passenger-service/announcements/faqs/), [STASY Line 1](https://www.stasy.gr/en/timetables/line-1/). These support €1.20/90-minute urban tickets, gate validation and stop order. Assistance is a game safeguard, not actual transport policy.

Rendering removes the smoothing introduced in 0.5.1 and uses integer CSS scaling. Building art keeps its source aspect ratio and sits on its existing collision footprint rather than stretching. Interiors gain shelves/books, rugs, sofa, cabinet fronts, posters, stage lights, an amp and smaller furniture details. A new supervisor atlas replaces the block placeholder and matches the cast. Train, machines, gates, carriage windows, seats and line diagram are code-native graphics.

The wage encounter shows both characters in a dedicated stage, with a step forward, supervisor recoil, a paper gesture for evidence and a breathing frame for recovery. Each command opens a result screen with before/after objections, energy and stress. Continue explicitly to the next reply. Recommended counters are starred and the objective is stated: objections must reach zero for €24. Pausing, compromise and leaving remain explicit choices. Reduced-motion settings remove the movement effect.

Save schema 4 adds validated-ticket expiry, station, current trip and remembered transit conversations; schemas 1–3 migrate. Automated coverage includes the full round trip, ticket purchase/expiry, gate blocking, local interaction routes, train save recovery and assistance. Development-only browser fixtures are generated by `node tools/preview-fixtures.js` after building; fixtures are ignored and never packaged in Android.

## Art restoration 0.5.1

Restores the original textured building atlas: balconies, shutters, laundry, worn plaster, shop awnings, rooftop equipment and plants. The flat coordinate façades are no longer used on the street. Original source artwork is preserved; no new generated assets are added.

Character sprites retain the refined cast and increase from 34 to 40 logical pixels tall. Each pose is reduced once with high-quality sampling and cached, then displayed at the game's pixel scale. This avoids the direct nearest-neighbour reduction that discarded small facial and clothing details. Portraits use the same improved reduction. Clear street lettering, 0.5 interiors, conversations, battle choices and slower walking remain.

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

On your Android phone, sign into GitHub and open [the Android releases](https://github.com/GKal-x/stereotype-zero/releases). Open the newest preview, expand **Assets**, download `stereotype-zero-0.7.0.apk` and open it to install. No computer or Android Studio is needed. The app requires Android 8.0 or newer; physical-device testing is still pending.

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
## Individual cast and tactical encounters — 0.15.0

Camp now has thirteen distinct NPC identities across the two patrols. School organiser Iris, friend Yannis, campus spokesperson Leon, independent student Nefeli, train musician Panos, station attendant Nikitas, passengers and shopkeepers have their own directional sprites. Patrol and riot police, plus the supervisor, use the same outlined character style. The protagonist, family and the existing Gerasimos/Vaggelis designs remain. [Art brief and exact generation prompts](assets/ensemble-art-brief.md).

Battles use an original rear-player/front-opponent view, status bars, animated impacts and a four-command menu: **FIGHT / BAG / ALLY / LEAVE**. Attack costs 6 effort; defence blocks 80% of the current reply and restores 8 effort; feint breaks a guard, boosts the next attack and interrupts a heavy move; strong moves cost 18 effort and have three uses. Opponent intent is visible before choosing. Recovery consumes a turn. Friends must be met before their support is available; consumable food is deducted once.

The camp encounter is a friendly tag bout after preparing the kit. School/campus encounters challenge arguments through composure and evidence. Aris can challenge the supervisor for his €24. The optional December cordon encounter opens an escape route; it does not kill an officer or replace the separate station testimony. Defeat permits withdrawal and retry, with gathered equipment retained. Existing chapter and battle saves remain supported. Already completed chapters stay completed; use Begin the memories to replay them.

The seven life chapters remain compact sketches. This release establishes the tactical rules and visual vocabulary; it does not add the full adulthood biography or an entire simulated Athens. Four-arrow controls, restrained attached-foot animation and the original location-specific 8-bit soundtrack from 0.14.0 are retained.

## Narrator sprite correction — 0.15.1

The narrator’s childhood, scout, teenage, student and adult variants have slightly curlier brown hair. Only his scout shirt changes to muted grey-beige based on the supplied reference; the blue-white scarf and green shorts remain. Faces, other outfits and proportions are preserved. Other cast members—including Gerasimos, Vaggelis, Eleftheria and Aris—keep their original source sprites. The separate override atlas also applies to portraits and battle views. Existing saves show the corrected art immediately. [Saved assets and exact edit prompts](assets/personal-sprite-edit-brief.md).

## Continuous held walking — 0.15.2

Holding an arrow now crosses tile boundaries without stopping. The old 180 ms first-repeat pause and 90 ms later pauses are removed. Steps take 720 ms outdoors and 760 ms indoors, preserving a measured pace through a longer continuous animation. Extra slow still adds 180 ms. Short taps keep their one-tile behaviour, a second deliberate tap can queue one step, release finishes only the active step, and doors stop walking normally.

Unchanged nearby prompts and quest entries are no longer rewritten during normal walking. Coverage includes ten continuous steps with uneven frame times, the existing tap/cancellation/collision/door tests, and a sustained native Android arrow hold recorded from the actual controller. Existing saves, character art and music remain compatible.

## Thumb pad and movement feel — 0.15.3

The circular thumb pad returns. One pointer stays captured while the thumb slides between directions or outside the ring. The centre has an 18-pixel activation zone and a 10-pixel release threshold; a 1.35 axis margin keeps small diagonal wobbles from repeatedly flipping direction. Distance from centre never increases speed. The pad keeps four-way tile movement, continuous 720/760 ms walking, deliberate short taps, collision handling and automatic doors. Recentring stops further steps after the active tile. B and A work as before; keyboard and accessible directional commands remain.

Steering before a step begins now uses the latest direction rather than a stale queued direction. Drag steering does not add extra buffered steps. The walking phase continues through turns instead of restarting per tile. Camera and player coordinates use a shared pixel grid, removing camera trailing and subpixel mismatch. Existing saves and sprite artwork are retained.

