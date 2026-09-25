---
description: "Adding items, nesting them in folders, and ordering the tree."
---

# Building a menu

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

## Steps

1. Open **Settings → Menu setup**.
2. Choose the **level** you are editing, or **Create new level**.
3. Add an item and give it a **display name** — what people will read.
4. Choose its **type** and target. See [Item types](/menu/item-types).
5. Drag it where it belongs — to the root, or **inside a folder** to nest it.
6. Save, then **[activate](/menu/activation)**.

## Folders

An item of type **Group** is a folder: it points at nothing and exists to hold
other items. That is how *Operational Readiness*, *QAQC* and *Master Modules*
group what sits beneath them.

A folder with nothing visible inside it does not appear — so a folder whose
every child is permission-filtered away vanishes too, rather than opening onto
nothing.

## Ordering

Order is set by dragging. It is the order people read top to bottom, so put the
thing most of them open every morning first.

::: tip Name items for the reader
The display name is free text and does not have to match the module's name.
*Site Inspections* reads better than `INSP_SITE`, and only the display name is
ever shown.
:::

## Mobile

Each item carries **Is applicable for mobile**, deciding whether it appears in
the mobile app. A screen that needs a wide grid is often worth leaving out.

## Related

- [Item types](/menu/item-types)
- [Activation](/menu/activation)
