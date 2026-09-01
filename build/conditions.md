---
description: "Routing without a person — and why it never counts as progress."
---

# Conditions

A **condition** routes a record without involving anybody. The engine evaluates
its expression the instant the record arrives and sends it straight down the
matching branch — nobody sees it, and nobody has to.

<Shot src="build/condition-node" alt="A condition node with two branches" pending
  caption="A condition splitting on amount — under the limit goes straight to Approved." />

## When to use one

Use a condition when the decision is a fact, not a judgement:

- Route by amount, so small claims skip an approval.
- Route by type, so the right specialist gets it.
- Skip a step entirely when a field says it does not apply.

If a person has to think about it, that is a [step](/build/steps-and-actions),
not a condition.

## Adding one

Drag **Condition** from the palette, then draw lines out of it to each
destination. Select the node to write its **expression**.

The expression is evaluated against the record's field values. Draw one line
per outcome, and make sure every outcome is covered — a record that arrives at
a condition and matches nothing has nowhere to go.

::: warning Cover every branch
Validation catches a condition with no way out, but it cannot tell you that
your expression leaves a gap. Include a fallback branch.
:::

## Conditions are not progress

A condition is evaluated by the engine, not performed by a person. Everything
Exto counts as progress — steps done, steps total, the progress ring on the
record list — excludes them.

That is deliberate. Counting them is what made a three-step workflow report
"4 of 7": two of the four travelled were conditions evaluated in the same
instant, and nobody did them. They are reported separately as **rules
evaluated**.

The record's history still shows a condition was traversed, so the path stays
auditable. It just is not work.

::: tip Conditions can stamp an actor
The workflow instance records the person who moved the step *before* the
condition against the condition's entry, because someone had to trigger the
evaluation. [Workflow progress](/work/workflow-progress) knows this and does
not present them as having done it.
:::

## Chaining

Conditions may lead to other conditions. A record passes through the whole
chain in one evaluation, arriving at the first real step that matches. This is
how a routing table with a dozen outcomes stays readable — one question per
node, rather than one enormous expression.

## Related

- [Steps & actions](/build/steps-and-actions) — the human half.
- [Rules](/build/rules) — conditional behaviour *within* a form, which is a
  different thing entirely.
- [Workflows](/build/workflows) — the canvas.

## Permissions

Editing conditions requires <Perm role="PME" />, the application role that
opens **Settings**. A published version is read-only.
