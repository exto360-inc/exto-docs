---
outline: 2
title: Hierarchy master records explorer
description: "Interactive reference for reading and writing tree-shaped master data, with a live Try it."
---

# Hierarchy master records

Part of the [Data API explorer](/integrations/data-api-explorer). A
[hierarchical master](/work/hierarchical-masters) is
[master data](/integrations/data-api-explorer-masters) shaped as a tree — each
row knows its parent. These three endpoints are the same shape as plain
master records, against a different path.

::: tip Request bodies are intentionally generic here
The create/update bodies aren't typed in the spec — the Try-it form starts
empty rather than guessing at field names. `sys_rowID`, `sys_parentRowID`, and
`sys_path` are system-managed (see [Hierarchical masters](/work/hierarchical-masters#the-tree))
and aren't confirmed as settable through this API.
:::

## Get all hierarchy master records

<Method method="get" /> `/api/v1/hierarchy-master-record/{masterName}`

Retrieves rows from a hierarchy master, paginated. Each row includes the
tree-structure fields described in
[Hierarchical masters](/work/hierarchical-masters#the-tree).

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The hierarchy master's identifier. |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 25 | Records per page. |

::: tip Filtering and scoping, unconfirmed here
[Master records](/integrations/data-api-explorer-masters#get-all-master-records)
also accept `filter`, `sort`, `status`, and `X-Project-Id` on the same
underlying engine — likely available here too, but only `page` and `pageSize`
are confirmed for this endpoint specifically. There's also a separate ref-id
scoped filter, type-checked against this master's hierarchy field — its exact
query parameter name isn't confirmed, so it isn't listed above.
:::

### Response — 200 OK

Same envelope as [master records](/integrations/data-api-explorer-masters#get-all-master-records) —
see [Reference](/integrations/data-api-reference#response-format).

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" / "Missing Master name" |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="getAllHierarchyMasterRecords">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Create a hierarchy master record

<Method method="post" /> `/api/v1/hierarchy-master-record/{masterName}`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The hierarchy master's identifier. |

### Request body

A single object, or an array of objects (max 1000 items).

### Errors

| Status | Condition |
| --- | --- |
| 400 | Body not an array / over 1000 items. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="createHierarchyMasterRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Update a hierarchy master record

<Method method="patch" /> `/api/v1/hierarchy-master-record/{masterName}`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `masterName` | path | string | Required | The hierarchy master's identifier. |

### Request body

A single object, or an array of objects (max 1000 items). Any object
containing `_id` is rejected.

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `masterName`, body not an array / over 1000 items, or "Updating '_id' is not allowed". |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="updateHierarchyMasterRecord">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

::: tip No delete endpoint
Unlike every sibling resource on this site, hierarchy master records have no
`DELETE` operation.
:::
