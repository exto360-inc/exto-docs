---
outline: 2
title: Your first API call
description: "Get a token, make one real call, and see a real response — then pick your resource."
---

# Your first API call

::: warning Try it sends a real request
Every operation on this page and the ones it links to has a **Try it** panel
that sends an actual HTTP request, from your browser, to whichever base URL
you pick — by default one of the two
[production hosts](/integrations/data-api#base-urls). Use it the way you'd
use any other API client, with a token you're comfortable spending a request
with.
:::

## 1. Get a token

Personal Access Tokens are created at **Settings → Integrations → Key
management**: open the **Settings** icon, go to **Integrations → Key
management**, click **Create New**, fill in the fields, and **Generate**.
Copy the key immediately — it's shown once.

::: tip It stays filled in as you move around
Paste it into the **Authorization** field below once. It persists in your
browser across every page in this explorer, so you won't need to paste it
again for the rest of this walkthrough.
:::

::: tip Prefer your own client?
Every operation's **Samples** section includes a **HAR (Postman/Insomnia)**
tab alongside curl, JavaScript, PHP, and Python. Copy it, save it as a
`.har` file, and import it — File → Import — into Postman, Insomnia, or any
other HAR-compatible client, instead of using the Try-it panel here.
:::

See [Generating a key](/integrations/data-api#generating-a-key) for the full
steps, including how to revoke or rotate one.

## 2. Check you can reach Exto

This one needs no token — it only proves your base URL and network path
work, before auth enters the picture at all. A `200` with `{ "ok": true }`
means the database connection is up; a `500` names the connection state
otherwise.

<OAOperation operation-id="checkReadiness" />

## 3. Make your first authenticated call

Now with your token in the **Authorization** field, call `GET
/api/v1/master-record/{masterName}` — a read, so there's nothing to get
wrong.

`masterName` is tenant-specific: it's the internal name of one of *your*
masters, not a fixed value. See [Masters](/concepts/masters) for what a
master is and where to find yours — on this tenant it might be `LOCATION`,
`VENDOR`, or something your team named when it was set up.

<OAOperation operation-id="getAllMasterRecords" />

## 4. Read the response

That's real data from your tenant, not a sample. `rows` holds the records;
`total`, `page`, and `pageSize` describe where you are in the full set — see
[Reference](/integrations/data-api-reference#response-format) for the full
shape, and [Module records](/integrations/data-api-explorer-module-records)
for how pagination works when sub-tables are involved too.

## Now pick your resource

- [Master records](/integrations/data-api-explorer-masters) — reference/lookup
  data, like locations or vendors.
- [Hierarchy master records](/integrations/data-api-explorer-hierarchy-masters) —
  the same, shaped as a tree.
- [Module records](/integrations/data-api-explorer-module-records) — the
  records your team works in day to day, plus their sub-table data.
- [Sub-tables](/integrations/data-api-explorer-subtables) — writing, reading,
  and deleting sub-table rows.
- [Workflow (v1)](/integrations/data-api-explorer-workflow-v1) — taking a
  workflow action on a record.
- [Workflow (v2)](/integrations/data-api-explorer-workflow-v2) — listing
  workflow instances and acting on them by record number.
- [Documents](/integrations/data-api-explorer-documents) — bulk upload and
  download of attachments.
- [User management](/integrations/data-api-explorer-users) — access, groups,
  and activation.
- [User management (v2)](/integrations/data-api-explorer-users-v2) — the two
  places it differs from v1.
- [Workspace](/integrations/data-api-explorer-workspace) — creating, reading,
  and updating workspaces.
- [Job status](/integrations/data-api-explorer-job-status) — tracking
  background jobs your integration kicks off.

There's also a liveness check (`GET /api/v1/health/liveness`, also public)
and a build-info endpoint (`GET /api/v1/build/info`, requires a token) for
your own monitoring, not covered here — see the
[reference](/integrations/data-api-reference#health).

## What's next

- [Reference](/integrations/data-api-reference) — the same endpoints, as
  prose.
- [Filtering records](/integrations/data-api-filtering) — the `filter` query
  parameter used by every `GET` above.
