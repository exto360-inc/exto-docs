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
  review — but as components, not as box-drawing characters in a code fence. A
  fence tells the browser the content is code: monospace, code chrome, a copy
  button, and a fixed column count that runs off the side of a phone.

## Diagrams

Eight globally-registered components, authored inline in the markdown. Each
covers a shape the docs kept redrawing by hand:

| Component | For | Key props |
| --- | --- | --- |
| `DStack` | Layers read top to bottom | `layers[{n, title, body, note}]`, `inLabel`, `outLabel` |
| `DFlow` | A chain of steps | `steps[{title, body, note, edge}]`, `dir`, `numbered`, `loop`, `loopTo` |
| `DTree` | A containment hierarchy | `root`, `nodes[{label, note, children}]`, `mono` |
| `DBranch` | One thing splitting, or several converging | `source`, `branches[]`, `then[]`, `result`, `dir` |
| `DSplit` | Two or three things contrasted | `columns[{title, sub, via, items, foot}]` |
| `DMatrix` | The commissioning matrix | `groups`, `columns`, `rows`, `xLabel`, `yLabel`, `caption` |
| `DScreen` | A screen's regions | `title`, `panes[{head, label, flex}]`, `rail[]` |
| `DDecision` | The one branch that rejoins | the workflow's labels |

`note` is the aside on the right — what a layer *is*, not what it does
("model call", "deterministic"). `DFlow dir="right"` folds to a column under
720px; every other diagram wraps or scrolls inside its own box, so no page
scrolls sideways.

Colours come from VitePress theme tokens only, so all eight follow light and
dark without a second definition. Adding a diagram means picking one of the
eight — reach for a new component only when none of them fits.
