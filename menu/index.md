---
description: "The navigation people see, and how it is assembled."
---

# Menu configuration

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

The menu is what turns a deployed module into something people can reach. A
module with no menu item is invisible, however well it is built.

<Shot src="admin/menu-setup" alt="Menu setup"
  caption="The menu tree — drag items to reorder or nest them, then activate." />

## The pages here

| Page | Covers |
| --- | --- |
| [Building a menu](/menu/building) | Levels, items, folders and ordering. |
| [Item types](/menu/item-types) | What an item can point at. |
| [Activation](/menu/activation) | Why a saved menu is not a live menu. |

## The shape of it

A menu is a **tree**. Items sit at the root or nest inside **folders**, and are
arranged by dragging — *drag here to add to root*, *drag here to nest inside
folder*.

Each item has a **display name**, a type, and a target.

## Menus are per level

| Level | Applies to |
| --- | --- |
| `TENANT` | Everyone in the tenant. |
| `PROJECT` | People working in that project. |

A project can have its own menu, so two projects running different processes
show different navigation. **Create new level** starts one.

## Everyone sees a different menu

The menu is **filtered by permission**. An item whose target somebody cannot
reach does not appear for them.

::: tip A short sidebar is not a fault
It means that person's groups grant less, which is usually correct. If somebody
reports a missing item, check their access before editing the menu — see
[Diagnosing "I can't see it"](/recipes/cant-see-it).
:::

## A menu entry is not access

A menu item makes something **findable**, not **permitted**. Someone without
the group grant sees nothing useful behind the entry. Conversely, someone with
the grant and no menu item has to know the URL.

Set them together: grant in [Users & groups](/admin/groups), then add the
entry here.

## Related

- [Module setup](/setup/) — the step before this one.
- [Modules](/modules/) — the object being linked to.
