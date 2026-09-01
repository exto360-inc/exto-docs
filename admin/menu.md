---
description: "The navigation tree, menu levels, activation, and the landing page."
---

# Menu configuration

The navigation is not automatic. A module exists, is configured and is granted
to a group, and still nobody sees it until a menu entry points at it. Menu
setup is at **Settings → Menu setup**.

<Shot src="admin/menu-setup" alt="The menu setup tree" pending
  caption="The menu tree — drag an item into a folder to nest it." />

## The tree

A menu is a tree of items and folders. Drag an item onto a folder to nest it,
or onto the root to bring it back out. The order in the tree is the order in
the sidebar.

## What an item can point at

| Target | Notes |
| --- | --- |
| **Module** | The module's record list. |
| **Workflow template** | Opens against a chosen template. |
| **Dashboard** | A dashboard built in [dashboard setup](/build/dashboards). |
| **CX workbench** | A workbench's execution view. |
| **URL** | An embedded external page. |

An item has a **display name** — what people read — plus its target, and an
**Is applicable for mobile** flag controlling whether it appears in the mobile
app.

## The landing page

One menu item can be flagged as the **landing page** — where people arrive
after signing in.

`/home` is not a page. It is a resolver: it reads the landing page setting and
redirects, replacing itself in history so **Back** never returns to it. If no
landing page is set, or the setting points at `/home` itself, it falls back to
the app default, **Projects**.

Dashboard and iframe items open the way the sidebar opens them — in a side
panel rather than as a full route — so a dashboard works as a landing page.

::: tip A blank landing page is a hung request, not a misconfiguration
If the setting cannot be read within a few seconds, people are sent to Projects
rather than being stranded on a spinner. Someone landing on Projects
unexpectedly usually means a slow response, not a missing setting.
:::

::: warning External URLs are restricted
A URL item must be on `*.exto360.com` or `*.synkrato.com`. Anything else is
rejected on save.
:::

## Levels

Menus are organised into **levels**, and you switch between them from the level
picker. Create a new level when a distinct audience needs a distinct
navigation, rather than piling every item into one tree and hiding most of it.

## Menu actions

| Action | Effect |
| --- | --- |
| **Rename** | Changes the menu's name. |
| **Duplicate** | Copies the whole menu — the safe way to try a restructure. |
| **Activate** | Makes it the live menu. The sidebar updates immediately. |
| **Deactivate** | Takes it out of use without deleting it. |
| **Delete** | Removes it. |

::: tip Duplicate before restructuring
A menu edit reaches everyone the moment it is activated. Duplicate, rearrange
the copy, then activate it.
:::

## Menu entries do not grant access

A menu item makes something **findable**, not **permitted**. Someone without
the group grant sees nothing useful behind the entry. Conversely, someone with
the grant and no menu item has to know the URL.

Set them together: grant in [Users & groups](/admin/groups), then add the
entry here.

## Permissions

Menu setup is an administrator task, reached through the **Menu setup** config
module granted to your groups. Changes take effect for everyone as soon as a
menu is activated.
