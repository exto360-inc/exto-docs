---
outline: 2
title: Workspace explorer
description: "Interactive reference for creating, reading, and updating workspaces, with a live Try it."
---

# Workspace

Part of the [Data API explorer](/integrations/data-api-explorer). Standard
CRUD for workspaces — create, list, get one, and update. There's no delete
endpoint.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## Create a workspace

<Method method="post" /> `/api/v1/workspace`

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Required | |
| `parentId` | string (ObjectId) | Optional | Parent workspace's ID. |

```json
{ "name": "West Region" }
```

### Response — 201 Created

The created workspace document.

### Errors

| Status | Condition |
| --- | --- |
| 400 | Validation failure, e.g. missing `name`. |
| 401 | Invalid authentication token. |

### Try it

<OAOperation operation-id="createWorkspace">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## List workspaces

<Method method="get" /> `/api/v1/workspace`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 25 | Records per page — 1 to 1,000. |
| `filter` | query | string | Optional | Conditional filter expression — see [Filtering records](/integrations/data-api-filtering). |
| `sort` | query | string | Optional | Field to sort by. |

### Response — 200 OK

```json
[
  { "id": "67bfcbd6117e4e25e1d31dd3", "name": "West Region", "parentId": null, "createdAt": "2025-02-27T02:20:06.958Z", "updatedAt": "2025-02-27T02:20:06.958Z" }
]
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" |
| 401 | Invalid authentication token. |

### Try it

<OAOperation operation-id="listWorkspaces">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Get a workspace

<Method method="get" /> `/api/v1/workspace/{id}`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | Required | |

### Errors

| Status | Condition |
| --- | --- |
| 401 | Invalid authentication token. |
| 404 | No matching workspace. |

### Try it

<OAOperation operation-id="getWorkspace">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Update a workspace

<Method method="patch" /> `/api/v1/workspace/{id}`

Reuses the same body shape as [create](#create-a-workspace).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | Required | |

### Errors

| Status | Condition |
| --- | --- |
| 400 | Validation failure. |
| 401 | Invalid authentication token. |

### Try it

<OAOperation operation-id="updateWorkspace">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>
