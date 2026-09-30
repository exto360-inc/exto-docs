---
description: "Building, submitting, approving and versioning checklist templates (PME users)."
pageClass: mobile-manual
---

# Checklists (PME users)

**Checklists** is where PME users build checklist templates, for example an
inspection checklist with sections, questions and pass/fail options. Approved
templates are then used as checklist fields in forms, such as commissioning
stage forms. A template goes through three statuses: **Open** → **Under Review**
→ **Approved**.

Open it from **Menu** › **Checklists** ("Browse checklist templates"). The tile
is shown only to PME users and needs an internet connection.

<Shot src="mobile/checklists" alt="The Checklists list. Each card shows the template ID, name, version and status; + Add New appears on approved templates."
  caption="The Checklists list. Each card shows the template ID, name, version and status; + Add New appears on approved templates." />

## The checklist list

- Each template ID appears once, showing its **latest** version.
- The status chip is colour-coded: **APPROVED** (green), **UNDER REVIEW**
  (amber), **OPEN** (grey).
- **+ Add New** appears only when the latest version is Approved; use it to
  start a new version (10.4).
- Type in **Search checklists...** to find a template.
- Tap a card to open the template.

## Create a template

### Step 1 — Start a new checklist

Tap **+** at the top right. The **New Checklist** screen opens ("Create a new
checklist"). Enter an **ID** ("Enter checklist ID") and a **Name** ("Enter
name"); both are required. The **Version** is fixed at v1.

<Shot src="mobile/cl-new" alt="An empty New Checklist. The Items table says &quot;No items yet. Add a section to get started.&quot;"
  caption="An empty New Checklist. The Items table says &quot;No items yet. Add a section to get started.&quot;" />

### Step 2 — Add items

Use either method:

- **Import from Excel:** in the **Extract Items using AI** box, tap **Excel**
  and choose an Excel file prepared in the Exto checklist format. Its sections
  and items are loaded into the **Items** table and replace any rows already
  there.
- **Add manually:** tap **+ Add Item** to add a section ("New Section"). Then
  tap **+** on a section to add a child item, or **+** on an item to add a
  sibling item below it. Type each description.

The **Capture** and **Browse** buttons (extract items from a photo or file using
AI) are **currently unavailable**.

### Step 3 — Check the Items table

The table has four columns: **ID**, **Description**, **UI Type** and
**Advanced**. Swipe sideways to see them all.

- Section rows are bold; tap the chevron to collapse or expand a section.
- **UI Type** sets how each item is answered, for example RADIO, CHECKBOX, TEXT,
  DATE, NUMBER or MULTI_SELECT. New items default to RADIO.
- In the **Advanced** column, the settings icon opens advanced options, **+**
  adds an item and the bin removes the row.

<Shot src="mobile/cl-table" alt="The right-hand side of the Items table: UI Type set to RADIO on each row, and the Advanced icons."
  caption="The right-hand side of the Items table: UI Type set to RADIO on each row, and the Advanced icons." />

### Step 4 — Set options (optional)

Tap the settings icon on a section or item to open **Advanced options**. Under
**OPTIONS** each answer has a **Label**, a **Value** and a **Color** (8
colours). Use **Add option** to add one, or the bin to remove one. Further down
you can set whether the item is **Mandatory**, and options such as **Out of
Scope**, **Notes**, **Attachments** and **Link modules**.

<Shot src="mobile/cl-advanced" alt="Advanced options for a section, with options such as P (done), F (undone) and NA, each with a colour."
  caption="Advanced options for a section, with options such as P (done), F (undone) and NA, each with a colour." />

Options are shared by the radio and checkbox items in the same section.

### Step 5 — Save

Tap **Save**. The template is saved as **Open** (v1) and you return to the list
with "Saved successfully". If something is missing you see a message such as "ID
and Name are required", "Please add at least one item" or "All items must have a
description".

## Submit and approve

1. Open the template from the list. The title is its name and the line under it
    shows ID, version and status, for example "nchk · v1 · Open". ID and Name
    can no longer be changed.
2. Tap **Submit**. You return to the list, where the status is **UNDER
    REVIEW**.
3. Open it again and tap **Approve**. The status becomes **APPROVED** and **+
    Add New** appears on the card.

The buttons depend on the status:

| Status       | Buttons                 |
|--------------|-------------------------|
| Open         | Save · Submit           |
| Under Review | Save · Submit · Approve |
| Approved     | None (read-only)        |

<Shot src="mobile/checklist-review" alt="A template Under Review, with Save, Submit and Approve at the bottom."
  caption="A template Under Review, with Save, Submit and Approve at the bottom." />

## Create a new version

1. In the list, tap **+ Add New** on an approved template.
2. The **New Version** screen opens with everything editable and the next
    version number (for example v2). Update the items.
3. Tap **Save**. The new version is saved as Open and becomes the one shown in
    the list.
4. Submit and approve it as in 10.3.

## View an earlier version

Open the template and choose a version from the **Version** dropdown. The
dropdown appears only when the template has more than one version.

## Notes

- Save, Submit and Approve all show the same message, "Saved successfully".
- Deleting a row in the Items table happens straight away, without confirmation.
