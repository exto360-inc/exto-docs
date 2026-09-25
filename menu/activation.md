---
description: "Why a saved menu is not a live menu, and what the landing page does."
---

# Activation

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

::: warning Saving is not activating
A saved menu is a draft. **Activation** is what publishes it. This is the most
common reason a menu change "did not work".
:::

Menus can be **active** or inactive, and the list shows which. Activating one
replaces what people see at that level; deactivating it falls back.

The confirmation steps — *Confirm activation*, *Confirm deactivation* — exist
because the change is immediate and affects everyone at that level.

## The landing page

One menu item can be flagged as the **landing page** — where people arrive after
signing in.

`/home` is not a page. It is a resolver: it reads the landing page setting and
redirects, replacing itself in history so **Back** never returns to it. If none
is set, it falls back to **Projects**.

Dashboard and URL items open the way the sidebar opens them — in a side panel —
so a dashboard works as a landing page.

::: tip Someone landing on Projects unexpectedly
If the setting cannot be read within a few seconds, people are sent to Projects
rather than being left on a spinner. That usually means a slow response, not a
missing setting.
:::

## Deleting

**Confirm delete** removes an item. Anything nested inside it goes too, so
collapse a folder and check before deleting it.

## Related

- [Building a menu](/menu/building)
- [Item types](/menu/item-types)
