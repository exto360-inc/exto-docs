---
description: "One editor, four outcomes: change the form, warn, block, or require files."
---

# Rules & validations

Everything conditional about a form lives here: fields that appear only
sometimes, values that fill themselves in, warnings, and the checks that stop a
submit outright.

<Shot src="build/rules" alt="The rules editor" pending
  caption="One rule — the situation on the left, the outcome chosen on the right." />

## One editor, four outcomes

Rules and validations used to be separate tabs, and both began the same way —
*when this is true…* — so you had to know which tab your idea belonged in
before you could start writing it. They are now one editor: describe the
situation once, then pick what should happen.

| Outcome | What it does | Stored as |
| --- | --- | --- |
| **Change the form** | Show, hide, require, set or clear a field. | A rule |
| **Warn, but continue** | A message the user can override. | A validation |
| **Don't allow submitting** | A message that blocks the submit. | A validation |
| **Require files** | An attachment requirement. | A validation |

The two stores stay separate because they are enforced in different places: a
**rule** runs against an open form, and a **validation** runs when the record
is submitted — including submissions arriving from other systems. Merging the
storage would quietly drop that guarantee.

## Describing the situation

A rule fires on an **event**:

| Event | When |
| --- | --- |
| **On change** | A field's value changes. |
| **On load** | The form opens. |
| **On submit** | The record is submitted. |
| **On save** | The record is saved. |

Then it takes one or more **conditions**, each comparing a field against a
value — or against another field:

`Equals` · `Not equals` · `Greater than` · `Less than` · `≥` · `≤` ·
`Contains` · `Does not contain` · `Starts with` · `Ends with` · `In list` ·
`Not in list` · `Is empty` · `Is not empty`

Validations add `In range` and `Not in range`.

`Is empty` and `Is not empty` take no value; the value box disappears for them.

### Formula conditions

Some questions plain rows cannot ask — anything aggregating a sub-table, for
instance. A rule can carry a **formula condition** instead, written as an
expression.

::: warning A formula replaces the rows
When a formula condition is enabled the plain conditions are **not** evaluated.
The engine treats them as alternatives, not as an `AND`.
:::

## Actions on the form

| Action | Effect |
| --- | --- |
| **Show field** / **Hide field** | Conditional visibility. |
| **Make required** / **Make optional** | Conditional requirement. |
| **Set value** | Write a value into a field. |
| **Clear value** | Empty it. |

Only **Set value** takes a value; the others just name the target field.

## Warnings versus blocks

Both message outcomes are validations. The difference is a single flag:

- **Warn, but continue** — the user sees the message and may override it.
- **Don't allow submitting** — the message is an error and the submit fails.

Write the message for the person reading it: name the field and say what would
make it valid. *"Amount exceeds the approval limit for this cost centre"* beats
*"Validation failed"*.

## Ordering and disabling

Rules run in the order they are listed. A rule can be **disabled** without
deleting it, which is the right way to switch behaviour off temporarily — a
deleted rule takes its conditions with it.

## Permissions

Editing rules requires <Perm role="PME" />, the application role that opens
**Settings**.

Rules are part of the form, so they take effect for everyone as soon as the form
is saved — there is no separate publish step.
