---
outline: 2
title: User management explorer
description: "Interactive reference for granting, reading, and revoking user and project access, with a live Try it."
---

<!-- These 8 operations share one spec tag but are grouped below by what
     they actually do, so they're listed individually rather than via a
     single <OASpec :tags> call. If a new operation is ever added under the
     "User Management" tag in .vitepress/theme/data/data-api.json, add it here
     too — it won't appear automatically the way a tag-based page would
     pick it up. -->

# User management

Part of the [Data API](/integrations/data-api-explorer). Eight operations,
grouped by what they actually do.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## Look up groups

Start here if you're about to grant access below — `grantUserAccess` takes a
`groupID`, and this is where you find one.

<Method method="get" /> `/api/v1/user/groups`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 100 | Records per page. |
| `onlyProjectsGroups` | query | boolean | Optional — default `false` | Limit to project-level groups only. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="getAllGroups">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Granting and reading access

Access is granted and read per project or group.

<Method method="post" /> `/api/v1/user/user-access`

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `projects` | array | Optional — ≤100 items | Project IDs to grant access to. |
| `groups` | array | Optional — ≤100 items | Group IDs to grant access to. |
| *(other fields)* | — | Optional | Remaining fields (`username`, role, etc.) are service-defined. |

```json
{ "username": "jane.doe", "projects": ["p6iD1Wb"], "groups": ["g_engineering"] }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Projects length must not exceed 100" / "Groups length must not exceed 100" |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="grantUserAccess">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

<Method method="get" /> `/api/v1/user/user-access`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | query | integer | Optional — default 1 | Page number. |
| `pageSize` | query | integer | Optional — default 1000 | Records per page. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Page size must be between 1 and 1000" / "Page must be greater than 0" |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="getUserAccess">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

<Method method="get" /> `/api/v1/user/user-access/by-user`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `username` | query | string | Required | The user to look up. Lower-cased before lookup. |

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Username is mandatory" |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="getUserAccessByUsername">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
</OAOperation>

## Revoking access

Two different scopes of removal — company/group-level access versus
project-only access.

<Method method="delete" /> `/api/v1/user/user-access`

Remove users from company and/or project level groups.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Required | Lower-cased before use. |
| `projects` | array | Required — ≤100 items | |
| `groups` | array | Optional — ≤100 items | |

```json
{ "username": "jane.doe", "projects": ["p6iD1Wb"], "groups": [] }
```

::: tip Empty response when there's nothing to remove
If both `projects` and `groups` end up empty, the response body is empty —
there's nothing to report.
:::

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `username`/`projects`, or `projects.length > 100`. |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="revokeUserAccess">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

<Method method="delete" /> `/api/v1/user/project-access`

Remove users from projects.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Required | Lower-cased before use. |
| `projectIds` | array | Required — ≤100 items | |

```json
{ "username": "jane.doe", "projectIds": ["p6iD1Wb"] }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `username`/`projectIds`, or `projectIds.length > 100`. |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |

### Try it

<OAOperation operation-id="removeProjectAccess">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Activating and deactivating users

This toggles account-level status, separate from the access grants above — a
deactivated user keeps their access records but can't authenticate.

<Method method="patch" /> `/api/v1/user/activate-users`

### Request body

An array of 1 to 1000 usernames, lower-cased before use.

```json
["jane.doe", "john.smith"]
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Body not an array, empty, or over 1000 items. |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |
| 500 | The underlying update failed — "Failed to deactivate users" (message is reused verbatim from the deactivate path). |

### Try it

<OAOperation operation-id="activateUsers">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

<Method method="patch" /> `/api/v1/user/deactivate-users`

### Request body

Same shape as [activate](#activating-and-deactivating-users) — an array of 1
to 1000 usernames, lower-cased before use.

### Errors

| Status | Condition |
| --- | --- |
| 400 | Body not an array, empty, or over 1000 items. |
| 401 | Invalid authentication token. |
| 403 | Caller lacks access to the tenant or project. |
| 500 | The underlying update failed — "Failed to deactivate users". |

### Try it

<OAOperation operation-id="deactivateUsers">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
