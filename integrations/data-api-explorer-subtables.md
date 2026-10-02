---
outline: 2
title: Sub-tables explorer
description: "Interactive reference for reading and writing sub-table rows, with a live Try it."
---

# Sub-tables

Part of the [Data API explorer](/integrations/data-api-explorer). Three
endpoints for a sub-table attached to a module record — write, read, and
delete rows. See [Module records](/integrations/data-api-explorer-module-records)
for the parent record these rows attach to.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## Write sub-table rows

<Method method="post" /> `/api/v1/sub-table/{tableId}`

Appends rows to a sub-table on a module record. The parent record must
already exist — see [Module records](/integrations/data-api-explorer-module-records).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `tableId` | path | string | Required | The sub-table's identifier. |
| `moduleName` | query | string | Required | The parent record's module. |
| `recordId` | query | string | Required | The parent record's ID. |

### Request body

An array of objects, one per row — send a single-item array to write one
row, or many items to write several in one call, up to 1,000 per request.
Each object is a flat set of field-name/value pairs.

```json
[
  {
    "connumber": 1,
    "name1": "qa"
  }
]
```

### Response — 201 Created

```json
{
  "insertedIds": ["6a7edccf..."],
  "insertedCount": 1,
  "updatedCount": 0
}
```

| Field | Holds |
| --- | --- |
| `insertedIds` | Mongo IDs of the rows that were newly created. |
| `insertedCount` | How many rows in the request array were created. |
| `updatedCount` | How many rows in the request array already existed and were updated. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed or missing a required field. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="writeSubTableRows">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Read sub-table rows

<Method method="get" /> `/api/v1/sub-table/{tableId}`

Reads a sub-table's rows, paginated.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `tableId` | path | string | Required | The sub-table's identifier. |
| `moduleName` | query | string | Required | The parent record's module. |
| `recordId` | query | string | Required | The parent record's ID. |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 25 | Rows per page. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" / missing `moduleName`, `tableId`, or `recordId`. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="getSubTableRows">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Delete sub-table rows

<Method method="delete" /> `/api/v1/sub-table/{tableId}`

Deletes sub-table rows.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `tableId` | path | string | Required | The sub-table's identifier. |
| `moduleName` | query | string | Required | The parent record's module. |
| `recordId` | query | string | Required | The parent record's ID. |

### Request body

An array of objects, one per row to delete, each identified by
`recordNumber`.

```json
[
  { "recordNumber": "MOD-1" }
]
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `moduleName`/`recordId`. |
| 400 | Body empty or not an array — "Request body must be a non-empty array of objects with \"recordNumber\"". |
| 400 | An item is missing `recordNumber`. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="deleteSubTableRows">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
