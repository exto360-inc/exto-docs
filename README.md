# Exto Docs

VitePress site. Two books in one tree:

- **The manual** — ten lanes, derived from the product's shipped routes. Every
  screen page follows one skeleton — **List page → Creating → Detail →
  Permissions** — and closes by saying who may do what.
- **The architecture companion** (`architecture/`) — how the application is put
  together, for the people who build it. Application and feature architecture
  only; no infrastructure or deployment detail.

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build          # must be clean
npm run check:links    # build, then verify every internal link resolves
npm run media          # what screenshots and clips are still outstanding
```

`scripts/check-links.mjs` walks the markdown and the sidebar config, so a broken
link is reported at the file and line you can fix.

See [REVIEW.md](REVIEW.md) for what still needs checking against a running
tenant, ordered by risk.

## Media

`<Shot src="area/page" pending />` and `<Clip src="area/task" pending />` render a
placeholder naming the exact file to drop in. Remove `pending` when the file
lands; no other edit is needed.

- Screenshots: `public/screenshots/<area>/<page>-{light,dark}.png`
- Clips: `public/videos/<area>/<task>.mp4`
- Capture at 1440×900 in both themes, against a seeded demo tenant, no real names.

`npm run media` reads the placeholders directly, so the page set is the manifest
— there is no separate list to keep in sync.

Videos are for gestures — drawing a workflow, laying out a workbench. A screenshot
plus numbered steps beats a video for "fill these fields and press Save", and
survives a UI change.

## Conventions

- Permissions are stated in terms the product actually uses: the four
  application roles, and named group permissions as spelled in the source.
- Every page carries a one-line `description` in its frontmatter.
- Diagrams are drawn in the page rather than embedded as images, so they diff in
  review.
