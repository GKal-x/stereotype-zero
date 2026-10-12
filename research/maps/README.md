# Map source data

`osm-reference.json` records selected geographic feature types from a small OpenStreetMap API extract downloaded on 12 October 2026:

https://api.openstreetmap.org/api/0.6/map?bbox=23.724,38.007,23.740,38.018

**© OpenStreetMap contributors.** OpenStreetMap data is available under the Open Database License, [ODbL 1.0](https://www.openstreetmap.org/copyright). Attribution is also included in the generated SVG and in-game street reference. This extract is retained as geographic source data; it does not establish present-day transit timetables, business operation or social conditions.

Recreate the extract with `tools/fetch-map-reference.py`, then the offline SVG with `node tools/create-reference-map.js`. Updating the reference requires manual review before changing the game's authored geography. The Android game performs no map downloads.
