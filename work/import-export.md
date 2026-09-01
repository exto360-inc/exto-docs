---
description: "Bulk data in and out, and how to read a failed import."
---

# Importing & exporting

Getting data in and out in bulk. Import validates before it writes and tells you
which rows failed; export follows whatever you are currently looking at.

<Shot src="work/import" alt="The import error report" pending
  caption="An import that partly failed — each rejected row with its reason." />

## Exporting

Every grid exports: the [record list](/work/record-list),
[master data](/work/masters), [My tasks](/work/my-tasks), job status, and the
CX views.

Export sends the **active view** — its filters, its visible columns, in their
current order and sort — to a spreadsheet.

::: warning Export follows the view, not the module
A filtered grid exports the filtered set. Clear filters first if you want
everything, and check which columns are hidden before assuming a field is
missing from the data.
:::

For a formatted document rather than raw rows, use a
[report](/work/reports) instead.

## Importing

Import is the right tool for more than a handful of rows. Unlike
[pasting into the grid](/work/grid-editing), it validates the whole file before
writing anything.

1. **Download the template** for the module. It carries the correct columns and
   headers.
2. **Fill it in.**
3. **Import** it.
4. **Read the report.**

### The template matters

The template is generated from the module's current fields, so it already has
the right columns in the right order. A file assembled by hand — or a template
downloaded before a field was added — is the most common cause of an import that
rejects everything.

### The error report

A partly-failed import produces a report naming **each rejected row and why**.
Two thousand rows with three bad ones tells you which three.

Common reasons:

| Reason | Fix |
| --- | --- |
| A required field is empty | Fill it, or check the template is current. |
| A value is not in the option list | Match the [data set](/build/tables-and-datasets) exactly. |
| A lookup does not resolve | The referenced master row does not exist yet. |
| A rule rejected the row | See [Rules](/build/rules). |
| A parent reference does not resolve | Hierarchies only — see below. |

Fix the named rows and re-import. Rows that succeeded are already in; re-importing
the whole file is usually fine, but check whether the module treats a repeat as
an update or a duplicate.

## Importing a hierarchy

[Hierarchical masters](/work/hierarchical-masters) are imported with **parent
references** — each row names its parent, and the import resolves them into the
tree. A reference that does not resolve, or a cycle, is reported per row.

This is the only practical way to load a real hierarchy.

## Importing CX assets and dates

The [CX workbench](/cx/) has two of its own bulk paths:

- **The asset registry** imports assets with their hierarchy. See
  [The asset registry](/cx/assets).
- **Anchor dates** import into the bulk dates grid. See
  [Dates & scheduling](/cx/dates).

## Watching a large import

Big imports run as background jobs. If one appears to have done nothing, it
almost certainly failed with a reason attached rather than being silently
rejected — check [job status](/work/recycle-bin), where a failed job can also
be retried.

## Permissions

Importing requires **create** — and **edit**, where the import updates existing
rows. Exporting requires only view access to the grid you are exporting, so
anyone who can read the data can take a copy of it.
