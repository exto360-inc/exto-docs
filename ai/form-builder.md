---
description: "Reading a document into a form you review before anything is created."
---

# AI form builder

Drop a document — a paper form, a spec, a spreadsheet — and Exto reads it and
proposes a form. You then keep, edit or drop each field **before** anything is
created.

<Shot src="ai/form-builder" alt="The AI draft panel" pending
  caption="Proposed fields as reviewable rows, with two flagged for a decision." />

## This or the module builder?

Both read a document. They differ in what they produce.

| | AI form builder | [Module builder](/build/module-builder) |
| --- | --- | --- |
| Produces | One form, on an existing module | A module, form, checklist and workflow |
| Where | Inside the module designer | Its own wizard |
| Use when | The module exists | You are digitising a form from scratch |

## The flow

1. Open a module in the [module designer](/build/module-designer) and start a
   new form.
2. **Drop a document** into the dropzone.
3. Review the proposed fields.
4. **Create.**

Nothing is written until you press Create. The decisions come first, which is
the opposite of building the form and then deleting what you did not want.

Fields arrive one after another rather than all at once — eighteen fields
landing in sequence is legible where eighteen at once is a wall.

## Reviewing

Each proposed field is a row you can **keep**, **edit** or **drop**. You can
also rename the form before creating it.

### Flags

Rows that cannot be created as they stand say why:

| Flag | Means | Fix |
| --- | --- | --- |
| **no choices found** | A select field with no options. | Pick or type them. |
| **needs a checklist to point at** | A checklist field with no target. | Point it at a [checklist](/build/checklists). |
| **will get its own table and form** | A sub-table was detected. | Nothing — it is telling you what will be created. |
| **a field with this name already exists** | Name collision with the module. | Rename it. |
| **no label** | It would render blank. | Give it a label. |

Answering a flag clears it. A flagged row can also just be dropped.

## Asking again

If the read came back with a **question** — one thing it could not decide — you
can answer it and have the document re-read, rather than correcting eighteen
rows by hand.

You can also add a note and ask again at any point: *"the second table is
signatures, not line items"*.

## After creating

The form is created as an ordinary form and opens in the
[form designer](/build/forms). Everything after this point is normal: reorder
fields, add layout containers, set properties, add [rules](/build/rules).

::: tip It drafts, you design
The builder is good at getting eighteen fields out of a PDF and bad at knowing
which of them your business actually needs. Treat its output as a first draft.
:::

## Enriching a description

The same tooling powers **Enrich with AI** on the module designer's General
tab, which rewrites a module's description from its name, kind and type. Since
that description is what [insights](/ai/insights) and the
[assistant](/ai/assistant) read, it is worth doing.

## Permissions

The form builder is part of the module designer, so it requires
<Perm role="PME" /> — the application role that opens **Settings**.

The organisation-wide AI switch under **Settings → AI personalization** also
applies.

## Related

- [Module builder](/build/module-builder) — the same reading, one step larger.
- [Insights](/ai/insights) — what a good module description improves next.
- [AI overview](/ai/) — every AI surface, and the switches over them.
