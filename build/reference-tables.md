---
description: "Reading values another module owns, without duplicating them."
---

# Reference tables

A reference table points at data owned by somewhere else, so a module can read
values it does not store. It is what **Select** and **Auto populate** fields
read from when their source is not a plain [data set](/build/tables-and-datasets).

Reference tables are defined in **Module designer → Reference tables**.

<Shot src="build/reference-tables" alt="The reference tables tab" pending
  caption="A module's reference tables, each with its target and kind." />

## What one holds

| Setting | Notes |
| --- | --- |
| **Name** | How fields refer to it. |
| **Target** | The module and the table within it. |
| **Kind** | The relationship to the target. |

The target is stored by **id**, not by name. Renaming the module or table it
points at therefore does not break the reference — the names shown in the list
are resolved from those ids each time.

Each row shows when it was created and last modified, formatted to your
[profile's date and time preferences](/account/profile) rather than your
browser's locale.

## What reads from one

| Field type | Uses it for |
| --- | --- |
| **Select** | Its option list, with a **label field** and a **value field** chosen from the target. |
| **Auto populate** | The value it copies in. |

For a Select, the two field choices matter: the **label field** is what a person
reads, the **value field** is what the record stores. Choosing a display name as
the value works until somebody renames it.

## Reference tables versus the alternatives

Three ways to get values into a field, and they are not interchangeable:

| | **Data set** | **Reference table** | **Master** |
| --- | --- | --- | --- |
| Is | A fixed label/value list | A pointer at another module's data | Real records users maintain |
| Lives | In this module | In this module, targeting another | Its own module |
| Edited by | Whoever designs the module | Whoever designs the module | Users, in a grid |
| Changes when | The design changes | The target changes | The business changes |

A **data set** is a vocabulary. A **master** is data. A **reference table** is
the wiring that lets one module read another's.

## Auto populate

An **Auto populate** field copies a value in rather than asking for it — the
vendor's payment terms arriving with the vendor, for instance. Its source is
either a reference table or an [external service](/integrations/external-services).

Because the value is copied at fill time, it is a snapshot: changing the source
afterwards does not rewrite records already filled. That is usually what you
want on a transactional record, and it is worth knowing before you rely on it.

::: tip Auto populate cannot be edited or filled
The field is computed, so it is excluded from
[grid fill](/work/grid-editing) — a filled value would be overwritten.
:::

## Permissions

Defining reference tables happens in the module designer, under **Settings**,
and requires <Perm role="PME" />.

Reading the *data* a reference table targets is governed separately, by the
group grants on that module. A reference table does not widen access: a user
who cannot see the target's records does not see its values through the
reference either.

## Related

- [Tables & data sets](/build/tables-and-datasets) — the other two sources.
- [Field types](/build/field-types) — the fields that read from one.
