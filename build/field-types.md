---
description: "Every field type in the palette, with the settings it carries."
---

# Field types

Every field in the [form designer](/build/forms) palette, with the settings it
carries. The Forms page covers how to build a form; this is what to reach for.

## Settings most fields share

| Setting | Effect |
| --- | --- |
| **Label** | What people read. |
| **Name** | What the platform stores. Generated from the label; at least five characters. |
| **Help text** | Guidance under the field. |
| **Mandatory** | Must be filled. Not offered on Formula. |
| **Read only** | Displayed, never edited. |
| **Hide label** | Renders the input without its label. |
| **Enable history** | Shows the field's history icon. See [History](/work/history). |
| **Unique** | No two records may share the value. Only on types that support it. |
| **Run after change** | Calls an [external service](/integrations/external-services) when the value changes. |

## Basic

| Type | Holds | Its own settings |
| --- | --- | --- |
| **Text** | Single or multi-line text. | **Input type** — single line or multi line. |
| **Number** | A numeric value. | **Minimum** and **maximum**. |
| **Currency** | A money amount. | **Select country**. |
| **Date** | A date. | — |
| **Date & time** | Both. | — |
| **Checkbox** | One or more choices. | **Binary (single checkbox)**, **Yes / No**, or a **data set**. |
| **Hyperlink** | A clickable link. | — |
| **Sensitive** | An encrypted value, for personal data. | — |
| **Paragraph** | A static block of text. Not an input. | **Content**, **size**, **height**. |

## Selection

| Type | Holds | Its own settings |
| --- | --- | --- |
| **Select** | One value. | **Data source** — a [data set](/build/tables-and-datasets) or a reference table, with **label field** and **value field**. |
| **Radio** | One option, all visible. | **Direction** — vertical or horizontal. |
| **Select from table** | One record from a table. | The table, and its display fields. |
| **Multi-select table** | Several records. | The same. |
| **Auto-complete** | Search and pick. The usual way to reach a [master](/concepts/masters). | **Multi-select**, **enable search**. |
| **User picker** | One or more users. | **Data source**, **group name**, **allow multiple users**. |

## Special

| Type | Holds | Its own settings |
| --- | --- | --- |
| **Formula** | A computed value. | The **formula** expression. Never mandatory. |
| **Auto populate** | A value copied from elsewhere. | A **reference table** or **external service** as the source. |
| **Signature** | A drawn electronic signature. | — |
| **Table** | A sub-table of rows inside the record. | Its **columns**. |
| **Checklist** | A [checklist](/build/checklists) rendered in place. | The checklist to point at. |

## Layout

**Section**, **Two columns** and **Three columns** hold other fields and store
nothing themselves. A section carries a **title**, a **short description** and a
**hidden** toggle.

## Mobile

Some types offer a **QR scanner** toggle, which lets the mobile app fill the
field by scanning rather than typing.

## Choosing between similar types

| If you want | Use |
| --- | --- |
| A short fixed list that changes when the design does | **Select** with a data set |
| Real entities that users maintain | **Auto-complete** against a [master](/concepts/masters) |
| One record from another module | **Select from table** |
| A value another system owns | **Auto populate** |
| A number derived from other fields | **Formula** |
| Rows of repeating data | **Table** |
| A structured, versioned questionnaire | **Checklist** |

::: tip Formula and Auto populate cannot be typed into
Both are computed, so they cannot be mandatory in a way a person could satisfy,
and they are excluded from [grid fill](/work/grid-editing) — a filled value
would be overwritten on the next save.
:::

## System columns

Columns the platform writes — `createdBy`, `updatedAt`, `recordNumber`,
`status` — are placed **read-only** when added to a form. A required toggle or
default value on one would describe an input nobody can ever type into.

## Related

- [Forms](/build/forms) — building the form.
- [Rules & validations](/build/rules) — conditional behaviour.
- [Tables & data sets](/build/tables-and-datasets) — where option lists come
  from.
