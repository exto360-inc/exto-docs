---
description: "Template, version and instance — and why publishing freezes a workflow."
---

# Workflows & versions

A workflow is the path a record takes. It is designed as a graph, published as
an immutable version, and then followed — one record at a time — as a log of
what actually happened.

## Three things called "workflow"

They are easy to confuse, and every question about workflows resolves once you
separate them.

| Thing | What it is | Changes? |
| --- | --- | --- |
| **Template** | The design: steps, conditions and actions. | Only while it is a draft. |
| **Version** | A published, frozen copy of a template. | Never. |
| **Instance** | One record's journey through a version. | Every time the record moves. |

A template says what *can* happen. An instance says what *did*.

## The graph

Four node kinds make up a template:

- **Start** — where records enter. Exactly one.
- **Step** — where a record waits for a person. The only node a human works at.
- **Condition** — a branch the engine evaluates instantly, with no one involved.
- **End** — where records leave. There may be several; they all mean the same
  thing.

Edges between nodes are **actions** — the buttons people press. An action
carries a label, the status it stamps on the record, whether it is primary
(a button) or secondary (a menu item), and whether it demands a comment.

See [Steps & actions](/build/steps-and-actions) and
[Conditions](/build/conditions).

## Versions

Publishing freezes a template into a version. From that moment:

- The version is **read-only**. Editing controls disappear rather than sitting
  greyed out.
- Records start following it.
- The only way to change it is **Create new version**, offered on the latest
  version alone.

Records already running on an older version keep following that version to
completion. This is the whole point of versioning: changing next month's
approval path must not re-route the forty records already mid-flight.

::: tip Draft versus published
A **draft** is editable and no record uses it. A **published** version is in
use and frozen. A module can have many versions and only one of them is the
latest.
:::

## Instances

An instance is a log, not a plan. It begins with the first step and appends an
entry each time the record moves, so it records what *has* happened and says
nothing about what remains. Upcoming steps are read from the template instead.

A returned record visits the same step twice, and the instance holds one entry
per **visit** rather than one per step — collapsing them would hide the loop,
which is usually the interesting part.

Each entry stamps the step, who completed it, which action they took, the
status it produced, any comment, and how long it sat there.

## Status, derived

A record's one-word status is derived from the end of its instance, never
stored:

| Status | Means |
| --- | --- |
| **Not started** | No step has begun. |
| **In progress** | Moving normally. |
| **Overdue** | A step has passed its turnaround target. |
| **Approved** | Finished on an approving action. |
| **Rejected** | Finished on a rejecting action. |
| **Closed** | Finished on an action carrying no verdict at all. |

**Overdue** deliberately outranks **In progress**: a late record must not read
as a healthy one. **Closed** is real, and is not the same as approved.

## Conditions are not progress

A condition is evaluated by the engine, not performed by a person. Counting
conditions as work is what makes a three-step workflow report "4 of 7", so
every count Exto shows — steps done, steps total, progress rings — excludes
them. They are reported separately as rules evaluated.

## Related

- [Workflows](/build/workflows) — the designer.
- [Publishing & versions](/build/publishing) — the publish gate in detail.
- [Workflow progress](/work/workflow-progress) — reading an instance.
