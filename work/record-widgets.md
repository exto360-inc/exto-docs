---
description: "The ten sidebar widgets — actions, people, comments, files, links, history."
---

# Record widgets

The rail down the right of an open [record](/work/record-detail) holds
everything that is not a field: the actions, the people, the files, the
discussion and the audit trail. One icon per widget, one panel at a time.

<Shot src="work/record-widgets" alt="The record widget rail" pending
  caption="The icon rail with the Actions widget open beside the form." />

## The widgets

| Widget | Holds |
| --- | --- |
| **Actions** | Workflow buttons, the current step, and Save. |
| **Workflow** | Where the record is and who is responsible. |
| **Comments** | Threaded discussion with @mentions. |
| **Attachments** | Files on the record, with versions. |
| **Linked records** | Records you explicitly linked. |
| **System links** | Records the platform linked for you. |
| **People** | The owner and the responsible assignees. |
| **External service** | Results stamped on by an outbound call. |
| **History** | The audit trail. |
| **Insights** | An AI summary of the record. |

Which appear, and in what order, is configurable per module.

## Actions

The workflow buttons for the record's current step, plus **Save**. Save is
always available on an editable record; the actions are whatever the published
workflow draws leaving this step.

Where an action allows it, the panel also offers **Change assignees** — choosing
who the next step goes to. See [Taking actions](/work/taking-actions).

## Workflow

The current step, the users and groups responsible for it, the step history and
completion dates. For the full picture of where a record has been and how long
each visit took, use [Workflow progress](/work/workflow-progress).

## Comments

Rich text with **@mentions** — mentioning someone shows a hover card and
notifies them.

When a comment accompanies a workflow action it is **attributed to that action**,
so the decision and the discussion about it stay together rather than drifting
apart in a long thread.

## Attachments

Files on the record, uploaded from your device or from Google Drive, each with
version history and metadata. These are ordinary Exto documents — the same file
appears in [Drive](/work/documents), and an image appears in Photos.

## Linked records versus system links

Two widgets, and the distinction is worth knowing because it explains why you
sometimes cannot unlink something from where you expect.

| | **Linked records** | **System links** |
| --- | --- | --- |
| Created by | You, deliberately | The platform, as a side effect |
| From | The link picker | Choosing a value in a reference field |
| Which modules | Those configured in module setup | Whatever the field points at |
| To remove | Unlink it | **Clear the field** |

A **system link** appears because you picked a value in an auto-complete,
multi-select or table field. Those links are rebuilt from the field's value
every time the record saves — so removing the link row alone would simply bring
it back. Clearing the source field is what actually removes it, and that is what
the widget's unlink does.

### The link picker

Adding a link gives you a module selector, a search box, and two tabs —
**Available** and **Linked** — so you can see what is already attached without
losing your place. You can also **create** a record in the target module and link
it in one step.

## People

The record's owner and its current responsible assignees, read-only for most
people. A module owner on a later, non-terminal step also gets **Add responsible
person**, for pulling somebody into a record that needs them.

## External service

Results stamped onto the record by an outbound API call — the response fields
mapped back from an [external service](/integrations/external-services).

If a service appears not to have run, this widget is where its result would be,
and the external service log is where its failure will be.

## History

The audit trail: field changes, workflow transitions and comment activity.
Whether it holds anything depends on the module — see [History](/work/history).

## Insights

An AI summary of the record. It can appear here or as an inline banner above the
form, automatically or only on request — your choice, in
[your profile](/account/profile). See [Record insights](/ai/insights).

## Permissions

Widgets show what you can already see. A widget with nothing in it usually means
the record genuinely has none of that thing — not that it is being withheld. The
exception is **Insights**, which is off entirely when AI is disabled for you or
for the organisation.
