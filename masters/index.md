---
description: "Shared reference data — what masters are, the two kinds, and who maintains them."
---

# Masters

A **master** is a shared list that other records point at — vendors, equipment
types, cost codes, locations, disciplines. One list, maintained once, referenced
from everywhere.

Masters are modules, but of a kind that has **no workflow**. A row is either
there or it is not; nothing approves it.

## Why they exist

Without masters, every form that needs a vendor name has its own list, and they
drift apart within a month. With one, renaming a vendor fixes every form at
once — and a report can group by vendor because every record spells it the same
way.

## The two kinds

| Kind | Shape | Screen |
| --- | --- | --- |
| **Master data** | A flat list | An editable grid |
| **Hierarchical master data** | A tree | An expandable tree |

Choose **hierarchical** when the list has real parents and children — a location
inside a site inside a region, a discipline inside a trade. Choose **flat**
otherwise. It is fixed at creation.

::: tip The grid is the interface
Masters have no record detail screen. You add, edit and correct rows **inline in
the grid**, and that is the whole experience. See
[Master data](/work/masters).
:::

## The pages here

| Page | Covers |
| --- | --- |
| [Referencing a master](/masters/referencing) | How a form field points at one. |
| [Master data](/work/masters) | Working a flat master. |
| [Hierarchical masters](/work/hierarchical-masters) | Working a tree. |
| [Masters](/concepts/masters) | The concept, and which kind to build. |

## Who maintains them

| Task | Who |
| --- | --- |
| Creating the master module | <Perm role="PME" /> in the [designer](/build/module-designer) |
| Deploying it | <Perm role="PME" /> in [module setup](/setup/) |
| Adding and editing rows | Anyone with `master_data` **create** / **edit** |

That last row is the point: masters are **business data**, maintained by the
business, not by whoever builds modules. Granting edit on a master is how a
team keeps its own list current without raising a ticket.

## Where masters are deployed

Like any module, a master is deployed at tenant, workspace or project level.

| Level | Use for |
| --- | --- |
| **Tenant** | Lists every project shares — disciplines, units, currencies. |
| **Workspace** | Lists one business area shares. |
| **Project** | Lists specific to one job — its own equipment register. |

::: warning A project-level master cannot be referenced from a tenant-level form
The reference has to resolve for every record the form creates. Deploy the
master at least as wide as the modules that point at it.
:::

## Related

- [Referencing a master](/masters/referencing)
- [Importing master data](/recipes/data/import-master-data)
