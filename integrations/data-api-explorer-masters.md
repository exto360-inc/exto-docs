---
outline: 2
title: Master records explorer
description: "Interactive reference for the master record endpoints — get and upsert, with a live Try it."
---

# Master records

Part of the [Data API](/integrations/data-api-explorer). A
[master](/concepts/masters) is shared reference data other records point at —
a vendor list, a set of equipment types — so `GET` is mostly what you'll
reach for here. See [Filtering records](/integrations/data-api-filtering) for
the `filter` query parameter.

`POST` upserts, the same way as [module records](/integrations/data-api-explorer-module-records)
— one endpoint for both create and update, no separate call for each. A
dedicated `PATCH` and `DELETE` are also available below, for when you want an
explicit update or removal instead.

## Get all master records

<Method method="get" /> `/api/v1/master-record/{masterName}`

Retrieves all master records associated with a project or tenant. Supports
up to 1,000 records per request.

**Auth:** Bearer — a [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The master's identifier, e.g. `LOCATION`. Upper-cased before lookup. |
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
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="getAllMasterRecords">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Create or update a master record

<Method method="post" /> `/api/v1/master-record/{masterName}`

Upserts a record — one call handles both create and update, no separate
endpoint for each.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The master's identifier, e.g. `LOCATION`. |

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
| 400 | The request body is malformed or missing a required field. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="upsertMasterRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Update a master record

<Method method="patch" /> `/api/v1/master-record/{masterName}`

An explicit update, separate from the [upsert](#create-or-update-a-master-record)
`POST` above.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The master's identifier, e.g. `LOCATION`. |

### Request body

Same array-of-objects shape as the upsert `POST` above, each object limited
to the fields being changed. Each object must also include an identifier the
service recognizes, to match it to an existing record.

### Response — 200 OK

Same shape as the upsert `POST` above — `insertedIds`, `insertedCount`, and
`updatedCount`.

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed or missing a required field. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="updateMasterRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Delete a master record

<Method method="delete" /> `/api/v1/master-record/{masterName}`

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The master's identifier, e.g. `LOCATION`. |
| `userName` | query | string | Required | The acting user. |

### Request body

An array of objects, one per record to delete, each identified by
`recordNumber`.

```json
[
  { "recordNumber": "o2Kkw40gI8CO" }
]
```

### Response

Deletion is gated by the acting user's `delete` permission on the master. If
they lack it, the request still returns `200`, with the deletion skipped:

```json
{ "success": false, "message": "User doesn't have permission to delete the record" }
```

Otherwise, the result of the bulk-delete operation.

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed, or missing `masterName`/`userName`. |
| 400 | "User not found or active" |
| 401 | Invalid authentication token. |
| 403 | The acting user's tenant doesn't include the current tenant — "User not authorized to make this transaction" |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="deleteMasterRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
