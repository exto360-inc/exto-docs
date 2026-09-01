---
description: "Flat lookup lists, maintained inline in the grid."
---

# Master data

Flat lookup lists — vendors, equipment types, cost codes — that other records
point at. What a master *is* and which kind to build is
[Masters](/concepts/masters); this page is about maintaining one.

**The grid is the interface.** Master data is created and edited in place, row
by row, not through a form.

<Shot src="work/master-records" alt="A master record grid" pending
  caption="Editing inline — a select cell open, with unsaved rows marked." />

## The grid

A master opens at `/master-records/:moduleName`. Everything the
[record list](/work/record-list) does — search, column filters, grouping,
column layout, [views](/work/views) — works the same way here.

Rows load a page at a time from the server, so a master with a hundred thousand
values opens as fast as one with ten.

## Editing in place

Click a cell to edit it. The editor you get matches the field's type:

| Field type | Editor |
| --- | --- |
| **Text**, **number** | Typed entry, with numeric validation. |
| **Select**, **radio** | The option list, from its [data set](/build/tables-and-datasets). |
| **Checkbox** | Toggles. |
| **Date**, **date & time** | A picker. |
| **Hyperlink** | Label and URL together. |
| **Auto-complete** | Search-as-you-type against the source. |
| **Auto-complete multi-select** | The same, holding several values. |
| **User picker** | People search. |
| **Select from table** | A record picker. |
| **Sensitive** | Masked entry. |

Edits accumulate as you go and are **saved together** — change forty cells
across twelve rows, then save once.

::: tip Unsaved edits survive scrolling, not leaving
Changed cells stay marked as you move around the grid. Navigating away without
saving prompts you first.
:::

## Filling a column

Rather than typing the same value repeatedly, drag a cell's handle down to fill
the rows beneath it, or use the fill tool to apply one value across a selection.

Some field types are deliberately **excluded** from filling:

- **Formula** and **auto-populate** fields — they are computed, so a filled
  value would be overwritten.
- **Sensitive** fields — bulk-copying a secret is rarely intended.
- **Signature** fields — a signature is per record by definition.
- **Record number** and any **read-only** field.
- **Multi-line** text, and **table** pickers.

Attempting to fill one of these does nothing rather than failing loudly.

## Validation: warnings and errors

Saving runs the module's [rules](/build/rules), and the two outcomes behave
differently:

| Outcome | What happens |
| --- | --- |
| **Warning** | A dialog lists what is questionable. You can **override** and save anyway. |
| **Error** | A dialog lists what is wrong. The save does not proceed. |

Cells failing a rule also carry an inline marker — hover it to read why, rather
than hunting through a dialog for which row it meant.

## Creating rows

**Add** appends an empty row for entry. Where the module spans several contexts,
you are asked which **tenant, workspace or project** the new rows belong to
before you start — that context is stamped on everything you then create.

**Copy** duplicates a row, which is the fastest route to a near-identical value.

## Import and export

For anything more than a handful of rows, import:

1. Download the template for the module.
2. Fill it in.
3. Import it.

A failed import produces an **error report** naming the row and the reason, so a
file of two thousand rows with three bad ones tells you which three. Fix those
and re-import.

**Export** sends the current view — its filters, columns and order — to a
spreadsheet.

## Editing a master changes what points at it

Master rows are referenced live by other records. Renaming a value updates
everywhere it is displayed. **Deleting** one leaves the records that used it
holding a value the master no longer explains.

::: warning Prefer disabling to deleting
If the module supports it, retire a value rather than removing it. Historical
records stay readable, and nothing new can pick it.
:::

## Hierarchical masters

Tree-shaped reference data behaves differently enough to have its own page —
see [Hierarchical masters](/work/hierarchical-masters).

## Permissions

Governed by the `master_data` submodule with separate **view**, **create**,
**edit** and **delete** grants, assigned to groups at workspace or project
level. Read access is commonly broad; write access should not be, because a
master edit reaches every record pointing at it.
