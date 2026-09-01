---
description: "Submit, approve, return, reopen and revise — and why saving is none of them."
---

# Taking actions

An **action** is the button that moves a record. Saving does not move it,
editing does not move it — only an action advances the workflow, stamps a
status, and tells the next people it is theirs.

<Shot src="work/action-sheet" alt="The action sheet" pending
  caption="Submitting — the comment box, the next step's assignees, and the space picker." />

The buttons live in the **Actions** widget on an open record — see
[Record widgets](/work/record-widgets).

## Where the buttons come from

The actions offered on a record are the lines leaving its current step in the
published workflow. That is why they change as the record moves, and why two
people looking at the same record on different steps see different buttons.

- **Primary** actions get their own buttons.
- **Secondary** actions sit in the overflow menu.

Nothing is offered that the workflow does not draw. If an action you expect is
missing, the record is on a step that has no such line — check
[Workflow progress](/work/workflow-progress).

## Taking one

Pressing an action opens the action sheet before anything happens:

1. **Comment** — optional, unless the action makes it mandatory.
2. **Assignees** — when the action allows it, choose who the next step goes
   to, or narrow the default list.
3. **Space** — when the module uses [spaces](/concepts/projects-and-spaces),
   pick one. After the first step it is usually read-only.
4. **Confirm.**

Some actions ask for confirmation before submitting; that is a per-step
setting. Others keep you on the same page afterwards rather than returning to
the list, which is what you want when raising many records in a row.

## The common actions

| Action | What it does |
| --- | --- |
| **Save** | Persists a draft where it is. Not a workflow action. |
| **Submit** | Sends the record to the next step. |
| **Approve** | Advances it and stamps *Approved*. |
| **Reject** | Ends it with *Rejected*. |
| **Return** | Sends it back to an earlier step for rework. |
| **Withdraw** | Pulls a submitted record back. |

Action *names* are conventions, not rules — a workflow designer can label them
anything. The status each one stamps is set on the action itself.

## Beyond the workflow

These are record-level, granted in module setup rather than drawn on the
canvas:

| Action | Needs | What it does |
| --- | --- | --- |
| **Clone** | Create permission | Copies field values into a new draft, minus id, record number and timestamps. |
| **Reopen** | Reopen owner, and the module allowing reopen | Returns a completed record to the step chosen in module setup. |
| **Revision** | Revision owner, and the module enabling revision | Creates a new version of the record, optionally copying its documents. |
| **Discard / Delete** | Delete permission | Sends the record to the [recycle bin](/work/recycle-bin). |

## Completion rules

A step decides how many of its assignees must act before the record moves:

- **One** — the first response wins, and the record leaves everyone else's
  list.
- **All** — every assignee must act.
- **Majority** — more than half.

This is why a task can vanish from [My tasks](/work/my-tasks) without you
doing anything.

::: warning Submit is not undo-able by default
Returning a record needs a **Return** action drawn from the step it landed on.
Reopening a *finished* record needs the reopen grant. Neither is automatic.
:::

## Permissions

You can take an action only if you are among the current step's assignees —
directly or through a group. **Reopen** and **Revision** need their own owners
in module setup, and only work when the module enables them. See
[Permissions](/concepts/permissions).
