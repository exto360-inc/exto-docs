---
description: "The columns records store, and the option lists fields pick from."
---

# Tables & data sets

Three tabs of the [module designer](/build/module-designer) that decide where
data is stored and where option lists come from. They are unglamorous and they
are what everything else stands on.

<Shot src="build/tables" alt="The Tables tab" pending
  caption="A module's table — its columns, with unique and metadata flags." />

## Tables

A module's **table** is the set of columns its records store. Columns appear
here as you add fields in the [form designer](/build/forms), and this tab is
where you set what the form cannot express.

| Setting | What it does |
| --- | --- |
| **Description** | What the table holds. |
| **Unique fields** | No two records may share this value. |
| **Metadata fields** | Marks a column as metadata rather than content. |

Neither flag can apply to a collection-typed column — an array or an object.
Uniqueness on a list of values has no single meaning, so the toggles are
unavailable rather than silently ignored.

### Tables and forms

A form field binds to a column by the column's id. Dropping a new field on the
canvas creates a column; dragging an existing column binds to it and creates
nothing. Renaming a field's label never breaks the binding.

## Reference tables

A **reference table** points at data owned by another module, so a record can
read values it does not store. Each one names its **target** — the module and
the table within it — and a **kind** describing the relationship.

Reference tables are what an **Auto populate** field reads from: the field
copies a value across at fill time rather than duplicating the data in your
module.

Rows show when each was created and last modified, formatted to your profile's
[date and time preferences](/account/profile) rather than the browser's.

## Data sets

A **data set** is a named list of options — a label and a value per entry —
that **Select** and **Radio** fields choose from.

Create one, name it (*Priority levels*, *Rejection reasons*), and add entries.
Entries can be **reordered**, and an entry can be **disabled** rather than
deleted — it shows struck through in the editor, stays valid on records that
already carry it, and stops being offered to new ones.

::: tip Disable, don't delete
Deleting an option leaves the records that used it holding a value the form no
longer recognises. Disabling keeps them readable.
:::

### Data sets versus masters

Both supply values to a field, and they are for different things.

| | Data set | [Master](/concepts/masters) |
| --- | --- | --- |
| Shape | A flat label/value list | Full records with their own fields |
| Scope | One module | Tenant, workspace or project |
| Edited by | A designer, in the designer | Users, in a grid |
| Use for | Fixed vocabularies — statuses, priorities | Real entities — vendors, assets, cost codes |

If the list changes when the business changes, it is a master. If it changes
when the *design* changes, it is a data set.

## Log page views

The fourth of the storage-ish tabs. A log page view defines the columns the
[record list](/work/record-list) can offer, their order, a default filter and a
multi-field sort. Users save their own [views](/work/views) from that set — so
this decides the menu, not the meal.

## Permissions

Editing tables, reference tables and data sets requires <Perm role="PME" />,
the application role that opens **Settings**.

Reading the *data* those definitions describe is governed separately, by the
group grants covered in [Permissions](/concepts/permissions).
