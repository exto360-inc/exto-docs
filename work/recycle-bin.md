---
description: "Restoring what was deleted, and retrying background jobs."
---

# Recycle bin & jobs

Two safety nets. The **recycle bin** holds what was deleted until you are sure;
**job status** shows the background work Exto is doing on your behalf and lets
you retry what failed.

<Shot src="work/recycle-bin" alt="The recycle bin" pending
  caption="The bin, filtered to records, with an item flagged for review." />

## Recycle bin

Deleting or discarding something does not remove it. It moves to the bin,
where it stays until its retention window expires.

### Finding an item

The bin is tabbed by **type** — records, projects, documents, sub-tables and
so on. Folders fold into the Documents tab; programs count under Projects.
Beyond the tabs there is search, a filters drawer, and a split view that
previews the selected item beside the list.

### Time machine

The **time machine** bar rewinds the bin to how it looked a chosen number of
days ago. It is the fastest way to find something when you know roughly *when*
it went missing but not what it was called.

### Restoring

Select one item or many and **Restore**. Restored items return to where they
came from. A bulk restore reports how many succeeded and names the first
failure rather than failing silently.

### Flag for review

Flagging an item **extends its retention by seven days** and holds it while a
decision is made. The flag then locks for seven days — you cannot unflag it
during that period, which is the point: it stops an item being flagged and
quietly unflagged before anyone looks at it.

Removing the flag afterwards leaves the extended retention in place.

### Permanent deletion

Items can be permanently deleted from the bin, and items left in the bin are
permanently deleted when their retention expires.

::: warning Permanent means permanent
There is nothing behind the recycle bin. Restore first, decide later.
:::

## Job status

Background work — bulk imports, re-indexing, generation tasks — runs as jobs.
The job status page lists them with their state, and it is the same grid as
everywhere else: filters, grouping, slicing, columns and
[views](/work/views).

A **failed** job offers a retry directly from its row. Depending on the job
type the button reads **Retry** or **Re-index**; both re-queue the same work.

This is where to look when an import "did nothing" — the job almost always
failed with a reason attached, rather than the data being rejected silently.

## Permissions

The recycle bin shows the items you had access to delete, in the scopes you
can reach. Documents deleted from a record's attachments are controlled by
that record's owner. Job status shows the jobs in your context; retrying one
requires the same access as starting it did.
