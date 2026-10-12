# First-chapter verification

Date: 12 October 2026.

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

