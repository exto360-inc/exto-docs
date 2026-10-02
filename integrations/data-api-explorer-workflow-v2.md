---
outline: 2
title: Workflow v2 explorer
description: "Interactive reference for listing workflow instances and taking actions by record number, with a live Try it."
---

<!-- These 7 operations share one spec tag but each gets its own heading
     below, so they're listed individually rather than via a single
     <OASpec :tags> call — and so each shows up as its own entry in the
     right-side outline. If a new operation is ever added under the
     "Workflow V2" tag in .vitepress/theme/data/data-api.json, add it here
     too — it won't appear automatically the way a tag-based page would
     pick it up. -->

# Workflow (v2)

Part of the [Data API explorer](/integrations/data-api-explorer). A second
workflow surface, addressed by `recordId`/`recordNumber` + `moduleName`
rather than the single-action
[`/api/v1/workflow/{moduleName}`](/integrations/data-api-explorer-workflow-v1#take-a-workflow-action) —
list instances, read their step history, and take any of five actions. See
[Workflows & versions](/concepts/workflows-and-versions) for what an instance
and an action are.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## List workflow instances

<Method method="get" /> `/api/v2/workflow`

Current state of every workflow instance for records in a module — one call
instead of walking [history](#get-workflow-history) per record. Only expands
step data that already exists on the instance; it does not predict the
responsible user/group for steps not yet reached, since templates can branch
conditionally.

::: tip Requires `x-project-id`
Module records sharing a name are stored across projects in one collection,
so without this header the query can't tell projects' records apart.
:::

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `x-project-id` | header | string | Required | See the tip above. |
| `moduleName` | query | string | Required | The module's identifier. |
| `recordNumber` | query | string | Optional | Filter to one record. |
| `status` | query | string | Optional | Workflow status to filter to. |
| `responsibleUser` | query | string | Optional | Filter to a responsible user. |
| `responsibleGroup` | query | string | Optional | Filter to a responsible group. |
| `filter` | query | string | Optional | Raw GlobalFilters DSL, e.g. `field:eq:value` or nested `(field:eq:value:and:field2:cn:value2)`, evaluated against the module's custom fields. |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 25, max 100 | Records per page. |

### Response — 200 OK

```json
{
  "rows": [
    {
      "recordNumber": "EQ-0001",
      "workflowId": "...",
      "templateName": "Equipment Approval",
      "currentStepName": "Manager Review",
      "status": "In Progress",
      "createdBy": { "id": "...", "firstName": "...", "lastName": "...", "email": "...", "status": 1 },
      "lastUpdatedBy": { "...": "full user profile, or null" },
      "steps": [
        {
          "name": "Submission", "kind": "...", "active": false,
          "createdAt": "...", "completedAt": "...",
          "completedAction": { "name": "Submit", "status": "...", "nextStepName": "Manager Review" },
          "completedBy": { "...": "full user profile, or null" },
          "submittedBy": [
            { "submittedAction": "Submit", "submittedAt": "...", "withdrawnAt": "...", "submittedBy": { "...": "full user profile, or null" } }
          ],
          "previousUser": null,
          "responsibleUsers": ["...full user profile"],
          "responsibleGroups": [{ "name": "...", "members": ["...full user profile"] }],
          "ballInCourt": { "users": ["...full user profile"], "groups": ["...full group profile"] },
          "comments": [{ "text": "...", "createdAt": "...", "createdBy": { "...": "full user profile, or null" } }]
        }
      ],
      "generalComments": [{ "text": "...", "createdAt": "...", "createdBy": null }]
    }
  ],
  "total": 1, "page": 1, "pageSize": 25, "totalPages": 1
}
```

`generalComments` holds comments added via the general Comments panel rather
than through a Submit/Approve/Return/Reopen action — those can't be
attributed to one step occurrence.

### Errors

| Status | Condition |
| --- | --- |
| 400 | "moduleName is required" |
| 401 | Invalid authentication token. |
| 500 | Unknown module — "`<moduleName>` not Found." |
| 500 | Project set via header but not found — "Project not found for id: `<id>`" |

### Try it

<OAOperation operation-id="listWorkflowsV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Get workflow history

<Method method="get" /> `/api/v2/workflow/history`

Returns the step-by-step progress of one record's workflow instance.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `recordNumber` | query | string | Required | The record's number. |
| `moduleName` | query | string | Required | The module's identifier. |

### Errors

| Status | Condition |
| --- | --- |
| 401 | Invalid authentication token. |
| 500 | Unknown module — "`<moduleName>` not Found." |
| 500 | Project set via header but not found — "Project not found for id: `<id>`" |

### Try it

<OAOperation operation-id="getWorkflowHistoryV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Taking an action

Five actions. `create`, `submit`, `return`, and `reopen` share one
Zod-validated body shape; `revision` is narrower — see its own section below.

### Shared query parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `userName` | query | string | Required | The acting user. |
| `spaceName` | query | string | Required only if the `x-project-id` header is set | The space/project the record belongs to. |

### Shared errors

| Status | Condition |
| --- | --- |
| 400 | Zod validation failure (`VALIDATION_ERROR`). |
| 400 | Missing `userName`/`spaceName`, or "User not found or active". |
| 401 | Invalid authentication token. |
| 403 | "User not authorized to make this transaction" |
| 500 | Project set via header but not found — "Project not found for id: `<id>`" |

## Create a workflow instance

<Method method="post" /> `/api/v2/workflow/create`

Starts a new workflow instance for a record.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recordId` | string (Mongo ObjectId) | Required | |
| `moduleName` | string | Required | Upper-cased by the schema. |
| `actionName` | string | Required | |
| `assignee.users` | string[] (ObjectId) | Optional | |
| `assignee.groups` | string[] (ObjectId) | Optional | |
| `comment.text` | string | Optional — required if `comment` is present | |
| `comment.isPrivate` | boolean | Optional | |

```json
{
  "recordId": "67bfcbd6117e4e25e1d31dd3",
  "moduleName": "SAT_TDSP",
  "actionName": "Submit",
  "assignee": { "users": ["67bfcbd6117e4e25e1d31dd4"] },
  "comment": { "text": "Ready for review", "isPrivate": false }
}
```

### Errors

Same as the [shared errors](#shared-errors) above.

### Try it

<OAOperation operation-id="createWorkflowV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Submit a workflow instance

<Method method="post" /> `/api/v2/workflow/submit`

Submits the record from its current step. Same body shape as
[Create](#create-a-workflow-instance).

### Errors

Same as the [shared errors](#shared-errors) above.

### Try it

<OAOperation operation-id="submitWorkflowV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Return a workflow instance

<Method method="post" /> `/api/v2/workflow/return`

Returns the record to a previous step. Same body shape as
[Create](#create-a-workflow-instance).

### Errors

Same as the [shared errors](#shared-errors) above.

### Try it

<OAOperation operation-id="returnWorkflowV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Request a revision

<Method method="post" /> `/api/v2/workflow/revision`

Requests a revision on the record. Narrower body than the other four actions
— no `assignee`, and `actionName` is optional here.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recordId` | string (Mongo ObjectId) | Required | |
| `moduleName` | string | Required | Upper-cased by the schema. |
| `actionName` | string | Optional | |
| `comment.text` | string | Optional | Used as comment metadata. |
| `comment.isPrivate` | boolean | Optional | |

```json
{
  "recordId": "67bfcbd6117e4e25e1d31dd3",
  "moduleName": "SAT_TDSP",
  "comment": { "text": "Please re-check section 3" }
}
```

### Errors

Same as the [shared errors](#shared-errors) above.

### Try it

<OAOperation operation-id="reviseWorkflowV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Reopen a workflow instance

<Method method="post" /> `/api/v2/workflow/reopen`

Reopens a completed workflow instance. Same body shape as
[Create](#create-a-workflow-instance).

### Errors

Same as the [shared errors](#shared-errors) above.

### Try it

<OAOperation operation-id="reopenWorkflowV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
