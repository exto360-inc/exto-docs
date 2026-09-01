---
description: "Changing many records inline without opening any of them."
---

# Editing in the grid

Both the [record list](/work/record-list) and [master data](/work/masters) let
you edit cells directly rather than opening each record. For correcting a column
across forty rows this is the difference between a minute and an afternoon.

<Shot src="work/grid-editing" alt="Inline editing in the grid" pending
  caption="A select cell open in place, with edited cells marked and the save button active." />

## How it works

Click a cell to edit it. The editor matches the field's type — a date picker for
a date, the option list for a select, a people search for a user picker.

Edits **accumulate**. Change cells across as many rows as you like, then
**Save** once. Until you save, changed cells stay marked.

::: warning Unsaved edits do not survive leaving
Changed cells persist as you scroll, filter and sort. Navigating away prompts
you first — but a closed tab takes them with it.
:::

## The editors

| Field type | Editor |
| --- | --- |
| **Text**, **number** | Typed entry, validated for type. |
| **Date**, **date & time** | A picker. |
| **Select**, **radio** | The option list from its [data set](/build/tables-and-datasets). |
| **Checkbox** | Toggles. |
| **Hyperlink** | Label and URL together. |
| **Auto-complete** | Search-as-you-type against the source. |
| **Auto-complete multi-select** | The same, holding several values. |
| **User picker** | People search, single or multiple. |
| **Select from table** | A record picker. |
| **Sensitive** | Masked entry. |

## Filling a column

Rather than retyping a value, drag a cell's fill handle down the rows beneath
it, or apply one value across a selection.

Some types are deliberately excluded:

- **Formula** and **auto-populate** — computed, so a filled value would be
  overwritten on the next save.
- **Sensitive** — bulk-copying a secret is rarely what anyone means.
- **Signature** — per record by definition.
- **Record number**, and any **read-only** field.
- **Multi-line** text, and **table** pickers.

Attempting to fill one of these does nothing, rather than appearing to work and
then reverting.

## Copy and paste

Copy cells with or without headers, and paste a block in. This is the fastest
route from a spreadsheet someone emailed you into the grid — though for anything
large, [import](/work/import-export) is the better tool, because it validates
before it writes.

## Validation

Saving runs the module's [rules](/build/rules). The two outcomes differ:

| Outcome | What happens |
| --- | --- |
| **Warning** | A dialog lists what is questionable. You can **override** and save anyway. |
| **Error** | A dialog lists what is wrong. Nothing is saved. |

Cells failing a rule also carry an inline marker — hover it for the reason,
rather than matching a dialog message back to a row yourself.

## What editing triggers

An inline edit is a real edit, not a shortcut around the product:

- Field **rules** run.
- An **external service** configured to run after change fires. See
  [External services](/integrations/external-services).
- The change is recorded in [history](/work/history), if the module has it
  enabled.

What it does **not** do is move the record. Editing is not submitting — see
[Taking actions](/work/taking-actions).

::: tip Editing a cell on someone else's step
You can only edit what the record's current step lets you edit. A record sitting
on a step you do not own is read-only in the grid, exactly as it is on the
record.
:::

## Where this differs for masters

Master data has no workflow, so every row is editable by anyone with the edit
grant, and creating rows happens inline too. See
[Master data](/work/masters) and
[Hierarchical masters](/work/hierarchical-masters).

## Permissions

Editing in the grid requires the same access as editing the record: the module
granted to a group, and a workflow step that makes the record yours. There is no
separate grid permission.
