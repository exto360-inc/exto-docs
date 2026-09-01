---
description: "Where a record is, how it got there, and where its time went."
---

# Workflow progress

Where a record is, how it got there, and where its time went. The panel reads
the record's workflow instance — the log of what actually happened — and fills
in what remains from the template.

<Shot src="work/workflow-progress" alt="The workflow progress panel" pending
  caption="A record on its second visit to Review, with the time strip below." />

## The header

One line that answers "how is this record doing".

| Figure | Meaning |
| --- | --- |
| **Status** | One word for the whole record — see below. |
| **Age** | Time since creation. Freezes once the record finishes. |
| **Current step** | Where it is now, and how long it has sat there. |
| **Steps done / total** | Human steps only. Conditions are excluded. |
| **Returns** | How many times the record has been sent back. |

### The status words

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

## The timeline

One entry per **visit**, in chronological order. A record that was returned
visits the same step twice and gets two entries, because collapsing them would
hide the loop — usually the interesting part.

Each entry shows:

- The step name and, when it has been visited before, which visit this is.
- Its state: **completed**, **current** or **upcoming**.
- Who completed it, which action they took, and the status it produced.
- Any comment left with the action.
- Elapsed time, against the step's turnaround target when it defines one.
  A step past its target is marked overdue.

Upcoming steps come from the **template**, not the instance — the instance only
records what has already happened.

## Where the time went

A strip under the timeline splits the record's whole life into its visits, and
names the single slowest one. This is the fastest way to answer "why did this
take three weeks" — the answer is almost always one step, not all of them.

## Rules evaluated

Conditions are evaluated by the engine in the same instant, with nobody
involved. They are reported as **rules evaluated** and never counted as
progress: counting them is what makes a three-step workflow claim "4 of 7".

## In the list

The record list shows the same model as a **progress ring** per row, tinted by
the derived status — so you can see which records are overdue without opening
any of them. See [Record list](/work/record-list).

## Permissions

Anyone who can open the record can see its progress. The panel is read-only;
moving a record is [Taking actions](/work/taking-actions).
