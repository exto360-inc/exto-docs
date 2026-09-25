---
description: "Putting a module, dashboard or page into the navigation."
---

# How do I add a page to the menu?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A module that is deployed but not on the menu is invisible. The menu is what
leads people to it.

## Steps

1. Open **Settings → Menu setup**.
2. Choose the level the item belongs at.
3. Add an item and give it a **display name** — what people will read.
4. Point it at its target: a module, a workflow template, a dashboard, a CX
   workbench, or a URL.
5. Set **Is applicable for mobile** if it should appear in the mobile app.
6. Save, and **activate** the menu.

## Result

The item appears for everyone whose permissions include its target. The menu is
filtered per person, so it is shorter for some than others.

::: warning Saving is not activating
A saved menu is not a live menu. Activation is what publishes it.
:::

::: tip A URL item must be on an allowed domain
External page items are restricted to `*.exto360.com` and `*.synkrato.com`.
Anything else is refused.
:::

## Related

- [How do I set where someone lands after signing in?](./set-landing-page)
- [How do I give someone access to a module?](./grant-module-access)
