---
description: "Anchor dates, dependency types, the working calendar, and the cascade."
---

# Dates & scheduling

Most stage dates are not typed in — they are computed. A handful of **anchor**
stages take dates by hand, and every stage that depends on one is calculated
from it and recalculated whenever it moves.

<Shot src="cx/dates" alt="The bulk dates grid" pending
  caption="Every anchor stage across the workbench, with forecast start and end editable in place." />

## Four kinds of date

Every asset and stage instance carries four pairs. They are not
interchangeable:

| Pair | Means | Set by |
| --- | --- | --- |
| **Planned** | The original intent. | Import or entry. |
| **Baseline** | The agreed schedule, frozen so drift is measurable. | Baselining. |
| **Forecast** | What is currently expected. | **The date engine.** |
| **Actual** | What happened. | Working the stage. |

The date engine computes **forecast** dates. Baseline is what you compare
against; actual is what you record.

## Anchors, and everything else

This is the rule that governs the whole page:

::: tip A stage's dates are manual only when it depends on nothing
A stage with an empty **depends on** is an **anchor**: its forecast dates are
entered by hand. A stage with a dependency has its dates computed, and typing
into them is rejected.
:::

Clearing a stage's dependency re-enables manual dates. Setting one disables
them, in the same edit.

## Dependency types

A dependency is a scheduling relationship, borrowed from standard project
scheduling:

| Type | Reads as |
| --- | --- |
| **FS** — finish to start | This starts after the other finishes. The common case. |
| **SS** — start to start | Both start together. |
| **FF** — finish to finish | Both finish together. |
| **SF** — start to finish | This finishes after the other starts. Rare. |

To that, each stage adds a **duration**, and a **lag** with its unit — a
deliberate gap before the relationship takes effect. *Finish to start, plus two
days* is a stage that begins two days after its predecessor ends.

**Lag type** selects what the offset is measured from: nothing, the previous
level, or the previous stage.

## Calendar or business days

By default an offset counts **calendar days** — a three-day lag over a weekend
lands on Sunday.

A workbench can opt into **business mode** instead, in which day and week
offsets step over **working days only**, skipping weekends and a holiday list.
Working days default to Monday–Friday and can be set per workbench.

::: warning Business mode changes every computed date
It is a workbench-level setting, and turning it on recomputes the schedule.
Decide it before the project is planned, not during it.
:::

## The cascade

Changing an anchor's forecast dates does not move that stage alone. The engine
walks the dependency graph in both directions:

| Direction | What happens |
| --- | --- |
| **Downstream** — stages depending on this one | Recomputed forward from the new dates. |
| **Upstream** — stages this one depends on | Recomputed backward. |
| **Completed stages** | **Never touched.** History is not rewritten. |
| **In-progress stages** | The forecast end moves; the start is preserved. |

The in-progress rule matters: work that has already begun keeps the date it
actually began on, and only its expected finish moves.

## Entering dates in bulk

Editing anchors one asset at a time does not scale past a few dozen. The
**Dates** tab lists every *(asset × anchor stage)* pair in the workbench in one
grid.

- Rows load **a page at a time** as you scroll, so a workbench with a hundred
  thousand anchors never loads at once.
- **Search runs on the server**, across asset id, asset name and stage name.
- Edits are tracked **across pages** and saved in one batched call — the count
  of unsaved edits is shown as you go.
- Dates can be **imported from a spreadsheet** rather than typed.
- An **external id** can be set per row, for reconciling against another
  scheduling system.

Editing a start or end here writes to that asset's stage and triggers the same
cascade as editing it individually.

The per-asset editor on an asset's **Stages** tab still works exactly as before;
this grid is an addition, not a replacement.

## Where dates show up

- **Gantt** — the section tab that draws stage dates on a timeline.
- **KPI cards** — *Delayed* and *At risk* are both computed from end dates. See
  [The commissioning matrix](/cx/matrix).
- **Notifications** — stage notifications fire relative to a date pivot. See
  [Completing a cell](/cx/completing-a-cell).

## Permissions

The **schedule mode** and working calendar are workbench settings, so changing
them requires <Perm role="PME" />.

**Anchor dates** are entered from the execution view and follow the project's
grants on the workbench.

**Computed dates cannot be edited by anyone**, at any role — the restriction is
a property of the stage having a dependency, not of who is looking. Change the
anchor they derive from.

## Related

- [Levels & stages](/cx/levels-and-stages) — where duration, lag and dependency
  type are set.
- [Gates & dependencies](/cx/gates) — the other kind of dependency, which
  blocks completion rather than moving dates.
