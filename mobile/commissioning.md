---
description: "Tracking assets through levels and stages, and completing stage forms."
pageClass: mobile-manual
---

# Commissioning (CX)

Commissioning tracks physical assets (such as towers, basements, floors or
plant) through **levels** and **stages** of work, for example DIGGING → PLINTH →
GROUND FLOOR COLUMNS. Each stage has its own form, usually a checklist, and
shows how far it has progressed. Use Commissioning to see what state an asset is
in and to complete the stage forms on site.

Open it from **Menu** by tapping a commissioning workbench, for example inside a
"CX Portal" folder.

## Find an asset

1. The **Commissioning** screen ("Asset registry & stage tracking") opens.
2. Tap the context pill at the top and choose a **project**. Only projects you
    have access to can be chosen; the tenant and workspace are greyed out.
3. Browse the assets, or type in **Search assets by name, ID, or type…**. The
    count above the list shows how many assets match, for example "2 of 2
    assets".

Each asset card shows:

- the asset name, for example BASEMENT-101;
- its type, for example PLANT or BLOCK;
- its position in the hierarchy (↳ TOWER-101 › BASEMENT-101);
- at the bottom, its parent asset's ID (or "-" for a top-level asset).

<Shot src="mobile/cx-assets" alt="The asset list for the project &quot;Residential Tower&quot;. Tap a card to open the asset."
  caption="The asset list for the project &quot;Residential Tower&quot;. Tap a card to open the asset." />

## View levels and stages

Tap an asset. The screen shows the asset name and ID, a **Template:** banner,
and the asset's levels.

- Each level shows its initials, name and number of stages. Tap it to expand or
  collapse it.
- A level with a lock icon cannot be opened: it has no stages ("No stages
  found") or, offline, none of its stages were downloaded ("No data").
- Inside a level, each stage card shows:
  - its status: **Not Started**, **In Progress**, **Completed** or **Blocked**;
  - progress as completed items and a percentage, for example "5/5 100%", with a
    progress bar;
  - a planned-time chip, for example "0–0 days";
  - **Open Form** and a download icon.

<Shot src="mobile/cx-stages" alt="Stages of the level DIGGING. Locked levels such as GROUND FLOOR COLUMNS are greyed out."
  caption="Stages of the level DIGGING. Locked levels such as GROUND FLOOR COLUMNS are greyed out." />

## Complete a stage form

1. Tap **Open Form** on a stage.
2. If the stage has not started, a new form opens. If it is in progress, the
    existing record opens (for example DIGGING-24).
3. Work through the checklist. For each item:
    - choose an answer, for example **P**, **F** or **NA** (required items are
      marked \*);
    - tick **Out of Scope** if the item does not apply;
    - add **NOTES**, an **Attachment**, or view the **Audit** history if needed.
4. Tap **Save** to keep your answers, or a workflow action such as **Approve**
    to move the stage on. The save icon on the left saves a draft.

<Shot src="mobile/cx-form" alt="A stage form with a checklist. Each item has Out of Scope, P / F / NA answers, Notes, Attachment and Audit. Save and Approve are at the bottom."
  caption="A stage form with a checklist. Each item has Out of Scope, P / F / NA answers, Notes, Attachment and Audit. Save and Approve are at the bottom." />

## Asset information

Tap the ⓘ icon at the top right of the asset screen to see more about the asset.
Scroll the tabs sideways:

- **Details**: asset ID, name, description, type, stage template, start and end
  dates, parent asset ID and other configured fields such as weight.
- One tab per linked module (for example "CX_Linked Module 1"): records linked
  to this asset, with status, step and age. Tap a record to open it. If there
  are none: "No linked records — No records linked to this asset yet".
- **Documents**: files for the asset. Tap the download icon on a file;
  "Downloading \<name\>… n%" shows the progress.
- **Predecessors**: assets this asset depends on.

<Shot src="mobile/cx-info" alt="The Details tab of asset information."
  caption="The Details tab of asset information." />

Asset information is available only when you are online; the ⓘ icon is hidden
offline.

## Download a stage for offline use

1. Tap the cloud icon on a stage.
2. The sheet **Download "\<stage\>" for offline use** opens. If the stage's
    module is not yet available offline, an orange note says it will be
    downloaded along with the stage.
3. Tap **Download**. A spinner shows on the icon while it downloads.
4. The icon changes to a filled cloud with a tick.

<Shot src="mobile/cx-download" alt="The download sheet for the stage DIGGING, including the note that its module will be downloaded too."
  caption="The download sheet for the stage DIGGING, including the note that its module will be downloaded too." />

## Commissioning while offline

- In **Menu**, only workbenches with at least one downloaded stage are shown.
- The asset list shows "You're offline — showing cached assets." and only the
  assets you downloaded stages for.
- The stage list shows "You're offline — showing downloaded stages only." Stages
  you did not download show only their name, without status or **Open Form**.
- Open and update downloaded stages as usual. Your changes show "Saved as
  offline draft" and the stage shows **Pending sync** until you are back online;
  then **Synced** appears.

<Shot src="mobile/cx-offline" alt="The stage list offline. DIGGING was downloaded and can be opened; FILLING was not."
  caption="The stage list offline. DIGGING was downloaded and can be opened; FILLING was not." />

## Notes

- The "0–0 days" chip shows the stage's planned start and end offset, not time
  spent.
- Every workbench opens with the title "Commissioning", whatever its name in
  Menu.
