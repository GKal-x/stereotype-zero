## Memory sprites 0.7.0

Saved project asset: `assets/memories-v1.png`; measured bounds: `assets/memories-atlas.js`. Built-in imagegen mode, style-reference generation using `cast-refined.png`, not CLI. Original saved source: `C:/Users/gkali/.codex/generated_images/01a13050-441d-75c1-9b4c-832856a699ba/exec-e44f490b-c167-4d7a-95ae-b1fc899da82f.png`. True alpha is preserved. The sprites are provisional fictional depictions, not actual likenesses; original cast assets remain intact.

Generation brief: four columns (front, left, right, back), four rows (six-year-old boy in cream tee/brick-red shorts/blue shoes; same person as young adult scout in teal shirt/mustard neckerchief/navy trousers/brown boots; adult with subtle beard/navy tee/teal pocket/jeans/white shoes; adult woman with wavy brown hair/rust shirt/dark-teal trousers/cream shoes). Match the expressive chibi proportions and clean dark pixel outlines of the reference. Large flat clusters, three shades per material, full bodies, generous transparent separation; no texture, smoothing, ground shadows, text, props or Aris's mustard hoodie. Requested 1536 × 1024. Source bounds are measured from alpha components rather than assumed cell sizes. The child avatar is displayed smaller; the younger brother is smaller again. Walking uses directional poses with the existing motion system; a dedicated multi-frame memory walk sheet remains future art work.

Courtyard, scout details, blue/yellow room palette, parquet, guitar and record crate are code-native artwork in `art.js`. These are simplified fictional layouts inspired by narration and reference photos; the photographs are not included in the repository or APK. The scout avatar is stylised, not an assertion of historical uniform details.

## Supervisor, station and render update 0.6.0

`supervisor-v1.png` is a new transparent generated atlas using `cast-refined.png` as a style reference, made with the built-in imagegen tool (not CLI). Original source is retained at `C:/Users/gkali/.codex/generated_images/01a13050-441d-75c1-9b4c-832856a699ba/exec-e64d7021-1c5c-4a2f-a681-4e276e249036.png`. `supervisor.js` stores measured opaque bounds, in front/left/right/back order. The output has real alpha and is copied into this project. Existing cast and building source files are preserved.

Prompt: Create one middle-aged Athens stockroom supervisor matching the reference cast's chibi proportions, face language and clean dark pixel outlines. Receding dark-grey hair, short moustache, tired eyebrows, dusty blue short-sleeve shirt, charcoal trousers, dark shoes, pen in breast pocket; ordinary person, no villain caricature. Two columns/two rows of the same character, front/left/right/back, neutral standing, whole body, generous transparent separation. Large flat pixel clusters, two or three shades per material, strong silhouette and expressive face. Avoid gradients, glow, soft shading, texture, ground shadows, text, frames and scenery. True transparent background. Requested 1024 square; delivered source dimensions are measured rather than assumed.

Artwork now uses nearest-neighbour reduction and integer display scaling, replacing 0.5.1's smooth reduction. Buildings retain source aspect ratios. Station props, train graphics, interiors and battle reactions are authored in `art.js`; no new raster assets are used for them. Transit side characters temporarily reuse the existing cast's sprites.

## Character refinement 0.4.1

Restores the expressive 0.2 character proportions and identities, replacing the overly minimal 0.4 cast with a light cleanup of the original sheet. `assets/cast-refined.png` is edited from `cast-source.png` using the built-in imagegen tool, with true alpha transparency. `assets/cast-refined.js` contains newly measured frame bounds. Original art is preserved. No claim is made that the edited sheet is human-drawn. Buildings, signs, slower controls and score from 0.4 remain.

Edit brief: preserve all 24 poses, six columns/four rows, faces, hair, body/head proportions, clothing and accessories; reduce detail by only 15–20%, removing speckled texture, glossy highlights and surplus color changes; use deliberate pixel clusters, about three shades per material and consistent outlines; avoid geometric/block characters, blur, gradients and painted filters; transparent 1536 × 1024 atlas. Built-in image tool mode, not CLI.

# Current artwork: revision 0.4

`pixel-art.js` is the live artwork source. It contains original coordinate-drawn 20 × 28 character sprites, Greek/Latin 5 × 7 bitmap lettering, and building drawings. No generated raster artwork or image filters are loaded by the game. Flat color clusters and integer coordinates keep contours readable. Each building position selects a stable palette, balcony/shutter layout, laundry, planting, awnings and roof equipment. Station, stockroom, shop, cafe, kiosk and basement venue have separate details. These are fictional buildings representing local architectural forms, not reproductions of individual addresses. Aris keeps the mustard jacket and shoulder bag; Mina terracotta, Eleni lilac and Dimos teal. The supervisor has an independent grey-clad sprite.

The old PNGs and `atlas.js` below are retained as historical concept references only. They are not included in the portable game or APK.

# Art revision 0.2

Map revision 0.3 also includes `kato-patisia-reference.svg`, generated from downloaded OpenStreetMap geometry by `tools/create-reference-map.js`. It is a code-generated geographic reference, not an image-generation output. **© OpenStreetMap contributors · ODbL 1.0**. See [map sources and adaptation notes](../research/map-design.md) and the [retained source extract](../research/maps/README.md).

Generated with the built-in image generation tool, then copied into this project. These are original Athens character/building concepts; no Pokémon artwork was supplied or copied. The art is an initial production direction, with more varied residents and bespoke interiors still needed.

- `cast-source.png`: 1536 × 1024 transparent atlas. Six columns: Aris neutral, Aris left step, Aris right step, Mina, Eleni, Dimos. Four rows: front, left, right, back. Aris wears a mustard hoodie and olive shoulder bag; Mina terracotta; Eleni lilac; Dimos teal.
- `buildings-source.png`: 1536 × 1024 transparent atlas. Home, kiosk, stockroom, café; flats, market, basement venue, train station.
- `atlas.js`: measured opaque-component bounds used to anchor and crop the source art at runtime. `tools/measure-atlas.py` reads alpha data without changing either image. Runtime drawing normalizes character height and feet placement and uses nearest-neighbor scaling.

## Prompt set

Character brief: Create a clean, original top-down pixel RPG sprite sheet inspired by the readability of Game Boy Advance-era town RPGs. Transparent background; six equally spaced columns, four rows. Columns 1–3 show a young adult Greek man, Aris, with dark messy hair, mustard hoodie, olive crossbody bag, charcoal trousers and white sneakers: neutral, left step, right step. Columns 4–6 show adult coworker Mina with auburn bob and terracotta jacket, sister Eleni with ponytail, lilac sweatshirt and notebook, and musician Dimos with teal overshirt and guitar bag. Rows face down, left, right, up. Crisp pixel clusters, clear silhouettes, consistent proportions and lighting, no lettering, no copied franchise characters.

Building brief: Create an original transparent top-down pixel RPG building atlas for an Athens neighborhood. Eight distinct buildings in four columns and two rows: cream apartment home with balconies, orange-striped kiosk stocked with magazines, grey stockroom entrance, neighborhood café; pastel apartment block with laundry and plants, small market with awning and produce, basement music venue, green-line urban train station. Greek urban details: balcony rails, AC units, shutters, potted plants, signs without legible brand names. Warm limestone, terracotta, muted blues and greens, crisp pixel texture, front-facing roofs and façades in a consistent RPG perspective, generous transparent spacing, no people or copied game assets.

These briefs record the generation direction. The source output is higher resolution than the initial small-sprite request; the renderer crops measured frames and scales them to the game grid. Directional consistency and pixel density should receive human art review before a final art lock.
