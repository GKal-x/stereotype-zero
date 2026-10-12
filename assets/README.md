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
