---
description: "Template, version and instance, and why an instance is a log."
---

# The workflow engine

Three things share the word "workflow", and separating them is most of
understanding the engine.

| | What it is | Mutable |
| --- | --- | --- |
| **Template** | The design: steps, conditions, actions | Only as a draft |
| **Version** | A published, frozen template | Never |
| **Instance** | One record's journey through a version | Appends as it moves |

A template says what *can* happen. An instance says what *did*.

## The template

A directed graph of four node kinds — **start**, **step**, **condition** and
**end** — joined by edges that are **actions**.

The canvas is a design surface over that graph. What it stores is the template
plus a design document holding positions, so a workflow reads the same wherever
it is drawn.

### Termination is an action, not a node

Stored templates contain no end step. Termination is expressed by an action
whose next step is a reserved terminal marker.

The canvas keeps end nodes for layout, and every one of them serialises to that
same marker — which is why several ends can coexist and all mean one thing.

Being explicit about the marker matters: emitting a display name instead reduces
to an empty next step, which still terminates, but only by accident.

## Actions

An edge carries the action's name, the label people press, the status it stamps,
whether it is primary or secondary, and its settings — whether a comment is
required, whether assignees may be changed, whether to stay on the page, and
whether an external service is called.

Status has a default per action name, applied when none is set, so a workflow
drawn without touching statuses still produces sensible ones.

## The instance is a log

An instance begins with the first step and **appends** as the record moves. It
records what has happened and says nothing about what remains; upcoming steps
are read from the template instead.

Two consequences shape everything built on it:

- **One entry per visit, not per step.** A returned record visits a step twice
  and gets two entries. Collapsing them would hide the loop, which is usually
  the interesting part.
- **Status is derived, never stored.** A record's one-word state is read off the
  end of its instance each time it is needed.

## Conditions are not work

A condition is evaluated by the engine, in the same instant, with nobody
involved. Every count the product shows — steps done, steps total, the progress
ring — excludes them.

Counting them is what made a three-step workflow report "4 of 7". They are
reported separately as rules evaluated.

The instance still stamps an actor against a condition's entry, because someone
had to move the step before it. Anything reading the model has to know that and
not present them as having done it.

## The action registry

Actions that *do* something beyond moving the record are registered rather than
hard-coded, so the set of behaviours can grow without the engine changing.

## Versioning

Publishing freezes a template. Records already running on an earlier version
keep following it to completion.

This is the whole point: changing next month's approval path must not re-route
the records already in flight. It also means several versions can be live at
once, and a record's history stays readable against the version it actually ran
on.

## Where to look

| Concern | Path |
| --- | --- |
| Canvas serialisation | `src/features/module-designer/api/workflowDesign.ts` |
| The designer | `src/features/module-designer/components/WorkflowDesigner.tsx` |
| Derived progress and status | `src/features/module-records/workflow-progress/progressModel.ts` |
| Engine and action registry | `server/workflow/` |

## Related

- [Workflows & versions](/concepts/workflows-and-versions) — the product view.
- [Workflow progress](/work/workflow-progress) — reading an instance.
