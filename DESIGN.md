# Stereotype Zero — first playable chapter

## Status and scope

An original, local browser prototype for the Android-oriented game discussed in the research dossier. This is a small playable chapter and its design specification, not the complete game or a native Android release. All cast, dialogue and block layouts are fictional. Prices are balance placeholders. The broader research remains unfinished.

The first chapter tests one proposition: a trip around the block can combine a material goal, a relationship and a pleasurable destination. Estimated first-play target: 8–15 minutes, to be validated with playtests. The game clock advances through actions rather than real elapsed time.

## Character: Aris

24; lives with his sister Eleni in a borrowed family room in Kato Patisia; studies while taking stockroom shifts. Makes music on an old laptop. His immediate want is payment for four hours of work. His longer ambition is to finish studying and release a demo. The exact institution and course remain fictional and unspecified until their schedules and geography are researched.

Visual: ochre T-shirt, dark trousers, worn green shoulder bag, short dark hair. The warm shirt separates him from the sage streets and makes his small sprite readable. Canvas sprite: approximately 16 × 26 pixels including marker/shadow; portrait: 64 × 64 pixels. All directions use a shared base with face/hair differences. Movement uses a modest two-pose step animation. These are implemented starter sprites, not final animation sheets.

Voice: observant, dry, occasionally impatient. He can listen or rush, make promises or admit uncertainty. The game does not define one correct personality. Income, stress and relationships change through decisions; poverty is not a character defect.

Eleni: sister, 21, preparing for an exam. Wants practical cooperation and honest communication. She offers care but has a schedule and needs of her own. No romantic route.

Mina: adult coworker. Her hours were cut. Carries a dated rota photo. Listening makes support available; rushing still gives access to evidence. Do not make basic evidence conditional on performing affection.

Dimos: adult old friend, setting up a small basement gig. Wants Aris there and wants his music heard. A promise creates expectations; an honest uncertain answer leaves room for a different response.

Supervisor: a fictional adult workplace character. Minimizes the unpaid shift, shifts responsibility, then discusses a partial payment. The battle concerns the dispute. No claim is made about a real employer.

Romance and sexual relationships are part of the wider design, not implemented in this introductory cast. Future adult partners need their own attraction, boundaries, consent and independent choices; trust alone must not purchase a romance.

## Art and feel

Top-down pixel city, 512 × 352 logical pixels, 16-pixel tiles, nearest-neighbor scaling. Muted sage, limestone, faded peach and ochre; terracotta accents; warm window light. A cream handheld surround separates playable space from the darker journal/HUD area.

Recognizable details: stacked balconies, apartment entrances, AC units, laundry, potted plants, kiosk stock, awnings, café furniture, traffic markings, trolley wires, bins, posters and station signage. Original Greek signs give texture; dialogue is English in this version. The map represents a composite block inspired by the neighborhood, not a surveyed location.

Ambient cars and pedestrians are visual life, not autonomous agents. They cannot kill or trap the player. Static collision applies to building rectangles; smaller props are decorative in this prototype. Motion reduction freezes ambient traffic and marker bobbing.

The final game needs original expanded sprite sheets, localized fonts and dialogue, authored interiors, accessibility review, more varied NPCs and a geographically researched block layout. No Pokémon characters, music or copied interface assets are used.

## First-level layout

```text
NORTH
┌────────────────┬──────────┬──────────────────────┐
│ HOME / ELENI   │ KIOSK    │ STOCKROOM / WAGES    │
├────────────────┴──────────┴──────────────────────┤
│               EAST–WEST STREET          MINA    │
├────────────┬─────────────┬───────┬────────────────┤
│ CAFÉ       │ FLATS      │       │ MARKET         │
│            │ SHADE     │ ROAD  │                │
├────────────┴── DIMOS ───┤       ├────────────────┤
│                SECOND STREET                    │
├────────────────────────┴───────┴────────────────┤
│ BASEMENT GIG                     ILEKTRIKOS     │
└─────────────────────────────────────────────────┘
SOUTH
```

All nine interaction points are reachable. The whole map stays visible, reducing navigation friction. Tap a marked location to find a collision-aware path, or walk manually. Every 12 successful tile steps advances one minute; dialogues and errands have explicit time costs. No timer advances while a player reads or pauses.

## Level flow and teaching

1. **Step outside, 17:20.** Intro gives three concrete threads: collect wages, deliver groceries, attend the gig. Start position is close to home.
2. **Learn A through a conversation.** Home offers a sister scene, delivery, rest, or an early ending. Phone offers an honest update.
3. **Discover evidence and support.** Mina provides the rota through either conversation branch; listening also enables the ally command.
4. **Read an encounter.** Supervisor scene teaches three reply types before battle starts. Commands show costs and prerequisites.
5. **Turn recovery into agency.** Wages expand the budget. Groceries can also be bought with starting funds; a perfect battle is not required to provide dinner.
6. **Make room for someone.** Dimos offers a promise or an honest uncertainty. The bench restores energy at a time cost.
7. **Choose an ending.** Go to the gig or stay home. The scene reflects wages, groceries, arrival time and the choice of company. There is no dead-end game-over screen.

The train marker is a boundary preview with the real Line 1 station sequence. It does not consume a ticket or pretend a second district exists. Full transit, institutions, political factions, drugs and romance are not crammed into the first block; later chapters will introduce them through specific stories.

## Implemented commands and inputs

| Context | Keyboard | Touch / handheld |
| --- | --- | --- |
| Walk | WASD or arrows | Hold D-pad |
| Interact / confirm | Z or Enter | A or Interact |
| Back | X or Escape | B |
| Journal / bag / instructions | J | Start |
| Phone | P | Select |
| Choose menu option | Arrows, Tab; Z confirms | Tap option |
| Walk to marked location | Click marker | Tap marker |
| Audio | Sound button | Sound button |
| Save/load | Save/load buttons | Save/load buttons |

The first-level battle command set is complete for its one encounter. Physical combat, recruitment, skill trees and equipment progression are separate future designs.

## Encounter rules: the unpaid shift

Win condition: reduce dispute pressure from 68 to zero. Player stress is shared with the overworld. Stress reaching 100 produces a €12 settlement and recovery to 65 stress, rather than death. Leaving pays nothing and resolves the evening's attempt. Victory pays €24 once. Settlement leaves another €12 narratively owed, with no second collection possible in this chapter.

Each valid decision costs 2 game minutes. The next opponent reply cycles through **stall → blame → offer**. The hint names the counter. Invalid/unavailable commands consume no time or resources. Resolution happens before an opponent reply, so a winning move cannot also cause a loss.

| Command | Effect | Condition / reply |
| --- | --- | --- |
| Explain | −12 pressure; +6 stress | Counter adds 10 / 14 / 8 stress |
| Show the rota | −24 pressure; extra −12 against stall | Requires rota; once; counter applies |
| Set a boundary | −16 pressure; extra −12 against blame | Costs 6 energy; counter applies |
| Negotiate | −14 pressure; extra −12 against offer | Costs 4 energy; counter applies |
| Breathe | −18 stress | No opponent counter this turn |
| Call on Mina | −20 pressure; −8 stress | Trust at least 2; once; counter applies |
| Eat a snack | +18 energy; −12 stress | Consumes snack; no counter |
| Walk away | Ends encounter; −12 stress | No wages; no counter |

Worked route: listen to Mina → show rota against stall (68→32) → boundary against blame (32→4) → negotiate against offer (4→0). Explain also allows victory without Mina, while food and breathing permit recovery. There are no random rolls or hidden type advantages.

Energy and stress clamp to 0–100. Money uses integer cents. The bench costs 10 minutes for +12 energy/−10 stress. Home rest costs 15 minutes for +20 energy/−12 stress. Costs are stated before the player commits.

## Dialogue specification

Dialogue is authored and deterministic. It never calls an AI service. Short scenes establish a person's desire, then give a clear response choice. Non-repeatable changes use flags so repeated conversations cannot farm trust.

Sample exchange, implemented:

> Mina: “Before you go in—can I tell you what happened with my shifts?”
>
> Aris: “Yeah. I’ve got a minute.”
>
> Mina: “They cut my hours too. Here—our rota. Your name is on Thursday. I can back you up.”

Alternate: “Just send me the photo, please.” Evidence still arrives; personal support does not. This is a small consequence, not a permanent morality judgment.

The journal exposes prototype trust values for debugging and comprehension. The eventual narrative UI should communicate more of this through behavior. Trust is not the entirety of a relationship. Full ensemble events, conflicting obligations and attraction remain to be built.

## Music specification

Original procedural chiptune, started by an explicit Sound button for browser audio policy and user choice. Street loop: approximately 73 BPM if four scheduling steps form a beat; 32 sixteenth-note steps, A-minor pitch material, square lead, triangle bass and filtered synthesized noise. Battle: 100 BPM on the same interpretation, 16 steps, more continuous lead. Volume is low by default.

The melodies are original sequences in `audio.js`. They are an initial direction, not a claim to reproduce a particular Athens music scene. Oscillator tones supply short interaction feedback. Audio stops scheduling while the tab is hidden. No recordings, samples, external music requests or copyrighted tunes are used.

Future palette: separate authored themes for home, station, street, live venue and intimacy; local-scene research before writing stylistically specific music; Greek musicians' participation if desired. Exportable WAV sketches can be generated with `node build.js`.

## Architecture and controlled simulation

`engine.js`: deterministic world state, collision, routing, resource updates, relationship effects, battle rules, ending state, validation and save serialization. Independent of the DOM and tested with Node.

`game.js`: input, authored scenes, HUD and canvas renderer. UI mode prevents movement during conversations/battles. Click paths use breadth-first search across the 32 × 22 grid.

`audio.js`: Web Audio synthesis. Music schedules a short lookahead rather than one oscillator per render frame.

`index.html` / `style.css`: responsive handheld interface, buttons and live text. No external dependencies or backend. Save state remains in browser storage under a game-specific key. Invalid saves fail without replacing the current state.

City complexity is bounded: nine places, three relationship values, a small inventory, explicit flags, one encounter, two ending destinations. Ambient movement is separate from the story clock. Later district state should likewise use a finite set of conditions and authored events rather than simulating every person in Athens.

## Validation and open issues

Eleven automated tests cover reachable locations, collision/mode locks, shopping, one-time delivery, battle counters, social prerequisites, victory/settlement/exit, recovery, a complete chapter, early/on-time/late arrival and save validation. Arriving early at the venue advances the ending clock to the 19:00 set; arriving exactly at 19:00 counts as on time. JavaScript syntax checks are required alongside them.

Browser visual/input and physical Android checks must be recorded separately; automated engine tests do not establish their success. Small-screen panels are scrollable. This first pass does not have full screen-reader map navigation, controller API input, localized Greek dialogue, native Android packaging, in-app interiors or the wider district network. No APK is supplied.

Review questions: Does Aris feel specific? Does the battle feel expressive rather than bureaucratic? Can players find Mina without hints? Are the time costs worth their narrative consequences? Does the gig feel like a reward? Which parts of the art feel convincingly Athens, and which need local correction?
