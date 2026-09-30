---
description: "Finding, creating, editing and deleting reference data in master modules."
pageClass: mobile-manual
---

# Master modules

Master modules hold reference data, such as lists of equipment, suppliers or
locations, that other records use. Unlike ordinary modules they have **no
workflow** and no status: you create, edit and delete records directly. Use a
master module when you need to add or correct a reference entry.

Master modules appear in **Menu** with a layers icon, either inside a folder or
at the top level (for example **mastermodule**). Tap one to open its records
list.

<Shot src="mobile/master-list" alt="A master records list. The header shows the record count and + (new record), the filter button and AI Insight. Each card shows the record&#x27;s identifier, age and context."
  caption="A master records list. The header shows the record count and + (new record), the filter button and AI Insight. Each card shows the record&#x27;s identifier, age and context." />

## Find records

- **Search:** type in **Search records**, for example part of the identifier.
  The count in the header updates to the number of matches.
- **Filter by context:**
  1. Tap the filter button in the header.
  2. In **Filter by context**, tick one or more contexts (use **Search…** to
      find one).
  3. Tap **Apply**.
- **AI Insight:** tap ✨ in the header for an AI overview of the module, as for
  ordinary modules (see [Module AI
  Insight](/mobile/modules-and-records#module-ai-insight)).

## Create a master record

1. Tap **+**. The **New Record** form opens.
2. Tap **Select context** and choose where the record belongs. For master data
    this can be the tenant itself or a project; greyed-out items cannot be
    chosen.
3. Fill in the fields, for example a label, an amount in a **Currency** field
    or a link in a **Hyperlink** field.
4. Tap **Create**. The form closes and the list refreshes.

## Edit a master record

1. Tap the record in the list. It opens with its identifier as the title; the
    context is shown at the top and cannot be changed.
2. Change the fields you need.
3. Tap **Save**. The form closes and the list refreshes.

<Shot src="mobile/master-record" alt="An existing master record. Save is at the bottom; the bin icon at the top right deletes the record."
  caption="An existing master record. Save is at the bottom; the bin icon at the top right deletes the record." />

## Delete a master record

1. Open the record.
2. Tap the bin icon at the top right.
3. In **Delete record?** ("This record will be moved to the recycle bin."), tap
    **Delete**, or **Cancel** to keep it.
4. The form closes and the record no longer appears in the list.

<Shot src="mobile/master-delete" alt="The Delete record? confirmation."
  caption="The Delete record? confirmation." />

## Notes

- Records you are not allowed to edit open read-only, without **Save** or the
  bin icon.
- Master modules are not available offline.
- The card title currently shows the record's reference ID.
- Create, Save and Delete close the form without a confirmation message.

### How master modules differ from ordinary modules

|  | Ordinary module | Master module |
|----|----|----|
| Workflow and status | Yes | No |
| Header buttons | +, download, AI Insight | +, filter, AI Insight |
| Filter | Status and context (next to the search box) | Context only (in the header) |
| Offline | Can be downloaded | Not available |
| Form buttons | Save draft and workflow actions | Create / Save |
| Delete | Not from the form | Bin icon (to recycle bin) |
