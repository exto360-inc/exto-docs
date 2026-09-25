---
description: "Registering a report template so people can run it."
---

# Report setup

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

**Settings → Report setup** registers the report templates people can run from
the [Reports](/work/reports) page.

## What a registration holds

| Field | Notes |
| --- | --- |
| **Report ID** | Required. The identifier the platform uses. |
| **Report name** | Required. What people read on the Reports page. |
| **Applicable level** | Required — `PROJECT` and the other context levels. |
| **Type** | `REPORT` for a template-driven report, `DBDIRECT` for one that queries directly. |
| **Template** | A `.jrxml` file. Only that extension is accepted. |
| **Hidden** | Keeps it out of the Reports module while leaving it registered. |

## The two types

| Type | Produces its data from |
| --- | --- |
| **REPORT** | The uploaded `.jrxml` template. |
| **DBDIRECT** | A direct query, without a template. |

## Steps

1. Open **Settings → Report setup**.
2. Choose **Add report**.
3. Enter the **report ID**, **name** and **applicable level**.
4. Choose the **type**, and upload a `.jrxml` template where one applies.
5. Save.

The report then appears on the [Reports](/work/reports) page for people whose
groups grant them the `Reports` config module at that level.

## Hiding rather than deleting

**Hidden** takes a report out of the Reports module without unregistering it —
useful while a template is being corrected, or for a report that only runs on a
schedule. It keeps the ID alive, so anything referring to it does not break.

## Related

- [Reports](/work/reports) — running one.
- [Dashboards](/analytics/dashboards) — the live equivalent.
