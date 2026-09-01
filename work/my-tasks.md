---
description: "Every record waiting on you, across every module, in one grid."
---

# My tasks

Every record sitting on a workflow step you are responsible for, across every
module, in one grid. It is the first page most people open.

<Shot src="work/my-tasks" alt="The My tasks grid" pending
  caption="Tasks across three modules, sliced by module with per-value counts." />

## List page

One row per record waiting on you. A record reaches this list when it arrives
at a step whose assignees include you or a group you belong to — directly, not
because you can merely see the record.

The grid is the same one used everywhere else in Exto, so it comes with the
full set of tools:

- **Search** across text fields.
- **Column filters** with operators — equals, contains, starts with, date
  ranges, in list, is empty.
- **Group by** one or more columns.
- **Slice by** a single field in the left sidebar, with a count beside each
  value; click a value to filter to it.
- **Column layout** — show, hide, reorder, resize, pin, sort.
- **Views** — save any combination of the above. See [Views](/work/views).

## Opening a task

Click a row to open the record. It opens in the same
[record detail](/work/record-detail) screen you would reach from the module's
own list, with the step's form and its available actions.

Taking an action removes the record from this list — either because it moved to
someone else's step, or because it finished. See
[Taking actions](/work/taking-actions).

::: tip Empty list, work you expected
Three things produce an empty My tasks:

- The records are still **drafts** — nobody submitted them.
- The step's assignees name a **group** you are not in.
- The step's **completion rule** is *One* and a colleague already acted.
:::

## Why a record is here

If it is not obvious why a record is on your list, open it and read the
**Workflow** widget: it names the current step and the users and groups
responsible for it. [Workflow progress](/work/workflow-progress) shows how it
arrived.

## Permissions

Anyone can open My tasks. What appears in it is decided entirely by the
workflow step assignees on each record — there is nothing to grant.
