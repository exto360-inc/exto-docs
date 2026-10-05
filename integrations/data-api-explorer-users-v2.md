---
outline: 2
title: User management (v2) explorer
description: "What's different in the v2 user management API, with a live Try it for the two changes."
---

# User management (v2)

::: danger Not reachable in any environment
`UserControllerV2` (`apps/data-api/src/app/v2/user.controller.ts`) is written
and exports all nine operations below and on the v1-equivalent list, but it
is never added to `PlatformDataAPIAppModule`'s `controllers` array — only
imported. Nest never mounts it, so **every** `/api/v2/user/...` route 404s,
on every environment. Confirmed two ways: reading the module file, and a
runtime route dump via `SwaggerModule.createDocument()` against both
`bump/26.5.0` and the current default branch — neither lists a single
`/api/v2/user/*` route. This is a live platform gap, not a docs gap; flag it
to the API team if you need it. Until it's wired up, use
[User management (v1)](/integrations/data-api-explorer-users) — same
behavior, `/api/v1/user/...`.
:::

Part of the [Data API explorer](/integrations/data-api-explorer). Would
mirror every operation on
[User management](/integrations/data-api-explorer-users) at
`/api/v2/user/...` with identical request/response/error shapes, plus the
two changes documented below, once mounted.

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
