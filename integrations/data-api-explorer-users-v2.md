---
outline: 2
title: User management (v2) explorer
description: "What's different in the v2 user management API, with a live Try it for the two changes."
---

# User management (v2)

Part of the [Data API explorer](/integrations/data-api-explorer). Mirrors
every operation on [User management](/integrations/data-api-explorer-users)
at `/api/v2/user/...` with identical request/response/error shapes, plus two
changes — documented in full below. For the other seven operations
(grant/read/revoke access, activate/deactivate), use the v1 page; the
behavior is the same, just under `/api/v2/user/...` instead of
`/api/v1/user/...`.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## Look up groups

<Method method="get" /> `/api/v2/user/groups`

Same as [v1](/integrations/data-api-explorer-users#look-up-groups), plus a
second boolean filter alongside the existing one.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 100 | Records per page. |
| `onlyProjectsGroups` | query | boolean | Optional — default `false` | Limit to project-level groups only. |
| `onlyWorkspaceGroups` | query | boolean | Optional — default `false` | Limit to workspace-level groups only. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="getAllGroupsV2">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Remove workspace access

<Method method="delete" /> `/api/v2/user/workspace-access`

New in v2 — removes a user's access to a set of workspace groups. No v1
equivalent.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Required | Lower-cased before use. |
| `workspaceGroups` | array | Required — ≤100 items | |

```json
{ "username": "jane.doe", "workspaceGroups": ["ws_group_1"] }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `username`/`workspaceGroups`, or `workspaceGroups.length > 100`. |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="removeWorkspaceAccess">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
