---
description: "The workflow canvas, its views, and what publishing validates."
---

# Workflows

Design how a record moves: the steps it passes through, the conditions that route
it, and the actions people take to move it on.

<Shot src="workflows/list" alt="The workflows list" pending
  caption="The workflows list — one row per workflow, with its current version and state." />

## List page

Every workflow the module has, newest first. Each row shows its name, its version
and whether that version is **published** or still a **draft**.

- **Published** — in use, and read-only. Records follow it.
- **Draft** — editable, and not yet used by any record.

Only the latest version can spawn a new one, so the list offers **Create new
version** on that row alone.

## Creating a workflow

1. Open **Module designer → Workflows**.
2. Choose **Start from scratch**, or a sample to begin from.
3. Give it a name — publishing is blocked until it has one.
4. Draw the steps, then publish when it validates.

<Clip src="workflows/draw-a-workflow" pending
  caption="Drawing three steps, connecting them, and publishing · 25s" />

## Designer

The canvas holds the workflow: steps, conditions, and the action lines between
them. It arranges itself when you open it, so a workflow reads the same wherever
it is shown.

<Shot src="workflows/designer" alt="The workflow designer" pending
  caption="A workflow with two steps, four conditions and five ends." />

- **TB / LR** — read the flow down the page or across it.
- **Auto-arrange** — tidy the diagram; lines route around boxes.
- **All / Focus / Trace** — narrow the canvas to one step or one path.
- **Table** and **Split** — the same workflow as a list, or both at once.

::: tip A published version is read-only
Editing controls disappear rather than sitting greyed out. To change a published
workflow, use **Create new version** — records already running on the old version
keep following it.
:::

## Permissions

Designing and publishing workflows requires <Perm role="PME" />, the
application role that opens **Settings**.

Everyone else encounters a workflow only through the records that follow it.
