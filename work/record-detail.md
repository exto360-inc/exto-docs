---
description: "One record open: the step's form, and the three shapes it appears in."
---

# Record detail

One record, open. The form for its current workflow step fills the main column;
a rail of [widgets](/work/record-widgets) down the right holds everything that
is not a field.

<Shot src="work/record-detail" alt="A record open with the sidebar" pending
  caption="The step's form, the toolbar above it, and the widget rail on the right." />

## The layout

<DScreen
  title="←  EXPENSES › EXP-1042"
  :panes="[
    { label: 'The current step’s form', flex: 3 },
    { head: '⚡ Actions', label: 'Widget content', flex: 2 },
  ]"
  :rail="['⚡', '💬', '📎', '🕘']" />

The toolbar carries a **back** control, a **breadcrumb** naming the module and
record, and **refresh**. The rail on the far right switches widgets; the panel
beside it shows the active one.

## The form belongs to the step

This is the thing people miss. The form is not attached to the record — it is
attached to the **workflow step** the record is currently on.

The same record can show three fields while it is being raised and twelve while
it is being reviewed, because each step points at its own form. Nothing is being
hidden from you; a different form is being shown.

See [Steps & actions](/build/steps-and-actions).

## Three ways a record opens

The same record screen appears in three shapes:

| Shape | Where |
| --- | --- |
| **Full page** | From the [record list](/work/record-list) or [My tasks](/work/my-tasks). |
| **Dialog** | Over the top of another screen. |
| **Side panel** | Beside a grid, or inside a [CX cell](/cx/completing-a-cell). |

They are the same record with the same rules. What differs is how much room
there is — the widget rail is collapsed or absent in the narrower shapes, and
[insights](/ai/insights) do not appear in embedded forms at all.

## Saving

- **Save** — or <kbd>⌘</kbd><kbd>S</kbd> — persists the record where it is.
  Nothing moves, nobody is notified.
- An **action** — Submit, Approve, Return — advances it, stamps a status, and
  notifies the next step's assignees.

See [Taking actions](/work/taking-actions).

::: warning A saved record is still a draft
Saving does not submit. If a colleague cannot find your record, check whether it
ever left the draft state.
:::

### Unsaved changes are guarded

Leaving a record with unsaved edits prompts you first — both for in-app
navigation and for closing the tab. The prompt is not a formality: the edits are
lost otherwise.

## Choosing a context

Where a module spans several contexts, creating a record asks which **tenant,
workspace or project** it belongs to, chosen from a tree of the contexts you can
reach. That choice decides where the record lives and who can see it, and it is
not casually changed afterwards.

See [Projects & spaces](/concepts/projects-and-spaces).

## Fields with their own history

Where the module has [history](/work/history) enabled and the field's own toggle
is on, a field carries a small history icon. Clicking it drops a panel in
directly beneath the field with that field's timeline — text fields offer a
word-level **Show changes** diff rather than printing both versions.

## Sub-tables

A table field is a grid inside the record. Each row carries three **signal**
icons showing what it holds: attachments, linked records — green when all are
approved, amber otherwise — and how many save events touched it.

## What is read-only, and why

A field can be read-only for four different reasons, and they look identical:

1. The **step's form** marks it read-only.
2. A [rule](/build/rules) made it read-only conditionally.
3. It is a **system field** the platform writes.
4. The record is on **someone else's step**, so the whole form is read-only to
   you.

The fourth is the common one. Check the Workflow widget before assuming a
configuration problem.

## Permissions

Seeing the record requires the module granted to a group, plus either **View all
records** or a workflow step that makes it yours. Editing requires that step to
be yours now. See [Permissions](/concepts/permissions).
