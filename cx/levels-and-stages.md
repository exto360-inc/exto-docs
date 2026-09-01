---
description: "The X axis: grouping work into levels, and every setting a stage carries."
---

# Levels & stages

The **X axis** of the [matrix](/cx/matrix). Levels group the work; stages are
the work. Between them they decide what columns exist and in what order they
read.

Both are edited in the workbench editor at **Settings → CX workbench**.

<Shot src="cx/stages" alt="The stages tab" pending
  caption="A stage and its settings — level, order, execution mode, and what it carries." />

::: tip Order matters
Levels must exist before a stage can reference one. Work the tabs left to right
the first time through.
:::

## Levels

A level is a phase of work — *L1 Design*, *L2 Installation*, *L3 Testing*. In
the matrix it becomes a collapsible header spanning its stages.

| Setting | Notes |
| --- | --- |
| **Name** | What people read. |
| **Code** | What stages and gates refer to. |
| **Description** | Optional. |
| **Display order** | The left-to-right sequence. |
| **Status** | `ACTIVE` shows it; `INACTIVE` hides it. |

A workbench with a single level shows no level header row at all — there is
nothing to group.

## Stages

A stage becomes one column. It carries more settings than anything else in a
workbench.

### Identity

| Setting | Notes |
| --- | --- |
| **Name** | The column heading. |
| **Code** | The identifier gates and templates use. |
| **Description** | Optional. |
| **Level** | Which level's group it sits under. |
| **Display order** | Its position within that level. |
| **Status** | `ACTIVE` or `INACTIVE`. |

### Behaviour

| Setting | Values | Effect |
| --- | --- | --- |
| **Execution mode** | `PARALLEL` / `SEQUENTIAL` | Whether dependents run alongside this stage or strictly after it. |
| **Required** | on/off | The stage must complete before the asset can close. |
| **Gating** | on/off | This stage blocks others until it reaches its condition. |
| **Weight** | number | Its relative contribution to progress. |

**Required** and **Gating** are easy to confuse. *Required* is about this
stage's own necessity — an asset with an incomplete required stage is not
finished. *Gating* is about other stages — it makes this one something they
wait on. See [Gates & dependencies](/cx/gates).

### Scheduling

These four settings feed the date engine and nothing else:

| Setting | Values |
| --- | --- |
| **Depends on** | The stage this one is scheduled from. |
| **Dependency type** | `FS`, `SS`, `FF` or `SF`. |
| **Duration** | How long the stage takes. |
| **Lag** and **lag unit** | An offset, in `HOURS` or `DAYS`. |
| **Lag type** | `NONE`, `AFTER_PREVIOUS_LEVEL`, or `AFTER_PREVIOUS_STAGE`. |

They are covered properly in [Dates & scheduling](/cx/dates) — including why a
stage with no dependency is the only kind whose dates you can type in by hand.

### What a stage carries

| Attachment | Effect |
| --- | --- |
| **Checklist** | A [checklist](/build/checklists) rendered inside every cell for this stage. Its pass/fail statistics become the cell's percentage. |
| **Modules** | Modules whose records are surfaced on the stage. |
| **Gates** | Rules that block this stage's transitions. |
| **Rules** | Conditional behaviour on the stage. |

Attaching a checklist changes how the stage is measured, not just what it shows:
without one, a cell is 0% or 100%; with one, it is the proportion of items
passed.

## Custom fields

Stages accept custom fields alongside the built-in settings, defined on the
workbench's **Fields** tab. See [Designing a workbench](/cx/designer).

## Changing stages later

Stages are workbench-level definitions. Editing one changes what the definition
says; assets already provisioned carry **stage instances** created from the
[template](/cx/stage-templates) that was published when they were added.

::: warning Adding a stage does not add it to existing assets
New stages reach assets through a new template version at provisioning. Check
[Stage templates](/cx/stage-templates) before assuming a change has propagated.
:::

## Permissions

Creating and editing levels and stages happens under **Settings → CX
workbench** and requires <Perm role="PME" />.

Who may *see* or *work* a stage once it exists is a different question,
answered per project group in the project's **Stage configurations** tab — see
[Completing a cell](/cx/completing-a-cell).
