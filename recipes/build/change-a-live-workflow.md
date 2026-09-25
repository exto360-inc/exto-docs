---
description: "Changing an approval path without disturbing records in flight."
---

# How do I change a live workflow safely?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

You cannot edit a published workflow, and that is deliberate. You make a new
version instead.

## Steps

1. Open **Settings → Module designer → Workflows**.
2. On the latest version's row, choose **Create new version**.
3. Make your changes on the draft.
4. **Publish**.

## Result

New records follow the new version. **Records already in flight keep following
the version they started on**, all the way to completion.

That is the whole point: changing next month's approval path must not re-route
the records already sitting in someone's queue.

::: tip Several versions run at once
That is normal, not a problem. A record's history stays readable against the
version it actually ran on.
:::

## Related

- [How do I add a step to a workflow?](./add-a-workflow-step)
- [Publishing & versions](/build/publishing)
