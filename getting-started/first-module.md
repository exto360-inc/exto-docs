---
description: "Create a module, design a form, and save your first record."
---

# Your first module

A module is a type of thing you track — *Expenses*, *Vendors*, *Inspections*.
It owns the fields its records hold, the forms that capture them, and the
workflow they move through. This page builds one and saves a record into it.

<Shot src="getting-started/new-module" alt="The new module panel" pending
  caption="Naming a module — the name becomes its route, so it cannot change later." />

## 1. Create the module

1. Open **Settings → Module designer**.
2. Choose **New module**.
3. Give it a **name** and a **display name**.
4. Pick a **kind** — leave it as a standard module for now.

The **name** is the machine identifier: it becomes the module's route
(`/mod/expenses`) and the key every form, rule and report refers to. It is
fixed once created. The **display name** is what people read, and you can
change it whenever you like.

::: warning The name is permanent
Renaming a module means recreating it. Spend the extra ten seconds now.
:::

## 2. Fill in General

The **General** tab holds the module's identity and the switches that decide
what its records can do.

| Setting | What it controls |
| --- | --- |
| **Description** | Plain-English summary. AI tooling reads it, so write it for a person. |
| **Workflow type** | `WORKFLOW`, `TRANSACTIONAL`, `COMMISSIONING` or `CYCLE_COUNT`. |
| **Record number pattern** | The shape of generated record numbers, e.g. `EXP-{SEQ}`. |
| **Disable draft** | Records submit straight away rather than saving as drafts. |
| **Reopen** | Completed records can be returned to an earlier step. |
| **Revision** | Records can be versioned, optionally copying their documents. |
| **Print record** | Adds a print action to the record. |

**Reopen** and **Revision** are worth deciding now — module setup can only
assign owners for them once they are switched on here.

## 3. Design the form

Open the **Forms** tab and create a form. The designer has a field palette on
the left, the canvas in the middle, and the selected field's properties on the
right. Drag fields onto the canvas; drag **Section** and **Two columns**
containers to group them.

<Clip src="getting-started/build-a-form" pending
  caption="Dragging four fields into two columns and saving · 20s" />

Start with three or four fields. A field needs a **label** and a **name**;
the name is generated from the label and must be at least five characters.

See [Forms](/build/forms) for the full palette and
[Rules](/build/rules) for conditional behaviour.

## 4. Save a record

Open the module at `/mod/<your-module>` and choose **Add new**. Fill the form
and **Save**.

::: tip Save is not Submit
**Save** keeps the record where it is — a draft. **Submit** moves it to the
next workflow step. A record a colleague "can't see" is usually still a draft.
:::

## Next

Your module has records but nowhere for them to go. [Your first
workflow](/getting-started/first-workflow) draws the steps they travel.

## Permissions

Everything on this page happens under **Settings**, which is opened only by
users whose application role is <Perm role="PME" />. If you cannot see
Settings, that is why.

Creating *records* in the module afterwards is a different system entirely —
group grants, covered in [Permissions](/concepts/permissions).
