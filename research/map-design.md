# Athens map design — 0.3

Researched and implemented 12 October 2026. This revision replaces the generic first block with a larger, north-up Kato Patisia chapter and an Athens district overview. Geography informs the layout; homes, businesses, cast positions and narrative events remain fictional.

## What was actually read

- [OpenStreetMap neighborhood view](https://www.openstreetmap.org/#map=15/38.0116/23.7319), visually inspected, and a [small raw OSM API extract](https://api.openstreetmap.org/api/0.6/map?bbox=23.724,38.007,23.740,38.018), downloaded for street, railway, square and station geometry. The extract is retained in `maps/osm-reference.json`; the authoring script creates `assets/kato-patisia-reference.svg` from it. This is street geometry, not evidence about residents' income or behavior.
- [STASY Line 1 station sequence](https://www.stasy.gr/en/timetables/line-1/) and its [network map page](https://www.stasy.gr/en/timetables/map/). The downloadable network diagram currently linked there is dated 2022; the station sequence was checked on the live operator page. Neither is being used to invent an Exarcheia or Nea Filadelfeia Green Line station.
- [Municipality of Zografou bus listing](https://www.zografou.gov.gr/sygkoinwnia/) identifies 608 as Galatsi–Akadimia–Zografou cemetery. An [OASA 2026 notice](https://www.oasa.gr/blog/%CE%BC%CE%B5%CF%81%CE%B9%CE%BA%CE%AE-%CF%80%CF%81%CE%BF%CF%83%CF%89%CF%81%CE%B9%CE%BD%CE%AE-%CF%84%CF%81%CE%BF%CF%80%CE%BF%CF%80%CE%BF%CE%AF%CE%B7%CF%83%CE%B7-%CF%84%CF%89%CE%BD-%CE%BB%CE%B5%CF%89-249/) confirms Patision/Galatsiou in a specifically dated diversion. That notice describes 21 June 2026; it is not treated as today's normal itinerary. The game shows the corridor and route identity, with no live arrivals or claimed stop-by-stop timetable.

## Grounding the local geography

| Anchor | Source observation | Effect on the game |
| --- | --- | --- |
| Kato Patisia station | OSM station node 957182474: 38.0119232, 23.7286475; beside Acharnon | Station quarter on the west, connected to the home quarter by local streets |
| Patision | Named north–south ways near longitude 23.735 | A separate eastern arterial route, not the road through the station |
| Iakovaton | East–west street north of the station, approximately latitude 38.0145–38.0147 | Northern cross street and a second approach through the neighborhood |
| Stratigou Kallari | West of Acharnon at the station's northern approach | Western gateway; it is not extended under that name all the way to Patision |
| Evgeniou Karavia | Extends northeast from Acharnon toward the interior | Local approach to the home quarter, shortened in the game |
| Skiathou | Cross street just south/east of the station | The starting home block's street |
| Sifnou | South of the station | Shopping route and a connection to the evening's music destination |
| Koliatsou square | OSM place node 2865028775: 38.010064, 23.7349337 | Southeast of the station, immediately west of Patision; shade and a rest interaction |
| Spanoudi / Agia Paraskevi squares | Named OSM square ways 280851430 / 302973210 | Distinct open spaces near the station and in the interior, breaking up dense blocks |
| Railway approach | OSM Line 1 ways 82215218 / 993478200 carry `tunnel=yes` around the station | Streets remain walkable above the tunnel; exposed railway outside the approach blocks movement |

The schematic straightens bends and compresses distances. It does not reproduce cadastral boundaries, every street or every crossing. The real street reference retains downloaded geometry, including the railway's curve and tunnel distinction. The local world is an authored adaptation rather than a navigation service.

## Playable structure

The 64 × 48 tile world contains 24 building footprints, three squares, two distinct north–south arterial streets, smaller shopping/residential streets and twelve interaction destinations. The former map was 32 × 22 tiles. The camera follows Aris; the minimap and street-name banner explain where he is.

The first evening occupies a compact central loop: home on the Skiathou block → Mina and the stockroom east of Agia Paraskevi → market on the Sifnou side → home delivery → Dimos and the basement lane. A second loop reaches Koliatsou, the kiosk and Patision. A western detour reaches the station and Spanoudi. Iakovaton and the residential lanes offer alternate approaches, so every errand need not retrace one corridor.

The tests require every destination to be reachable from every other destination, without crossing buildings or exposed tracks. The authored chapter route stays below 180 steps, or fifteen walking minutes on the story clock. Story actions retain their separate costs. The wider map provides orientation; selecting a future district does not teleport Aris or charge a ticket.

## City structure

The solid green route preserves the verified sequence:

Petralona → Thissio → Monastiraki → Omonia → Victoria → Attiki → Agios Nikolaos → Kato Patisia → Agios Eleftherios → Ano Patisia → Perissos → Pefkakia → Nea Ionia.

Patision appears as a separate eastern street corridor. Amerikis and Kypseli branch from that corridor. Exarcheia is an eastern central-city branch, reached through walking streets rather than an invented Line 1 stop. Nea Filadelfeia branches west of the northern railway corridor. Zefyri is a separate northwest journey; its chapter marker has no Green Line connection edge. Exact suburban-rail/bus transfers need further operator-level route research before travel is implemented.

Dashed map connections describe game district branches, not direct scheduled transit services. District labels do not supply danger, poverty or drug rankings. Such story decisions need separate dated local research.

## Usability and progression

- Tap the minimap or press **M**. The map also appears in the journal menu.
- **Neighborhood** shows Aris and numbered destinations. Tap a marker or use the larger destination buttons to start a collision-aware walk.
- **Athens** shows station order and separate districts. Tap a station/district for its connection and chapter availability.
- **Real streets** shows the attributed offline OSM reference. **Fit map / Zoom +** offers an overview or larger labels with drag scrolling.
- The road exits north and south, the station and the 608 bus stop introduce future travel through short scenes. They do not pretend the full city is already playable.
- Old version-1 saves retain quest, inventory, money, clock, relationship, battle and ending data. The player resumes at the corresponding destination on the new map, or the new home-block start if the old position was between places.

## Next geographical production work

Before opening a second chapter, author a district-specific layout with entrances, daily destinations and two or more useful walking routes; verify actual service routes, stop positions, direction and transfer rules. Author building interiors and doorstep interactions. Research district differences at street and household scale. Add crowds and traffic through authored events, with predictable crossings and readable interactions, instead of simply increasing the map's empty area.

## Attribution

Reference geometry and the retained extract: **© OpenStreetMap contributors**, available under [ODbL 1.0](https://www.openstreetmap.org/copyright). The game displays attribution in the street-reference view and identifies the adapted streets in the neighborhood view. STASY/OASA maps and branding were consulted, not copied into game art. The schematic city diagram, graphics, story and interface were authored for this project.
