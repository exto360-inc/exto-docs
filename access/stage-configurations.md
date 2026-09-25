---
description: "CX access, granted per stage to project groups."
---

# Stage configurations

::: tip Who can do this
Whoever the project grants it to, in the project's **Stage configurations** tab.
:::

The [CX workbench](/cx/) has its own access layer. Group grants get somebody
into the workbench; **stage configurations** decide which stages they can see
and work.

<Shot src="cx/stage-configs" alt="The Stage Configurations tab"
  caption="Stage Configurations — every stage in the workbench, with View, Edit and Reopen granted per group." />

## The three grants

| Grant | Allows |
| --- | --- |
| **View** | Seeing the stage's column and its cells. |
| **Edit** | Working its cells — checklists, status, evidence. |
| **Reopen** | Reopening a completed cell. |

Each is granted to **project groups**, per stage.

**Reopen** is deliberately separate from edit: it undoes a sign-off, which is a
different decision from doing the work.

## Implicit deny

::: warning A stage with no configuration is invisible
Stage access is implicit-deny. A newly added stage that nobody can see has
usually never been granted, rather than being deliberately restricted.

This is the first thing to check when a commissioning engineer reports a missing
column.
:::

## Where it sits among the others

| Layer | Decides |
| --- | --- |
| Group grants | Can they open the workbench at all? |
| **Stage configurations** | Which stages within it? |
| Gates | Whether the work may proceed — not a permission |

That last row matters: a blocked cell is **not** an access problem. No role
overrides a [gate](/cx/gates); the condition has to clear. See
[Completing a cell](/cx/completing-a-cell).

## Related

- [Permissions](/concepts/permissions)
- [Gates & dependencies](/cx/gates)
