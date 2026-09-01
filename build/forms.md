---
description: "The canvas, the palette, and how a field binds to a column."
---

# Forms

A form is what a person fills in. A module can have several, and a workflow
step points at one — which is how the same record shows three fields while it
is being raised and twelve while it is being reviewed.

<Shot src="build/form-designer" alt="The form designer" pending
  caption="Palette on the left, canvas in the middle, the selected field's properties on the right." />

## List page

The **Forms** tab lists the module's forms. Each row shows its name and label.
Create a new one, duplicate an existing one, or open one to design it.

## The designer

Three columns: the **palette** of field types, the **canvas** you drop them
onto, and the **properties** of whatever is selected.

Drag a field from the palette onto the canvas. Drag a layout container first if
you want columns. Reorder by dragging; nest by dropping inside a container.

<Clip src="build/design-a-form" pending
  caption="Building a two-column section, then a sub-table · 30s" />

## The field palette

### Basic

| Type | Holds |
| --- | --- |
| **Text** | Single or multi-line text. |
| **Number** | A numeric value. |
| **Currency** | A money amount. |
| **Date** | A date. |
| **Date & time** | Both. |
| **Checkbox** | One or more choices. |
| **Hyperlink** | A clickable link. |
| **Sensitive** | An encrypted value, for PII. |
| **Paragraph** | A static block of text. Not an input. |

### Selection

| Type | Holds |
| --- | --- |
| **Select** | One value from a [data set](/build/tables-and-datasets). |
| **Radio** | One option, all visible. |
| **Select from table** | One record from a table. |
| **Multi-select table** | Several records. |
| **Auto-complete** | Search and pick — the usual way to reach a [master](/concepts/masters). |
| **User picker** | One or more users. |

### Special

| Type | Holds |
| --- | --- |
| **Formula** | A computed value. |
| **Auto populate** | A value copied from a reference table or external service. |
| **Signature** | A drawn electronic signature. |
| **Table** | A sub-table — a grid of rows inside the record. |
| **Checklist** | A [checklist](/build/checklists) rendered in place. |

### Layout

**Section**, **Two columns** and **Three columns** are containers. They hold
other fields and store nothing themselves.

## Fields and columns

A field on a form binds to a **column** on the module's table. Dropping a
palette field creates the column; dragging an existing column onto the canvas
binds to it instead, creating nothing new.

The binding is the column's id, which is what the platform matches on — so
renaming a label never breaks it.

### Names

A field needs a **label** (what people read) and a **name** (what the platform
stores). The name is generated from the label, lower-cased and underscored, and
must be at least five characters — short labels like *Date* get padded rather
than rejected.

### System columns

Columns the platform writes — `createdBy`, `updatedAt`, `recordNumber`,
`status` — are placed **read-only** when you add them to a form. A required
toggle or a default value on one would describe an input nobody can ever type
into.

## Field properties

Beyond label and name, most fields offer:

- **Required** and **read-only**.
- A **default value**.
- **Placeholder** and **help text**.
- Type-specific settings — options for a select, columns for a sub-table,
  a source for an auto-populate field, an expression for a formula.

Conditional behaviour — showing a field only sometimes, requiring it only
sometimes — is not a field property. It is a [rule](/build/rules).

### Enable history

Fields, sub-tables and columns each carry an **Enable history** toggle. It
controls whether that field's **history icon** appears on the record — not
whether anything is captured.

Capture is decided once, for the whole module, by the module's own **Enable
History** setting. When that is on, everything is recorded regardless of these
toggles; each toggle then decides whether its field surfaces what was recorded.
Switching one on later reveals history that was captured all along.

See [History](/work/history).

## Sub-tables

A **Table** field is a grid inside the record: you define its columns, and
users add rows. Sub-table aggregates (a total, a count) can be referenced from
a formula or from a rule's formula condition.

## Permissions

Designing forms requires <Perm role="PME" />, the application role that opens
**Settings**.

Which fields a given person can edit *at runtime* is a different question
entirely, answered by the step's form, by [rules](/build/rules), and by whether
the record is on their step.
