# Original chip score — 0.14.0

Sixteen original musical themes plus one deliberate silence cue. None transcribes a commercial song. The remembered Tsopana Rave camp song remains a named reference, not its melody or recording.

## Sound and form

Two pulse voices (12.5%, 25% or 50% duty), a 32-step triangle bass that also handles kick transients, and a deterministic 15-bit LFSR noise voice for hats and snare. This is an original chip instrument, not a cycle-accurate NES/Game Boy emulator. Short note gates replace the former soft synthesizer envelopes. Every theme has a sixteen-bar form, with melodic development, changing register and a final turnaround. Four monophonic voices stay within their own time slots.

The game and WAVs use the exact same renderer: unsigned 8-bit PCM, 22,050 Hz, mono. Pulse waves are centred to avoid DC offset. The live AudioBuffer is populated from the same quantised bytes. Room transitions crossfade and pausing suspends playback. Audio is enabled through the music button; the game remains offline.

## Place and narrative

| Cue | Place / mood | Arrangement |
|---|---|---|
| Patision after sundown | Streets | Minor-key rock pulse riff, moving bass, backbeat |
| Under the pavement | Basement venue | Faster garage/punk pulse lead, clipped power arpeggios, noise fills |
| What the rota says | Wage/social confrontation | Tense semitone motif and tight rock rhythm |
| Paint still drying | Home / kitchen | Quieter pulse melody, warm arpeggios, no drum groove |
| Ball against the low wall | Childhood living room / courtyard | Playful major motif and light percussion |
| Maps between the pages | Bedroom / classroom reading | Spacious minor-mode arpeggios and a high answering phrase |
| Deers patrol | Scout centre | Modal call and response, light rhythmic pulse |
| Canvas and evening light | Camp | Original communal melody; not the Tsopana Rave song |
| Another pair of hands | Camp task | Purposeful, lighter variation rather than hostile battle music |
| Before the bell at Ipitou | School / campus | Restrained melody with an unsettled turnaround |
| Change at the counter | Supermarket | Busy short notes and lighter rhythm |
| Fluorescent weight | Stockroom / engineering lab | Slow doom riff, sustained fifths, sparse lead |
| Under the green line | Station | Metallic pulse arpeggios and clipped rail-like percussion |
| Rail joints northbound | Train | Faster rolling rhythm and a rising answering phrase |
| Victoria, people passing | Victoria | Urban minor rock groove with a distinct lead |
| The sky changes | Omen / December | Slow dungeon-synth mood, sustained bass and dark arpeggios |
| No score over the testimony | Police-station recollection / final news | Intentional silence |

The rock and garage palette supports the protagonist’s guitar, record collecting and underground venue life. Doom and dungeon moods are reserved for weight and uncertainty, rather than making every Athens neighbourhood sound threatening. This is a compositional brief, not a claim to represent all Greek music or to reproduce a particular artist.
