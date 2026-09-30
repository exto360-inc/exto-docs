---
description: "What you can download, what works without a connection, and how syncing works."
pageClass: mobile-manual
---

# Working offline

You can keep working without an internet connection if you download what you
need first. Changes made offline are stored on your phone and sync automatically
when you are back online. Download before you go to a site with poor or no
signal.

## What you can download

| What | Where | See |
|----|----|----|
| A module (its form and your records) | Cloud icon in the module's records list header | Section [Download a module for offline use](/mobile/modules-and-records#download-a-module-for-offline-use) |
| A task | Cloud icon on the task card | Section [Download a task for offline use](/mobile/tasks#download-a-task-for-offline-use) |
| A commissioning stage | Cloud icon on the stage card | Section [Download a stage for offline use](/mobile/commissioning#download-a-stage-for-offline-use) |

When you download a task or a stage whose module is not yet offline, the module
is downloaded with it.

The download sheet may list limits that apply offline, for example:

- formula fields show their last synced value;
- sensitive fields are hidden;
- auto-complete suggestions are available online only;
- conditional rules are paused, so review the full form online before the final
  submit.

Some modules cannot be downloaded at all; the sheet then explains why.

A downloaded item shows a filled cloud with a tick. **Profile** › **Offline
storage** lists everything downloaded ([Offline
storage](/mobile/profile-and-settings#offline-storage)).

## What works offline

- Downloaded modules, tasks and commissioning stages.
- Creating new records in a downloaded module (if you are allowed to create
  records) and updating downloaded records.

Exto AI, AI Insight, dashboards, custom pages, Drive, master modules,
Checklists, asset information, changing tenant, changing language and sending
feedback need an internet connection. Banners such as "Offline — only downloaded
modules are shown." tell you when you are offline.

## Create a record offline

1. In **Menu**, open a downloaded module. If it has no offline records yet, it
    shows **No records yet** — "You can still create one — it'll sync when
    you're back online."

<Shot src="mobile/offline-records" alt="A downloaded module while offline, with no offline records yet. The + button is still available."
  caption="A downloaded module while offline, with no offline records yet. The + button is still available." />

2. Tap **+**, choose the context and fill in the form as usual ([Create a
    record](/mobile/modules-and-records#create-a-record)).
3. Save it. The message "Saved as offline draft" appears.
4. The record appears in the list as **(unsynced record)** with the label
    **Draft (offline)**. It gets its record number when it syncs.

If a module was not downloaded, opening it offline shows "You're offline — This
module isn't available offline. Reconnect to view records."

## Syncing

1. When your phone is back online, the app syncs automatically.
2. A pill at the top of the screen shows progress, for example **Syncing 1 of
    1**.
3. When it finishes, the pill shows **Synced**. Records created offline now
    have their record numbers, and **Pending sync** labels disappear.

<Shot src="mobile/sync-pill" alt="Syncing after reconnecting. The pill at the top shows Syncing 1 of 1."
  caption="Syncing after reconnecting. The pill at the top shows Syncing 1 of 1." />

You can also sync manually from **Profile** › **Offline storage** › **Sync
now**.

Offline data stays on your phone when you log out. Sign in again to sync it.

## Notes

- While syncing, the list can briefly show 0 records before the synced records
  appear. Wait for **Synced** before checking.
- A record saved as an offline draft keeps the status DRAFT after syncing.
