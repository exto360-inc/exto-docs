---
description: "A module's records: columns, filters, slicing, charts and export."
---

# Record list

A module's records at `/mod/:moduleName` — the grid you spend most of your day
in. It finds records, shows their workflow state at a glance, and is the launch
point for everything you do to one.

<Shot src="work/record-list" alt="A module's record list" pending
  caption="The record list, sliced by status, with the icons column pinned left." />

## Anatomy of a row

Beyond the columns your [view](/work/views) defines, each row carries an
**icons** cell pinned to the left, holding two things in one narrow column:

| Icon | Shows |
| --- | --- |
| **Progress ring** | How far through its workflow the record is, tinted by its derived status. |
| **Attachments** | How many files the record carries. Click to open them. |

A module with no workflow renders no ring, and the column stays narrow.

Clicking the attachment icon opens a **side panel** listing the record's files
without leaving the grid — which is faster than opening the record when all you
wanted was to check a drawing.

## Column types

Columns render according to their field type, so the grid shows values rather
than raw data:

| Type | Renders as |
| --- | --- |
| **Date**, **date & time** | Formatted to your [profile preferences](/account/profile). |
| **Select**, **radio**, **checkbox** | The option's label. |
| **Auto-complete**, **multi-select** | The resolved display value, not the stored id. |
| **Hyperlink** | A clickable link. |
| **Rich text** | Rendered, with long values expandable. |
| **Signature** | The signature image. |
| **Attachment** | A count. |
| **Report** | A download action. |

Long text gets an expander rather than being truncated into meaninglessness.

## Finding records

- **Global search** across text fields.
- **Column filters** with operators: equals, not equals, greater/less than,
  contains, starts with, ends with, in list, not in list, is empty, is not
  empty.
- **Slice by** a field in the left sidebar. Each value shows a count; click one
  to filter. Also available as a grid tool panel.
- **Group by** one or more columns, to several levels.
- **Reset** clears grouping and slicing without touching your filters.

## Columns and layout

Show and hide, reorder by dragging, resize, pin to either edge, and sort by
clicking a header. Layout belongs to the active [view](/work/views), not to you
globally — two views of the same module can look entirely different.

Which columns are *available* is set per module by its log page views. See
[Module designer](/build/module-designer).

## Creating a record

**Add new** opens the workflow's first step. If the module spans several
contexts, you pick the tenant, workspace or project first.

Fill the form and **Save** to keep it as a draft, or take an action to move it
on — see [Taking actions](/work/taking-actions).

## The row menu

Right-click a row for the actions that apply to it:

| Action | Available when |
| --- | --- |
| **Workflow progress** | Always. Opens the [progress panel](/work/workflow-progress). |
| **Clone** | You can create records. |
| **Clone N records** | Several rows are selected. |
| **Discard draft** | The record is a draft or was returned. |
| **Delete** | The record is not a draft. |
| **Copy**, **copy with headers**, **paste** | Always. |
| **Chart range** | A range of cells is selected. |
| **Export** | Always. |

Cloning several records at once is a bulk operation; discarding and deleting
stay single-row, deliberately.

## Editing without opening records

Cells can be edited directly in the grid. See
[Editing in the grid](/work/grid-editing).

## Charts and export

Selecting a range of cells offers **Chart range**, which generates a grouped
column chart from the selection — useful for a quick shape check without
building a [dashboard](/build/dashboards).

**Export** sends the current view — its filters, columns and order — to a
spreadsheet.

::: tip What you export is what you see
Export follows the active view, not the whole module. Clear your filters first
if you want everything.
:::

## Hierarchy

Where a module's data is hierarchical, rows expand and collapse as a tree, and
the record number column steps aside for the tree column that already
identifies each row.

## Permissions

Opening the list requires the module granted to one of your
[groups](/concepts/permissions). Which rows you then see depends on the **View
all records** grant: without it, you see the records your workflow step makes
yours.
