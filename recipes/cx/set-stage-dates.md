---
description: "Entering the dates you can, and understanding the ones you cannot."
---

# How do I set the dates for a stage?

::: tip Who can do this
The project's grants on the workbench.
:::

Most stage dates are **computed**, not typed. Only stages with no dependency
accept dates by hand.

## Steps

1. Open the asset and go to its **Stages** tab.
2. Find the stage. If its forecast dates are editable, it is an **anchor** —
   type them in.
3. If they are not editable, the stage has a dependency and its dates are
   calculated. Change the anchor it derives from instead.
4. Save.

## Result

Editing an anchor **cascades**: stages depending on it are recomputed forward,
stages it depends on are recomputed backward.

| | What happens |
| --- | --- |
| **Completed stages** | Never touched. History is not rewritten. |
| **In-progress stages** | The forecast end moves; the start is preserved. |

::: tip Why a date field is greyed out
That stage depends on another one, so its dates are the date engine's to set.
Clearing the dependency re-enables manual entry — but then nothing is scheduling
it.
:::

## Related

- [How do I enter dates for many assets at once?](./bulk-dates)
- [How do I find out why a stage won't close?](./stage-wont-close)
