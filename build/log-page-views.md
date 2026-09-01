---
description: "Deciding which columns the record list can offer."
---

# Log page views

A log page view defines which columns a module's [record list](/work/record-list)
can offer, in what order, with which default filter and sort. It decides the
menu; the [views](/work/views) users save are the meal.

Defined in **Module designer → Log page views**.

<Shot src="build/log-views" alt="The log page views tab" pending
  caption="A log page view — its selected columns, in order, with a multi-field sort." />

## What one holds

| Setting | Notes |
| --- | --- |
| **Name** | Identifies the view. |
| **Default** | Whether it loads first. |
| **Columns** | An ordered subset of the module's fields. |
| **Filters** | A default filter applied when it loads. |
| **Sort** | Multi-field, primary first. |

## Why this exists separately from views

A module can have a hundred fields. Offering every one of them in the column
picker makes the picker useless, and most of them are meaningless to most
people.

So there are two layers:

| Layer | Decided by | Governs |
| --- | --- | --- |
| **Log page view** | A designer, here | Which columns are *available* |
| **[View](/work/views)** | Any user, in the grid | Which of those they are *using* |

A user cannot add a column the log page view does not offer. If somebody asks
for a field that "isn't in the list", this is the page to change.

## Multi-field sort

Sort is ordered: the first row is the primary key, the next breaks its ties, and
so on. Each carries its own direction.

## Where else it applies

The same mechanism drives the column sets for
[My tasks](/work/my-tasks), the job status page, master record grids and the CX
log pages — which is why those grids feel identical to work in.

## Permissions

Defining log page views happens in the module designer, under **Settings**, and
requires <Perm role="PME" />.

Saving a personal [view](/work/views) from what a log page view offers requires
nothing beyond access to the grid.

## Related

- [Views](/work/views) — what users build from this.
- [Record list](/work/record-list) — where it is used.
- [Module designer](/build/module-designer) — the tab it lives in.
