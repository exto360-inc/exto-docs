---
description: "Working out which gate is blocking a cell."
---

# How do I find out why a stage won't close?

::: tip Who can do this
Anyone who can view the stage.
:::

A cell that refuses to close is almost always **gated** — something else has to
reach a state first. The transition simply does not happen, and the cell stays
blocked.

## Steps

1. Open the cell and read its **gates**. Each one names a target and the state
   that target must reach.
2. Check the **target's** status, not this cell's.
3. If it is a **level** gate, check every stage in that level — not just one.
4. If it names a **different asset**, go and look at that asset.
5. Check for **gating module** records — these block a stage without looking
   like gates.

## Result

Clearing the condition the gate names lets the cell close. Gates cannot be
overridden by anybody, at any role — that is the point of them.

::: tip All gates must clear
Every gate on a stage must be satisfied. There is no "any of" — if the business
rule is a choice, the stages need restructuring, not the gates.
:::

## If there are no gates at all

Then it is not a gate. Check whether **required** items on the checklist are
unanswered, or whether you have **edit** on that stage rather than just view.

## Related

- [How do I complete a checklist on a cell?](./complete-a-checklist)
- [Gates & dependencies](/cx/gates)
