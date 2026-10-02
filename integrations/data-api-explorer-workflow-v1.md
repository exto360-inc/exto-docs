---
outline: 2
title: Workflow v1 explorer
description: "Interactive reference for taking a workflow action on a record, with a live Try it."
---

# Workflow (v1)

Part of the [Data API explorer](/integrations/data-api-explorer). A single
endpoint — take a workflow action on a record, the same transition a user
takes from the record's **Actions** menu. See
[Workflows & versions](/concepts/workflows-and-versions) for what an action
is. For listing workflow instances and acting on them by record number
instead of module, see [Workflow (v2)](/integrations/data-api-explorer-workflow-v2).

## Take a workflow action

<Method method="post" /> `/api/v1/workflow/{moduleName}`

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key).

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | path | string | Required | The module's identifier. |
| `actionName` | query | string | Required | The workflow action to take, e.g. `Approve`. |
| `userName` | query | string | Required | The acting user. |
| `spaceName` | query | string | Required only if the `x-project-id` header is set | The space/project the record belongs to. |

### Request body

An array of record Mongo IDs to apply the action to, up to 100 per request.

```json
["67bfcbd6117e4e25e1d31dd3", "67bfcbd6117e4e25e1d31dd4"]
```

### Response — 201 Created

An array, one entry per record the action was applied to:

```json
[
  { "workflowId": "65fe3ec837106c4d84aef23e", "recordId": "65fe3e722483bc16eace3826" }
]
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `moduleName`/`userName`, or (when project-scoped) `spaceName`. |
| 400 | "User not found or active" |
| 400 | More than 100 record ids — "Maximum 100 records allowed but received N". |
| 400 | The action isn't valid from the record's current step. |
| 401 | Invalid authentication token. |
| 403 | "User not authorized to make this transaction" |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="takeWorkflowAction">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>
