---
description: "Sending a record back to an earlier step instead of rejecting it."
---

# How do I send a record back for changes?

::: tip Who can do this
The current step's assignees, where the workflow provides a Return action.
:::

**Return** sends a record backwards to an earlier step so somebody can fix it —
as opposed to **Reject**, which usually ends it. Whether you have a Return
button at all depends on how the workflow was drawn.

## Steps

1. Open the record.
2. Open the **Actions** widget.
3. Press **Return**.
4. Explain what needs changing in the comment.

## Result

The record goes back to the earlier step, and the people there see it again in
their tasks. They fix it and submit it forward once more.

::: tip Your comment is the instruction
The person receiving it sees the record and your comment, and nothing else. A
returned record with a comment saying *"please fix"* generates one more round
trip than it needed to.
:::

A returned record visits the same step twice, and
[workflow progress](/work/workflow-progress) shows both visits rather than
merging them — which is how you spot a record that has been round the loop three
times.

## Related

- [How do I approve or reject a record?](./approve-or-reject)
- [How do I see what changed on a record?](./see-what-changed)
