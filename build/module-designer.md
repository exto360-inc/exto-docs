---
description: "Nine tabs over one module, and what each one owns."
---

# Module designer

One module, nine tabs, at **Settings → Module designer**. It is where a module
gets its identity, its storage, its forms and its workflow, and where you will
spend nearly all of your building time.

<Shot src="build/module-designer" alt="The module designer" pending
  caption="The designer shell — tab rail on the left, the General tab open." />

## List page

The landing page lists the modules you can design, with the ones you opened
recently pulled to the top. **New module** creates one.

Creating a module asks for a **name**, a **display name** and a **kind**.

If you are digitising an existing paper or PDF form, the
[module builder](/build/module-builder) wizard creates the module, its form and
a starter workflow in one pass, and leaves you here to refine them.

::: warning The name is permanent
The name becomes the module's route (`/mod/expenses`) and the key every form,
rule and report refers to. It cannot be changed afterwards — renaming means
recreating.
:::

## The tabs

| Tab | Owns |
| --- | --- |
| **General** | Identity and the module-level switches. |
| **Forms** | The forms records are filled in through. See [Forms](/build/forms). |
| **Workflows** | The paths records take. See [Workflows](/build/workflows). |
| **Tables** | The columns records store. |
| **Reference tables** | Pointers to data in other modules. |
| **Log page views** | Which columns the record list can show. |
| **Data sets** | Named option lists for select fields. |
| **Checklists** | The checklists this module points at. |
| **External services** | Outbound API calls made from the module. |

Tables, reference tables and data sets are covered together in
[Tables & data sets](/build/tables-and-datasets); checklists in
[Checklists](/build/checklists); external services in
[External services](/integrations/external-services).

## General

### Identity

| Field | Notes |
| --- | --- |
| **Name** | Read-only after creation. |
| **Display name** | Required. What people read. |
| **Description** | Write it in business terms — AI tooling reads it. |
| **Workflow type** | `WORKFLOW`, `TRANSACTIONAL`, `COMMISSIONING` or `CYCLE_COUNT`. Other legacy values still display but cannot be newly selected. |
| **Record number pattern** | The shape of generated numbers, e.g. `EXP-{SEQ}`. |

**Enrich with AI** rewrites the description from the module's name, kind and
type — useful when you want the AI assistant to understand what the module is
for and cannot be bothered to write it yourself.

### Configurations

| Switch | Effect |
| --- | --- |
| **Disable draft** | Records submit immediately instead of saving as drafts. |
| **Stay on new form after first submit** | Keeps you on a blank form — for entering many records in a row. |
| **Refresh** | Refreshes the record after actions. |
| **External comments** | Allows comments from outside the tenant. |
| **Reopen** | Completed records can return to an earlier step. |
| **Revision** | Records can be versioned. |
| **Copy documents on revision** | Appears once revision is on. |
| **Print record** | Adds a print action. |

**Reopen** and **Revision** are the two that matter beyond this screen:
[module setup](/admin/settings) can only assign their owners once they are
switched on here.

## Log page views

A log page view defines which columns the [record list](/work/record-list) can
offer, in what order, with which default filters and sort. Users then save
their own [views](/work/views) from that set — so this tab decides the menu,
not the meal.

Each view has a name, an optional default flag, an ordered column selection,
a filter, and a multi-field sort with a primary key first.

## Saving

Each tab tracks its own unsaved changes and registers its own save, so the
shell's **Save** button applies the tab you are on. Moving away from a tab with
unsaved work warns you first.

## Permissions

The module designer lives under **Settings**, and the whole Settings area is
gated by your **application role**: only a <Perm role="PME" /> user can open it.

That is a single gate, not a set of them — a user who can open Settings can open
every tab of the designer and every other Settings page. It is separate from the
group grants that decide what a person can do with *records*, which are covered
in [Permissions](/concepts/permissions).
