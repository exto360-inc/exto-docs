---
description: "Finding, creating and moving records through their workflow on your phone."
pageClass: mobile-manual
---

# Modules and records

A module holds one kind of record, such as site issues, risks or inspections.
Each record belongs to a context (usually a project) and moves through a
workflow configured on the web, for example Step 1 → Step 2 → Approved. Use
modules to raise new records, find existing ones and move them through their
workflow.

Open a module from **Menu** by expanding its folder and tapping the module, for
example **Issues/Risk Modules** › **Issues At Site**.

## The records list

The records list shows all records in the module that you can see. The header
shows the module name and the number of records, for example "2 records in this
module".

<Shot src="mobile/records-list" alt="The records list for &quot;Issues At Site&quot;. Each card shows the record number, status (for example UNDER REVIEW or APPROVED), current step, age and context."
  caption="The records list for &quot;Issues At Site&quot;. Each card shows the record number, status (for example UNDER REVIEW or APPROVED), current step, age and context." />

| Control | What it does |
|----|----|
| **+** | Creates a new record. Shown only if you are allowed to create records in this module. |
| Cloud icon | Downloads the module for offline use (see [Download a module for offline use](/mobile/modules-and-records#download-a-module-for-offline-use)). After downloading it shows a cloud with a tick. |
| ✨ (AI Insight) | Opens an AI summary of the module (see [Module AI Insight](/mobile/modules-and-records#module-ai-insight)). Online only. |
| **Search records** | Finds records by text, for example part of a record number. |
| Filter icon | Filters by **Status** and/or **Context**. |

### Filter the list

1. Tap the filter icon next to the search box.
2. On the **Status** tab, tick one or more statuses (for example Approved,
    Under Review). On the **Context** tab, tick one or more contexts.
3. Tap **Apply**. To remove the filter, open it again and tap **Clear**.

<Shot src="mobile/rec-filter" alt="The Filter sheet on the Status tab."
  caption="The Filter sheet on the Status tab." />

Tap a card to open the record.

## Create a record

1. In the records list, tap **+**. The **New Record** form opens: "Fill in the
    form below and take a workflow action."
2. Tap **Select context** at the top of the form. A list of contexts opens
    (tenant › workspace › project). Items you cannot choose are greyed out; you
    can search with **Search context**. Tap the context the record belongs to,
    for example a project. The pill now shows its name.
3. Fill in the fields. The fields depend on how the module is set up (see
    [Field types](/mobile/modules-and-records#field-types)). Fields marked \*
    are required.
4. Choose what to do:
    - Tap the workflow action at the bottom, for example **Submit**, to send the
      record into its workflow.
    - Or tap the save icon (💾) on the left to save it as a draft and finish
      later.

<Shot src="mobile/new-record" alt="A new record. The context pill at the top reads &quot;Select context&quot; until you choose one. The save icon and Submit are at the bottom."
  caption="A new record. The context pill at the top reads &quot;Select context&quot; until you choose one. The save icon and Submit are at the bottom." />

## Open and act on an existing record

1. Tap the record in the list (or in **Tasks**).
2. The form opens with its data: "Review and update the record details." The
    record number is the title and the context is fixed.
3. Update fields if your step allows it.
4. Choose a workflow action at the bottom:
    - With one action, tap its button.
    - With several actions, the button shows one action and a ▾ arrow (for
      example **Return ▾**). Tap ▾ to see all actions available at this step
      (for example **Return**, **Reject**, **Approve**) and pick one. **Picking
      an action only changes the button; tap the button to carry it out.**
5. The record moves to its next step or status.

<Shot src="mobile/actions" alt="The list of actions opened from the ▾ arrow. After picking one, tap the main button to run it."
  caption="The list of actions opened from the ▾ arrow. After picking one, tap the main button to run it." />

**Completed records** (for example one that is Approved) open read-only: the
fields are greyed out and there are no action buttons.

<Shot src="mobile/rec-completed" alt="A completed record. The fields are read-only and there is no action bar at the bottom."
  caption="A completed record. The fields are read-only and there is no action bar at the bottom." />

## Record details panel (⋮)

Tap ⋮ at the top right of the form to open the side panel. It has three main
tabs; two more are under ⋯:

| Tab                  | Contents                               |
|----------------------|----------------------------------------|
| **Workflow**         | The workflow template and its version. |
| Attachments (📎)     | Files attached to the record.          |
| Comments (💬)        | Comments on the record.                |
| **Linked** (under ⋯) | Records linked to this one.            |
| **People** (under ⋯) | The people responsible for the record. |

Choosing Linked or People from ⋯ adds it next to the other tabs. Tap ✕ to close
the panel.

<Shot src="mobile/rec-drawer" alt="The side panel on the Workflow tab, with the ⋯ menu open showing Linked and People."
  caption="The side panel on the Workflow tab, with the ⋯ menu open showing Linked and People." />

## Record AI Insight

On an existing record, tap ✨ at the top right to open **\<record\> AI
Insight**. It summarises the record: its details, linked records, next step,
attachments and workflow progress. Type a follow-up question under "Do you have
a follow up question?" to ask more. This needs an internet connection.

<Shot src="mobile/record-ai" alt="AI Insight for a record, with a summary, next step and workflow progress."
  caption="AI Insight for a record, with a summary, next step and workflow progress." />

## Module AI Insight

In the records list, tap ✨ in the header to open **\<module\> AI Insight**. It
gives an overview of the module, for example a status breakdown chart and recent
trends. You can ask follow-up questions, and the history icon shows earlier
insights. This needs an internet connection.

<Shot src="mobile/module-ai" alt="AI Insight for a module, with an overview, a status chart and a trend."
  caption="AI Insight for a module, with an overview, a status chart and a trend." />

## Download a module for offline use

1. In the records list header, tap the cloud icon.
2. A sheet opens: **Download "\<module\>" for offline use** — "Records you
    create offline sync automatically when back online." It may also list limits
    that apply offline (see [What you can
    download](/mobile/working-offline#what-you-can-download)).
3. Tap **Download**. A progress ring shows on the icon.
4. The message "Module downloaded successfully" appears and the icon changes to
    a cloud with a tick.

<Shot src="mobile/rec-download" alt="The module download sheet."
  caption="The module download sheet." />

To work in the module offline, see [Create a record
offline](/mobile/working-offline#create-a-record-offline).

## Field types

Forms are designed on the web, so the fields you see depend on the module. The
app supports these field types:

| Field | How you fill it |
|----|----|
| Text, Paragraph, Number | Type the value. |
| Date; Date & time with timezone | Pick from the date (and time and timezone) picker, for example "Pick date, time & timezone". |
| Checkbox, Radio button, Dropdown | Choose one or more options ("Select an option"). |
| Autocomplete | Start typing and choose a suggestion. |
| Auto-populate | Filled in automatically from other data. |
| Single select from table / Multi-select from table | Choose one or more rows from a list of records. |
| Signature | Sign on the screen. |
| Currency | Enter an amount; the currency (for example INR) is shown in the field. |
| Hyperlink | Tap **Add a link…** to add a web link. |
| Formula | Calculated automatically. |
| Sensitive | Protected values. |
| User picker | Choose a person. |
| Checklist | Answer each item (for example P / F / NA), mark items **Out of Scope**, add **Notes** and an **Attachment**, and view the **Audit** history. |
| Subtable | Add and edit rows of a table inside the record. |
