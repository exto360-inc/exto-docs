---
description: "What a menu item can point at, and how each behaves."
---

# Item types

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

## The types

| Type | Opens |
| --- | --- |
| **Module** | A module's [record list](/work/record-list). |
| **Master data** | A flat [master](/work/masters) grid. |
| **Hierarchical master data** | A [master tree](/work/hierarchical-masters). |
| **Log page** | A configured log page view of a module. |
| **New form** | Straight into creating a record, skipping the list. |
| **CX workbench** | A [workbench](/cx/matrix) execution view. |
| **Dashboard** | A [dashboard](/analytics/dashboards), in a side panel. |
| **Reports page** | The [Reports](/work/reports) page. |
| **Group** | Nothing — it is a folder for other items. |
| **URL** | An embedded external page. |

## The ones worth knowing about

**New form** lands people directly on a blank record. For a module whose users
only ever create — a defect report, a site observation — it removes a step they
never needed.

**Log page** points at a specific [log page view](/build/log-page-views), so a
module can appear twice in the menu showing different columns: *My inspections*
and *All inspections*, same module, different views.

**Dashboard** opens in a **side panel** rather than a full page, so it can sit
beside what somebody was doing.

## URL items are restricted

::: warning Only approved domains
A URL item must point at `*.exto360.com` or `*.synkrato.com`. Anything else is
refused.

This is deliberate: a menu item renders inside the application, so an arbitrary
external page would be running in Exto's frame.
:::

## Related

- [Building a menu](/menu/building)
- [Activation](/menu/activation)
