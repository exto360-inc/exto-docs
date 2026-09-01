---
description: "Blocking a transition until something else reaches a state."
---

# Gates & dependencies

A **gate** stops a stage progressing until something else reaches a state. It is
how a workbench enforces that testing cannot close before installation is
signed off — and it is entirely separate from the dependencies that compute
dates.

<Shot src="cx/gates" alt="Gates on a stage" pending
  caption="Two gates on a stage — one watching a stage, one watching a whole level." />

## Gates are not date dependencies

The two get confused constantly. They are different mechanisms with different
effects:

| | **Depends on** | **Gates** |
| --- | --- | --- |
| Affects | The **timeline** | **Progression** |
| Does | Computes forecast dates from another stage | Refuses a transition until a condition holds |
| How many | One, with a type and a lag | Any number — **all** must clear |
| If unmet | Nothing; dates are just dates | The stage is **blocked** |
| Page | [Dates & scheduling](/cx/dates) | This one |

A stage can be scheduled from one stage and gated by three others. Changing
either has no effect on the other.

## What a gate says

Every gate is one sentence with four parts.

| Part | Values | Meaning |
| --- | --- | --- |
| **Kind** | `stage` / `level` | Whether it watches one stage or a level's aggregate. |
| **Trigger** | `start` / `close` | Which transition it guards. Defaults to **close**. |
| **Condition** | `started` / `completed` | What the target must reach. Defaults to **completed**. |
| **Asset** | optional | Which asset's target to watch. Defaults to this one. |

Read them as sentences:

- *Cannot **close** Testing until Installation is **completed**.*
- *Cannot **start** Handover until **Level 2** is **completed**.*
- *Cannot **close** Wiring until the parent asset's Power stage has **started**.*

### Trigger

- **start** — the gate must clear before the stage may move from *not started*
  to *in progress*.
- **close** — the gate must clear before the stage may reach *completed*.

A start gate stops work beginning. A close gate lets work happen but refuses to
let it finish. Most gates are close gates, which is why that is the default.

### Condition

- **completed** — the target must be completed.
- **started** — anything other than *not started* satisfies it, so a target in
  progress is enough.

## Cross-asset gates

By default a gate watches the **same asset** it sits on. Naming a different
asset makes it a cross-asset gate — *this asset's testing cannot close until
that asset's commissioning has finished*.

Gates reference an asset by its internal id, never by its code. Renaming an
asset — including through a re-import — therefore cannot silently break a gate
pointing at it.

::: warning A gate to a missing asset is dropped
When assets are provisioned, cross-asset gates are checked against the
registry. A gate pointing at an asset that does not exist is discarded rather
than silently blocking forever.
:::

## Gates all AND together

Every gate on a stage must clear. There is no "any of these" — to express a
choice, restructure the stages rather than the gates.

## Gate counts

Alongside the gates themselves, each stage and asset carries a **gate count** —
open and closed — and these **roll up**: an asset's count is its own open gating
records plus every child stage's plus every descendant asset's.

That is what makes the **Blocked** KPI meaningful on a parent row: it reflects
everything blocked beneath it, not just the parent itself.

Anything not explicitly closed counts as **open**, so a gate in an unexpected
state surfaces as actionable rather than disappearing.

## Gating modules

Beyond stage and level gates, a workbench can name **gating modules** — modules
whose records must be completed before a stage clears. They are set on the
workbench's General tab, and their records appear on the asset alongside its
stages.

## Making a stage into a gate

A stage's **Gating** switch is the other side of this: it marks the stage as
something other stages can wait on. A stage nobody gates against does not need
it.

## Diagnosing a blocked stage

If a cell will not close:

1. Open it and read its gates — each names its target and condition.
2. Check the **target's** status, not this stage's.
3. For a level gate, remember every stage in that level counts.
4. For a cross-asset gate, check the other asset.
5. Check gating-module records, which are gates that do not look like gates.

## Permissions

Defining gates on stages and templates happens under **Settings → CX
workbench** and requires <Perm role="PME" />.

At execution time a gate cannot be overridden by anybody, whatever their role —
the condition has to be cleared. That is the point of a gate.

## Related

- [Levels & stages](/cx/levels-and-stages) — where gates are attached.
- [Completing a cell](/cx/completing-a-cell) — what a blocked cell looks like.
