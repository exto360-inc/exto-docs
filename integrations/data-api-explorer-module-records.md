---
outline: 2
title: Module records explorer
description: "Interactive reference for the module record endpoints — get, upsert, and expand with sub-table data, with a live Try it."
---

# Module records

Part of the [Data API explorer](/integrations/data-api-explorer). Covers the
plain `GET`/`POST` endpoints and the `/expand` endpoint, which returns a
module record together with its sub-table data in one call.

## Get all module records

<Method method="get" /> `/api/v1/module-record/{moduleName}`

Retrieves records from a module, same shape and pagination as
[master records](/integrations/data-api-explorer-masters).

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | path | string | Required | The module's identifier, e.g. `SAT_TDSP`. Upper-cased before lookup. |
| `pageSize` | query | integer | Optional — default 25 | Records per page — 1 to 1,000. |
| `page` | query | integer | Optional — default 1 | Page number. |
| `sort` | query | string | Optional | Field to sort by, e.g. `createdAt`. |
| `status` | query | string | Optional | Filter to records in this workflow status, e.g. `Approved`. |
| `filter` | query | string | Optional | Conditional filter expression — see [Filtering records](/integrations/data-api-filtering). |
| `localTimeZone` | query | string | Optional | IANA timezone — required when `filter` compares a `DATE` field. |
| `X-Project-Id` | header | string | Optional | Scope the request to one project. |

### Response — 200 OK

```json
{
  "rows": [
    {
      "_id": "67bfcbd6117e4e25e1d31dd3",
      "customFields": { "...": "the record's field values" },
      "parentID": null,
      "slug": "iWlOE8K",
      "refId": "iWlOE8K",
      "tenantID": "cwWdTZK",
      "createdBy": "nivedita@exto360.com",
      "createdAt": "2025-02-27T02:20:06.958Z",
      "isDeleted": false,
      "projectID": "Vx6-j2Z",
      "id": "67bfcbd6117e4e25e1d31dd3"
    }
  ],
  "total": 1069,
  "page": 1,
  "pageSize": 10,
  "totalPages": 107
}
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" / "Missing module name." |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="getAllModuleRecords">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Create or update a module record

<Method method="post" /> `/api/v1/module-record/{moduleName}`

Upserts: there's no separate create and update endpoint, one call handles
both. A dedicated [`PATCH`](#update-a-module-record) and
[`DELETE`](#delete-a-module-record) are also available below.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | path | string | Required | The module's identifier, e.g. `SAT_TDSP`. |
| `userName` | query | string | Required | The acting user. |

### Request body

An array of objects, one per record — send a single-item array to upsert one
record, or many items to upsert several in one call, up to 1,000 per request.
Each object is a flat set of field-name/value pairs.

```json
[
  {
    "connumber": 1,
    "name1": "qa",
    "number2": 2,
    "select_from_list": "A"
  }
]
```

### Response — 201 Created

```json
{
  "insertedIds": ["67bfcbd6117e4e25e1d31dd3"],
  "insertedCount": 1,
  "updatedCount": 0
}
```

| Field | Holds |
| --- | --- |
| `insertedIds` | Mongo IDs of the records that were newly created. |
| `insertedCount` | How many records in the request array were created. |
| `updatedCount` | How many records in the request array already existed and were updated. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `userName`, body not an array / over 1000 items, or "User not found or active". |
| 400 | `MODULE_RECORD_VALIDATION_FAILED` — per-field form validation errors, see [Reference](/integrations/data-api-reference#errors). |
| 401 | Invalid authentication token. |
| 403 | "User not authorized to make this transaction" |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="upsertModuleRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Update a module record

<Method method="patch" /> `/api/v1/module-record/{moduleName}`

An explicit update, separate from the [upsert](#create-or-update-a-module-record)
`POST` above.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | path | string | Required | The module's identifier, e.g. `SAT_TDSP`. |
| `userName` | query | string | Required | The acting user. |

### Request body

A single object, or an array of objects (max 1000) — same flat
field-name/value shape as the upsert `POST` above, limited to the fields
being changed. Any object containing `_id` is rejected.

### Response — 200 OK

Same shape as the upsert `POST` above — `insertedIds`, `insertedCount`, and
`updatedCount`.

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `userName`, body not an array / over 1000 items, or "User not found or active". |
| 400 | "Updating '_id' is not allowed" |
| 401 | Invalid authentication token. |
| 403 | "User not authorized to make this transaction" |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="updateModuleRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Delete a module record

<Method method="delete" /> `/api/v1/module-record/{moduleName}`

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | path | string | Required | The module's identifier, e.g. `SAT_TDSP`. |
| `userName` | query | string | Required | The acting user. |

### Request body

An array of objects, one per record to delete, each identified by
`recordNumber`.

```json
[
  { "recordNumber": "MOD-1" }
]
```

Unlike [master records' delete](/integrations/data-api-explorer-masters#delete-a-master-record),
this endpoint runs no extra per-record permission check beyond tenant
membership.

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `moduleName`/`userName`, body not an array / over 1000 items, or the request body is malformed. |
| 400 | "User not found or active" |
| 401 | Invalid authentication token. |
| 403 | "User not authorized to make this transaction" |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="deleteModuleRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Expanding with sub-table data

<Method method="get" /> `/api/v1/module-record/{moduleName}/expand`

Returns module records together with their sub-table data in one call —
replacing the record-then-one-call-per-sub-table pattern integrations used to
do by hand — without giving up pagination on either side. The record list
still pages, and every sub-table pages independently of the others and of the
parent record.

::: tip Multi-line text fields are normalized to plain strings
Across create, update, list, and expand alike: a multi-line text field is
always returned as a plain string, never the raw `{ content, value }` object
some older records previously stored it as.
:::

### What it gives you

- **Polymorphic retrieval** — one record, a batch of up to 100 (`recordIds`),
  or the whole module list, through the same route and the same response
  shape. There's no separate "get one" endpoint.
- **Sparse fieldsets, two levels** — `fields` trims the record itself,
  `subTableFields` trims every sub-table row. Each accepts either an
  inclusion list or a `-field` exclusion list.
- **Per-relationship pagination** — a record can carry any number of
  sub-tables, and each one pages independently: page "Signatures" to its
  third page while "Test Instruments" stays on its first, for the same
  record.
- **Cursor-style continuation** — every page, on either axis, carries its own
  `nextPage` continuation object (or `null`). No offset arithmetic on the
  caller's end.

### Scale

Sub-table rows are sliced inside the database per parent record, via a
grouped aggregation, rather than fetched whole and trimmed afterward — and
both pagination axes carry a real ceiling.

| | Default | Max |
| --- | --- | --- |
| Module page | 50 | 100 |
| Sub-table page (per sub-table, per record) | 50 | 100 |

Worst case — 2,000 records × 10 sub-tables × 500 rows each — is bounded at
roughly 41–125 MB in one response, regardless of module size.

### Request parameters

| Param | Type | Default | Max | Purpose |
| --- | --- | --- | --- | --- |
| `recordIds` | csv of Mongo IDs | — | 100 | Narrow to one record or a specific batch. |
| `page` / `pageSize` | integer | 1 / 50 | — / 100 | Module record list pagination. |
| `fields` | csv, `-field` to exclude | all | — | Sparse fieldset for the module record itself. |
| `subTableFields` | csv, `-field` to exclude | all | — | Sparse fieldset applied to every sub-table row. |
| `subTablePageSize` | integer | 50 | 100 | Default page size for any sub-table without its own override. |
| `subTablePaging` | JSON, keyed by `tableID` | — | — | Per-sub-table `{page, pageSize}` override. |
| `query` | JSON | — | — | Mongo-style filter merged into the record match. |

### Request shapes

List a module, defaults applied:

```
GET /api/v1/module-record/SAT_TDSP/expand
```

One record, trimmed to two fields:

```
GET /api/v1/module-record/SAT_TDSP/expand?recordIds=6a7edccfddad60e2b35b545e&fields=recordNumber,status
```

Filtered list, module-level pagination:

```
GET /api/v1/module-record/SAT_TDSP/expand?query={"projectID":"WBls47_"}&page=1&pageSize=25
```

One record — exclude a heavy field, page one sub-table independently:

```
GET /api/v1/module-record/SAT_TDSP/expand?recordIds=6a7edccfddad60e2b35b545e&subTableFields=-signatures&subTablePaging={"Signatures":{"page":2,"pageSize":30}}
```

### Response shape

The envelope is the same regardless of which request shape produced it — a
single record via `recordIds` is a one-item `records` array, not a different
response type.

```json
{
  "moduleName": "SAT_TDSP",
  "page": 1, "pageSize": 50, "total": 6, "totalPages": 1,
  "nextPage": null,
  "subTables": [
    { "tableID": "Signatures", "name": "Signatures" }
  ],
  "records": [
    {
      "_id": "6a7edccf...",
      "recordNumber": "TDSP-7",
      "subTableData": {
        "Signatures": {
          "rows": ["..."],
          "page": 1, "pageSize": 50, "total": 2, "totalPages": 1,
          "nextPage": null
        }
      }
    }
  ]
}
```

`subTables` is a `tableID` → `name` legend, once per response. Each record's
`subTableData` carries one block per sub-table, independently paginated.

### Draining with `nextPage`

Every page — the module record list, and each sub-table, independently —
hands back its own `nextPage`: a ready-to-send continuation object, not a
page number to increment. The caller asks one question — is `nextPage`
non-null? — and forwards exactly what it was given until the answer is
`null`. No client-side pagination math exists anywhere in this contract.

Drain the module record list:

```
page = { page: 1, pageSize: 50 }
loop:
  res = GET /module-record/<MODULE_NAME>/expand ?page ?pageSize
  handle(res.records)
  if res.nextPage is null: stop
  page = res.nextPage
```

Drain one sub-table on one record, independently of everything else:

```
cursor = { page: 1, pageSize: 50 }
loop:
  res = GET /module-record/<MODULE_NAME>/expand ?recordIds=<RECORD_ID>
        &subTablePaging={ <REF_ID>: cursor }
  table = res.records[0].subTableData[<REF_ID>]
  handle(table.rows)
  if table.nextPage is null: stop
  cursor = table.nextPage
```

Same mechanic drives both axes: a batch job, a sync worker, or a retry-safe
cron can walk this endpoint to completion with the same four-line loop.

### Scope headers, for `/expand` specifically

Unlike the plain `GET`/`POST` above, `/expand` resolves its scope from a
distinct set of headers:

| Header | Sets |
| --- | --- |
| `x-ctx-type` / `x-ctx-id` | The scope a record must belong to — `Project`, `Workspace`, or `Company`. Omitted entirely defaults to `Company` scope. |
| `x-project-id` | The project's short reference ID, alongside its Mongo `x-ctx-id`. |

::: tip Tenant isolation is physical, not filtered
Each tenant's module records live in their own collection, keyed by tenant ID
at read time — not filtered out of a shared collection.
:::

::: tip Record-level ownership, independent of scope
Within scope, a record is only returned if it has an active workflow, the
caller created it, or the caller is a listed responsible user — this check
applies on top of, and independent of, the header-level scope above.
:::

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Missing module name." / "Page must be greater than 0" |
| 400 | "Page size must be between 1 and 100" / "subTablePageSize must be between 1 and 100" |
| 400 | `subTablePaging` isn't valid JSON, or an entry's `page`/`pageSize` is out of range — message names the table id. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="expandModuleRecords">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>
