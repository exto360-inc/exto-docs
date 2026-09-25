---
description: "Getting a finished record moving again."
---

# How do I reopen a record that was already finished?

::: tip Who can do this
A **Reopen owner**, set per deployment in module setup — and only where the
module allows reopening at all.
:::

A completed record is closed. Reopening pushes it back to an earlier step so it
can be corrected.

## Steps

1. Open the completed record.
2. Open the **Actions** widget.
3. Press **Reopen**.
4. Enter a reason.

## Result

The record returns to the step chosen when reopening was configured — not
necessarily the step it finished on — and becomes active again. It reappears in
that step's assignees' tasks.

::: warning No Reopen button?
Three different things produce that, and they need different people to fix:

1. **Reopening is switched off** for the module — a designer turns it on in the
   [module designer](/build/module-designer).
2. **You are not a Reopen owner** — an administrator grants it in
   [module setup](/setup/).
3. **The record is not actually complete** — reopen only applies to finished
   records.
:::

## Related

- [How do I request a revision?](./request-a-revision)
- [How do I find out why someone can't see something?](../admin/diagnose-access)
