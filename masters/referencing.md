---
description: "Pointing a form field at a master, and choosing what gets stored."
---

# Referencing a master

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A master is only useful once a form points at it. That is a **field** decision,
made in the [form designer](/build/forms).

## Which field type

| Field type | Use when |
| --- | --- |
| **Auto-complete** | The usual choice. Type to search a long list. |
| **Select** | A short list, shown as a dropdown. |
| **Select from table** | Pick one row, showing several of its columns. |
| **Multi-select table** | Pick several rows. |
| **Auto populate** | Copy a value in rather than asking for it. |

**Auto-complete** is the default answer for real reference data. A dropdown over
four hundred vendors is unusable; a search box is not.

See [Field types](/build/field-types) for everything each one carries.

## What gets stored

A reference field has a **data source**, and where it offers a label field and a
value field, the two do different jobs:

| | Is |
| --- | --- |
| **Label field** | What a person reads. |
| **Value field** | What the record stores. |

::: warning Store the id, not the name
If the value field is a display name, renaming that master row leaves every
existing record holding the old text. Store a stable identifier and let the
label resolve on read — that is how a rename fixes every form at once instead
of only the new ones.
:::

## Data set, master, or reference table?

Three ways to fill a field's options, and they are not interchangeable:

| | **Data set** | **Master** | **Reference table** |
| --- | --- | --- | --- |
| Is | A fixed label/value list | Real records users maintain | A pointer at another module's data |
| Lives | In this module | Its own module | In this module, targeting another |
| Changed by | Whoever designs the module | Users, in a grid | Whoever designs the module |
| Changes when | The design changes | The business changes | The target changes |

**A data set is a vocabulary. A master is data.** If somebody will ask you to
add an option next month, it is a master.

See [Tables & data sets](/build/tables-and-datasets) and
[Reference tables](/build/reference-tables).

## Filtering one field by another

A reference field can be narrowed by another field's value — showing only the
equipment belonging to the selected system, say. That is a
[rule](/build/rules), not a field setting, and the
[form engine](/architecture/form-engine) treats it as a dependency so the
options refresh when the source changes.

## When a lookup shows nothing

Work down these:

1. **Is the master deployed where this form runs?** A project-level master
   cannot serve a tenant-level form.
2. **Can the user see the master's records?** A reference does not widen access —
   someone without view on the master sees no options.
3. **Does the master have rows?** Freshly imported modules often have none.
4. **Is a rule filtering it?** Check whether another field has to be set first.

## Related

- [Field types](/build/field-types)
- [Masters](/masters/) — the object itself.
