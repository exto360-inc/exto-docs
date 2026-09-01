---
description: "What freezes when you publish, and how to change it afterwards."
---

# Publishing & versions

Publishing freezes a workflow design into a version and lets records start
following it. It is a one-way door, on purpose: changing next month's approval
path must not re-route the forty records already in flight.

<Shot src="build/versions" alt="The workflow list showing versions" pending
  caption="Three versions — two published and frozen, the newest still a draft." />

## Draft and published

| State | Editable? | Used by records? | Offers |
| --- | --- | --- | --- |
| **Draft** | Yes | No | Publish |
| **Published** | No | Yes | Create new version — latest only |

A published version is genuinely read-only: the editing controls disappear
rather than sitting greyed out, so there is never a moment where you think you
have changed something and have not.

## Publishing

Choose **Publish**. The designer validates the graph first and refuses if it
does not hold together:

- Every workflow needs exactly one **Start**.
- Every step must be **reachable** from Start.
- Every step needs at least one way **out**.
- Nodes need **names**; the workflow needs a name.
- Conditions need an expression.

Fix what it reports and publish again.

## Creating a new version

**Create new version** is offered on the **latest** version only, and copies
it into a new draft. Edit that draft, publish it, and new records start
following it.

Records already running on the earlier version **keep following it to
completion**. This is the entire point of versioning, and it means:

- You may have several versions live at once.
- A record's history is always readable against the version it actually ran on.
- Retiring a path never strands the records on it.

::: tip Check what is still running before you assume a version is dead
An old version stays in use until its last record finishes. The
[record list](/work/record-list) grouped by status tells you how many that is.
:::

## Terminal steps

Stored templates never contain an END step. Termination is expressed by an
action whose next step is the terminal marker `__END__`, which is why several
**End** nodes on the canvas can coexist — they all serialise to the same one
thing.

The canvas keeps its End nodes for layout, so what you draw is what you read.

## Forms are not versioned with the workflow

Publishing freezes the workflow graph — its steps, actions and conditions. The
**forms** those steps point at are saved independently and take effect
immediately for everyone.

::: warning Editing a form changes live records
A form change reaches every record sitting on a step that uses it, on every
workflow version, straight away. If that is not what you want, create a new
form and point the new workflow version at it.
:::

## Permissions

Publishing and creating versions requires <Perm role="PME" />, the application
role that opens **Settings**.

A published version is read-only to everyone — the restriction is a property of
the version, not of who is looking at it.
