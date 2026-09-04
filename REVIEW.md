# Review checklist

Everything mechanical is already verified — links, build, permission names.
What remains needs someone with the running product. This is ordered by risk,
not by lane: work top-down and stop when you run out of time.

## Verify mechanically first

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # must be clean
node scripts/check-links.mjs
npm run media          # what media is still outstanding
```

All four pass today. If any fails after an edit, fix before reviewing prose.

---

## Tier 1 — highest risk, review first

Pages where I **corrected something already published**, or made a claim with
consequences. If any of these is wrong, it is wrong in a way that misleads.

| Page | Claim to check |
| --- | --- |
| `work/history.md` | History is **off** until a module owner enables it; a multi-step workflow shows **one entry per submit**, not per save. |
| `concepts/permissions.md` | Four layers; **all of Settings is one `PME` gate** with no per-page permission. |
| `admin/groups.md`, `admin/projects.md`, `admin/workspaces.md` | Permissions **compound in the same context** — a visible tab can load nothing. |
| `cx/matrix.md` | Five sections are **Cx / Gantt / SSM / Documents / Handover**; **four** KPI cards, each clickable; a fifth AI card. |
| `cx/gates.md` + `cx/dates.md` | `dependsOn` drives **dates**; gates drive **completion**. They are separate. |
| `work/masters.md` | The grid is the interface; warnings can be overridden, errors cannot. |

::: Ask of each: would someone acting on this be misled?

---

## Tier 1b — the AI lane, written from source in one pass

The whole `ai/` lane plus `architecture/ai-platform.md` was written by reading
`exto-go` and `exto-web` and never exercised against a running tenant. It makes
more falsifiable claims than any other lane, and several of them have
consequences if wrong.

| Page | Claim to check |
| --- | --- |
| `ai/index.md` | Four switches, in that precedence order — organisation AI access, per-user entitlement, per-user insights, per-user memory. |
| `ai/context.md` | The page hint **never** restricts or grants; a named module always beats the page. |
| `ai/attachments.md` | Attaching a file **skips the reasoning loop entirely** — no tenant data is queried on that turn. Three files, 10 MB, and the accepted type list. |
| `ai/memory.md` | The four capture triggers, and that deleting a session extracts from it first. Off ≠ purge. |
| `ai/cx.md` | The three commissioning abilities appear only with exactly one workbench resolvable. The setup copilot is the only AI surface that writes. |
| `ai/insights.md` | Module insights aggregate over **permitted records only**, so two people can see different totals. |
| `ai/operations.md` | Every listed turn outcome is a real, distinguishable state in the UI. |

::: Ask of each: would an administrator sizing risk, or a user trusting a
number, be misled?

## Tier 2 — written from source, never clicked

I read `exto-web` and `exto-go` for these but never used the feature. Most
likely failure is a control that exists in code but is hidden, renamed, or
gated in the running product.

- The whole **`cx/`** lane — especially `dates.md` (anchor dates, FS/SS/FF/SF,
  business calendar) and `handover.md` (eligibility, the `invalidated` state).
- `work/grid-editing.md` — the editor list and which types refuse fill.
- `work/photos.md` — the three permission questions, and "uploading does not
  guarantee you can see it".
- `admin/data-setup.md` — the schema sync and its two stages.
- `build/field-types.md` — every field's settings.

## Tier 3 — lower risk

- `concepts/` — mostly adapted from `exto-docs-v1`, which had prior review.
- `architecture/` — describes code structure; an engineer can check it against
  the paths each page cites.
- `recipes/` — sequences of things documented elsewhere.

---

## Known-unverified

Stated plainly so nobody assumes otherwise:

1. **No page has been checked against a running tenant.** Everything comes from
   source and from `exto-docs-v1`.
2. **Numeric claims** are read from code, not observed: external-service
   timeouts, the 5-character field-name minimum, the recycle bin's 7-day flag,
   the 3-day KPI horizon.
3. **Media is entirely absent** — 124 files outstanding. Every page renders a
   placeholder naming the exact path.
4. **The architecture book** deliberately contains no infrastructure or
   deployment detail. Check nothing leaked before publishing anywhere public.

## Marking a page reviewed

Add `reviewed: YYYY-MM-DD` to its frontmatter. Then:

```bash
grep -rL "^reviewed:" --include="*.md" . | grep -v README | grep -v REVIEW
```

lists what is still unreviewed.

---

## When you are ready to publish

1. **Decide whether `docs.exto360.com` is public.** If it is, the
   `architecture/` tree should go to a separate internal deploy — it describes
   the engines and layers of the product.
2. `git add -A && git commit` — the repo has **no commits yet**.
3. Push to `exto360-inc/exto-docs`.
4. Deploy: build locally and push `.vitepress/dist` to the Pages repo, or
   automate it the way `console` does — see the plan in the conversation.
