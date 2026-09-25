---
description: "Adding an approval stage to a workflow."
---

# How do I add a step to a workflow?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

## Steps

1. Open **Settings → Module designer → Workflows**.
2. If the current version is **published**, choose **Create new version** — a
   published version is read-only.
3. On the canvas, add a **step** and name it.
4. Connect it with **actions** — the lines are the buttons people will press.
5. Point the step at a **form**.
6. Set its **completion rule** — one, all, or majority.
7. **Publish** when it validates.

## Result

The new version is live for records created **from now on**. Records already
running on the previous version keep following it to completion.

::: warning Assignees are set elsewhere
The canvas defines the shape. **Who** each step goes to is set per deployment in
[module setup](/setup/) — one workflow serves several projects with
different people in them.
:::

## Related

- [How do I change a live workflow safely?](./change-a-live-workflow)
- [How do I create a module?](./create-a-module)
