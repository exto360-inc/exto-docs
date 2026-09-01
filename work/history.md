---
description: "Turning history on, and why a multi-step workflow groups changes by submit."
---

# History

Who changed what, and when. History covers field edits, sub-table rows,
checklist items and workflow transitions — but only once a module owner has
turned it on, and what it shows depends on whether the module has one step or
several.

<Shot src="work/history" alt="The record history drawer" pending
  caption="A record's timeline, with one entry per submit and the changes each carried." />

## First: history has to be enabled

Capture is off until a module owner switches **Enable History** on for the
module. With it off, nothing is recorded — anywhere, for anyone. The history
widget says so rather than showing an empty timeline.

| Who is looking | What they get |
| --- | --- |
| A <Perm role="PME" /> user | An **Enable History** button, which opens the module's General settings in the platform designer. |
| Everyone else | A note asking them to contact a workspace admin or module editor. |

The button is not merely hidden from other people; the navigation behind it
refuses to open for a non-admin, so turning it on is genuinely an owner's
decision.

::: warning History is not retroactive
Nothing is captured while the switch is off. Turning it on starts the record
from that moment — it cannot recover what happened before.
:::

## What the timeline shows

Here is the part that surprises people. It depends on the module's workflow.

| Module | The timeline shows |
| --- | --- |
| **Multi-step workflow** | **One entry per submit**, carrying the net change since the previous submit. |
| **Single-step, or no workflow** | Every draft save and every submit, separately. |

In a multi-step module, every draft save you make between two submits is folded
into the entry for the second one. Type a value and save, change it and save
again, then submit: the submit shows the final state as one change, not three.
The first submit shows everything entered up to it.

This is a **display** decision, not a capture one — every save is still recorded
in the background. Nothing is lost; it is grouped for reading.

::: tip "Submit" means any workflow action
Approve, Reject, Return and Assign are all transaction boundaries, exactly like
Submit. Each one starts a new entry, tagged with the action that closed it.
:::

A module counts as multi-step when its latest published workflow has more than
one step **and** a way to finish. A workflow with several steps that only loops,
never reaching an end, is treated as single-step.

## Reading an entry

Each entry names:

- **Who** made the change, with their avatar and email.
- **When**, as relative time, with the exact timestamp on hover.
- **What** changed — the field, its old value and its new one.
- **Which step** the record was on, and which action closed the entry.

Changes are marked by kind: **changed**, **added**, **cleared**, a new **block**
of rich text, or a **signature** captured or replaced.

Filter the timeline by action type to narrow it, and switch timestamps between
relative and absolute.

## One field at a time

Every field can show its own history **inline, directly beneath it** — click the
history icon on the field and a scrollable panel drops in under it.

Text and multi-line fields offer **Show changes**, a word-level diff
highlighting what actually moved rather than printing both versions in full.

A field's panel follows the same grouping as the record timeline: submit to
submit in a multi-step module, every save in a single-step one. The two can
never disagree, because a field's history is literally its slice of the record's.

### Why an icon might not be there

The **per-field** and **per-table** toggles in the form designer control whether
the history icon is **shown**. They do not start or stop capture.

So the model is: **the module decides what is recorded; each field decides
whether its icon surfaces it.** An icon appears only when the module switch is
on *and* that field's own toggle is on — otherwise it would open an empty panel.

Turning a field's toggle on later reveals history that was captured all along.

## Sub-tables and checklists

Sub-table rows are compared by row, and only what changed is recorded. Edited
cells get old-to-new detail; a bulk import is summarised as a count — *"500 rows
added"* — so importing a hundred thousand rows costs one line rather than a
hundred thousand.

Each row carries three **signal** icons in its action cell:

| Icon | Shows |
| --- | --- |
| 📎 **Attachments** | How many files the row carries. |
| 🔗 **Linked records** | How many, green when all approved, amber otherwise. Hover for the list. |
| 🕘 **History** | How many distinct save events touched the row. |

Checklists work the same way: each item's answer, notes, attachments, linked
records and out-of-scope flag are diffed, and changes appear grouped under the
checklist's name.

## Sensitive fields

A field marked **Sensitive** is never shown in history as either its plaintext
or its stored ciphertext. It appears masked — `9*****21` — the same way it
appears everywhere else in the product.

## Printing

History has a print view that renders the timeline as a flat document, for an
audit pack or a dispute.

## Why it never slows a save down

Saving a record does not write history. It drops a small ticket alongside the
save, and a background worker turns those tickets into the audit record
afterwards, in a **separate database** that reads never share with live records.

The practical consequences:

- A save is never slowed or blocked by history.
- If the audit database is briefly unavailable, saves continue and the tickets
  are written when it returns.
- A brand-new change can take a moment to appear in the timeline.

::: tip History is not the recycle bin
History records changes to a record that still exists. Something deleted is in
the [recycle bin](/work/recycle-bin).
:::

## Permissions

Anyone who can open the record can read its history. It is append-only — no one
can edit or remove an entry, administrators included. Turning capture on or off
is a module-level setting, reachable only by a <Perm role="PME" /> user.
