---
description: "Saving a filter, column layout and sort as a named view."
---

# Views

::: tip Who can do this
Anyone can save a personal view. Sharing one depends on the grant
on that grid.
:::

A **view** is a saved arrangement of a grid: its filters, grouping, slice,
column layout and sort order, under a name. Views are what stop a shared module
from being a fight over column widths.

<Shot src="work/views" alt="The View settings popover"
  caption="The View settings — what the view shows, how it groups, and Save view." />

## What a view stores

| Part | Saved? |
| --- | --- |
| Filters (column and global) | Yes |
| Group by fields | Yes |
| Slice by field | Yes |
| Visible columns, their order and width | Yes |
| Sort — including multi-field sort | Yes |
| Which row you had selected | No |

Because the column layout belongs to the view rather than to you, two views of
the same module can show entirely different data.

## Switching between them

Views sit as **tabs above the filter bar** — *Default View*, then any others,
then **+ New view**. Click one to switch. A view with unsaved changes carries a
dot.

## The View settings

The **View** button at the right of the filter bar opens the settings for the
view you are on:

| Setting | Decides |
| --- | --- |
| **Name** | What the tab reads. |
| **Fields** | Which columns the view shows, and their order. |
| **Group by** | Which field rows are grouped under. `None` for a flat list. |
| **Slice by** | Which field the left-hand slice panel counts by. |
| **Show hierarchy** | Whether hierarchical data renders as a tree or flat. |

**Save view** keeps the changes; **Discard** throws them away. Save view stays
disabled until something actually changes, so a view you only looked at cannot
be accidentally rewritten.

## Managing views

From the views popover you can:

- **Create** a view from the grid's current state.
- **Rename** and **duplicate** an existing one.
- **Delete** one you own.
- **Hide** views you never use, and **reorder** the chips.
- Set a **default** — the view that loads when you open the page.

### System views

Every grid ships with built-in views such as *All records* and *Drafts*. They
behave like any other view but cannot be deleted. Duplicate one if you want a
variation.

## Shared or personal

A view is either **shared** with everyone who can reach the grid, or **personal**
to you. In the [CX workbench](/cx/matrix) this is an explicit choice when you
save one; elsewhere it follows the grant on that grid.

A shared view is a small act of design — everyone arriving at the module sees
what you decided mattered. Name them for the question they answer (*Awaiting my
approval*), not for how they are built (*Filtered by status*).

## Where views apply

Views are not only a record-list feature. The same machinery runs on
[My tasks](/work/my-tasks), master record grids, the job status page and the
CX workbench, so what you learn here works everywhere.

Which columns are available to a view is defined per module by its **log page
views** — see [Module designer](/build/module-designer).

::: tip Export follows the active view
Exporting a grid exports the active view's filters, columns and order — not
the whole module.
:::

## Permissions

Anyone can create personal views. Whether a view is shared with others depends
on the grant on that grid; in the [CX workbench](/cx/matrix) views are
explicitly either shared or personal.
