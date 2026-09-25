---
description: "Where a record is, how it got there, who did what, and where its time went — graphically and as a timeline."
---

# Workflow progress

::: tip Who can do this
Anyone who can open the record. The panel is read-only — moving a record is
[Taking actions](/work/taking-actions).
:::

Every record that runs a [workflow](/build/workflows) carries a progress panel.
It reads the record's **workflow instance** — the log of what actually happened
— and fills in what remains from the **template**, so it can show both the
journey so far and the road ahead.

The same panel appears in two places, and behaves identically in both:

| Where | How to open it |
| --- | --- |
| A record's sidebar | The **Workflow** icon on the widget rail |
| The [record list](/work/record-list) | Click a row's **progress ring** |

## Two views of the same thing

**Graphical** and **Timeline** are tabs on the panel. Graphical is the default,
because it answers *"where is this record"* at a glance, where the timeline has
to be read.

<Shot src="work/workflow-progress" alt="The Graphical view of a record's progress"
  caption="Graphical — the workflow with the path this record actually took picked out, and who took each step." />

<Shot src="work/workflow-timeline" alt="The Timeline view of a record's progress"
  caption="Timeline — the same journey in order, with a duration against every step." />

| View | Answers |
| --- | --- |
| **Graphical** | *Where is this record, and what route did it take?* |
| **Timeline** | *What happened, in what order, who did it, and how long did each part take?* |

Switching views does not reload anything — both are drawn from the same model.

## The record's current status

The Timeline opens with a banner stating the record's status, its total elapsed
time, and where it left the workflow. The banner takes its colour from the
status, so the panel reads correctly before a word of it does.

| Status | Means |
| --- | --- |
| **Not started** | Created; no step has begun. |
| **In progress** | Moving normally. |
| **Overdue** | A step has passed its turnaround target. |
| **Approved** | Finished on an approving action. |
| **Rejected** | Finished on a rejecting action. |
| **Closed** | Finished on an action carrying no verdict. |

**Overdue** outranks **In progress** deliberately — a late record must not read
as a healthy one. **Closed** is a real outcome and is not the same as approved.

Beneath the banner, three cards answer the questions people open this panel for:

| Card | Holds |
| --- | --- |
| **Started** | When the first step began, and how many steps the workflow has. |
| **Finished** | When it left the workflow, and at which step. |
| **Slowest step** | The single step that took longest, and what share of the total it accounted for. |

**Slowest step** is the fastest way to answer *"why did this take three weeks"*.
The answer is almost always one step, not all of them.

## Execution time

Every step that has been visited carries an elapsed time. Durations are written
at the coarsest unit that still reads honestly — `47s`, `32m`, `3h 20m`,
`2d 4h` — so a glance is enough to tell a slow step from a fast one.

- On the **Timeline**, the duration sits at the right of each entry, with a bar
  underneath sized against the record's total.
- On the **Graphical** view, it sits on the step's node, next to who took it.

A step still in progress shows the time it has been sitting there; a step never
reached shows `—`.

::: tip Times are per visit, not per step
Each timeline entry is one **visit**. A record that was returned visits the same
step twice and gets two entries with two durations — collapsing them would hide
the loop, which is usually the interesting part.
:::

## Full screen

Both views expand. The **maximise** control at the right of the panel header
takes the panel over the whole window — the same two tabs, given room.

<Shot src="work/workflow-fullscreen" alt="The Graphical view full screen"
  caption="Graphical, full screen — the whole route, with each step's owner and duration legible." />

<Shot src="work/workflow-timeline-full" alt="The Timeline view full screen"
  caption="Timeline, full screen — the status banner, the three summary cards, and every visit in order." />

Expanding gives the diagram room and stops the timeline wrapping; it does not
rearrange anything. <kbd>Esc</kbd> collapses back to the drawer first, and only
closes the panel on a second press — so a full-screen reader is never thrown out
by one keystroke.

In the Graphical view, **TB** and **LR** switch the diagram between top-to-bottom
and left-to-right, and the zoom controls sit at the bottom-left.

## What is counted, and what is not

Conditions are evaluated by the engine in the same instant, with nobody
involved. They are reported as **rules evaluated** and never counted as
progress — counting them is what makes a three-step workflow claim "4 of 7".

The step count is **human steps only**; Start and End are excluded too.

Upcoming steps come from the **template**, not the instance. The instance only
records what has already happened, which is why a record on a superseded
workflow version still shows the version it is actually running —
`ISSUE_PROJ · v11` in the header, not whatever is current.

## In the record list

The list shows the same model as a **progress ring** on every row, tinted by the
derived status — so you can see which records are overdue without opening any of
them. Every row on a module names the same template, so the ring costs one
request for the whole grid rather than one per row.

Clicking a ring opens this panel for that record. See
[Record list](/work/record-list).

## Related

- [Record detail](/work/record-detail) — the record itself
- [Taking actions](/work/taking-actions) — how a record moves
- [Record history](/work/history) — field-level changes, as opposed to workflow steps
- [Workflows](/build/workflows) — designing the steps this panel reports on
