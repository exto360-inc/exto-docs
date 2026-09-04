---
description: "The save path, and how history stays off it."
---

# Records & audit

Saving a record must be fast and must not fail because auditing failed. Those
two requirements shape the whole design: **history is captured on the save path
but written off it.**

## The save path

<DBranch
  source="Save request"
  :branches="[
    { label: 'Persist the record' },
    { label: 'Capture the sub-table payload', note: 'before it is stripped' },
    { label: 'Compute what changed', note: 'main fields · sub-table rows · checklist items' },
    { label: 'Write ONE small ticket', note: 'alongside the record' },
    { label: 'Respond' },
  ]"
  :then="[{ label: 'Later, and separately', note: 'a worker turns tickets into history' }]" />

The save writes the record and a **ticket**. It never writes the audit record
itself. A worker drains the tickets afterwards.

This is the transactional outbox pattern, and it buys three properties:

- The response does not wait on auditing.
- If the audit store is briefly unavailable, saves continue and tickets
  accumulate safely.
- Reads of history never contend with the busy write path.

The cost is that a change takes a moment to appear in the timeline. That is a
deliberate trade.

## Capture is gated once

Whether anything is captured at all is decided by a **single module-level
switch**. With it off, nothing is recorded anywhere.

The per-field and per-table toggles in the designer do **not** gate capture.
They decide whether that field's history **icon** is shown. So:

> the module decides what is recorded; each field decides whether its icon
> surfaces it.

An icon appears only when both are on — otherwise it would open an empty panel.
Turning a field's toggle on later reveals history captured all along.

## What is diffed

| Kind | How |
| --- | --- |
| **Main fields** | Old against new, per field. |
| **Sub-table rows** | Matched by row id; only changed cells recorded. |
| **Checklist items** | Per item — answer, notes, attachments, links, out-of-scope. |

Bulk changes collapse. A large import records a count — *"500 rows added"* —
rather than one entry per row, so a hundred-thousand-row import costs one line.

Sub-table and checklist diffing share the same machinery, which is why checklist
changes appear grouped the way sub-table changes do.

## Ordering

Each record carries a monotonic sequence number, bumped per change. It gives
history a stable order independent of clocks, and it is what pagination walks —
a cursor, not an offset, so page five thousand costs the same as page one.

## Reading

Reads never touch the write path. The read side is served from the audit store
alone, through endpoints for the record timeline, one field's history, one
sub-table row's history, row signal counts, and the summary that says which
field icons to show.

The summary endpoint exists so the form can decide which icons to render
without asking per field.

## Grouping by submission

For a **multi-step** workflow the read side returns **one entry per submit**,
carrying the net difference since the previous one. Draft saves between two
submits are folded into the later one; the first submit shows everything up to
it.

Single-step and workflow-less modules are unchanged and show every save.

Two details matter to anyone working on this:

- **Every workflow action is a boundary** — approve, reject, return, assign, not
  only submit.
- **The decision is made server-side** and returned with the history, so the
  client makes one call rather than a second round trip to ask which mode it is
  in.

Field-level and row-level history follow the same grouping, so they can never
disagree with the record timeline.

## Sensitive values

A sensitive field is never rendered in history as plaintext or as its stored
ciphertext. It is masked, the same way it is everywhere else — including in the
create baseline, which is the one place a value can be pulled from the live
record rather than a diff.

## Where to look

| Concern | Path |
| --- | --- |
| Capture on save | `server/service/module_record_service.go` |
| Sub-table and checklist diffing | `server/service/subtable_history.go`, `checklist_history.go` |
| Submit grouping and masking | `server/routes/history_submit_grouping.go` |
| Read endpoints | `server/routes/history_route.go`, `server/repo/history_repo.go` |
| Client | `src/features/history/` |

## Related

- [History](/work/history) — the product view.
