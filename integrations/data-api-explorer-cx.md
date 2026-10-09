---
outline: 2
title: CX equipment & checklist explorer 
description: "Interactive reference for uploading a CX equipment register and creating checklist records from an integration, with a live Try it."
---

# CX equipment & checklists <Badge type="danger" text="DEPRECATED" />

::: warning Deprecated — won't carry forward to 3.0
Per the API team: these CX Data API endpoints won't support the new 3.0 Cx
data structure. Both are still live and functional against the current
(2.0) Cx structure — documented here for anyone integrating against it
today — but don't build a new integration on them. Check with the API team
for the 3.0 equivalent first.
:::

Part of the [Data API explorer](/integrations/data-api-explorer). Two
endpoints that exist on the live API but shipped undocumented until now —
confirmed by reading `CxUploadController` and `SubtaskUpdateControllerV1`
(`apps/data-api/src/app/v1/cx-upload.controller.ts` and
`subtaskUpdate.controller.ts`) and cross-checked against a runtime route dump
of `bump/26.5.0`. Both are commissioning (CX) specific — see
[Commissioning concepts](/cx/concepts) for `schedule`, `activity` and
`subtask`/step vocabulary.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## Upload a CX equipment register

<Method method="post" /> `/api/v1/cx/upload`

The JSON equivalent of importing an equipment register file against a CX
schedule — validates each row, then bulk-uploads it.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `scheduleId` | string | Required | The CX schedule the equipment register belongs to. |
| `data` | array | Required — non-empty | One object per equipment item. |

Each item in `data`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ID` | string | Required | Unique equipment identifier. |
| `Name` | string | Required | |
| `ParentID` | string | Optional | Parent equipment ID, for a hierarchy. |
| `TemplateID` | string | Optional | CX template this equipment uses. |
| `Predecessors` | string | Optional | Comma-separated predecessor equipment IDs. |
| `ParentChildDependency` | string | Optional | `Active` or `Inactive`. |
| *(anything else)* | string | Optional | Any other column from your equipment template — carried through as-is. |

```json
{
  "scheduleId": "sch_8f12a0",
  "data": [
    { "ID": "EQ-001", "Name": "Chiller 1", "TemplateID": "chiller-template" },
    { "ID": "EQ-002", "Name": "Chiller 2", "ParentID": "EQ-001" }
  ]
}
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | "Missing tenant ID" / "Missing project ID" / "Missing user name", or a row fails `class-validator` checks. |
| 401 | Invalid authentication token. |

### Try it

<OAOperation operation-id="uploadCxEquipment">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>

## Create checklist records for a CX step

<Method method="post" /> `/api/v1/cx-step/createChecklist`

Creates module-record checklist entries for a commissioning workflow step,
and links each one back onto the step's schedule entry and subtask. Every
element in the body array must share the same `workfid` (the workflow
template the step belongs to) — the endpoint looks the module up from that
template, not from `moduleName` alone.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `moduleName` | query | string | Required | The checklist's module, e.g. `INSPECTION_CHECKLIST`. Upper-cased before lookup. |
| `userName` | query | string | Required | The acting user — must belong to the current tenant. |

### Request body

An array of checklist records:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `workfid` | string | Required | Workflow template ID — same value on every element. |
| `scheduleid` | string | Required | CX schedule ID. |
| `activityid` | string | Required | Mongo ObjectId of the step's activity. |
| `subtaskid` | string | Required | Mongo ObjectId of the subtask/step. |
| `ex_manualstartdate` | ISO date string | Optional | Manual start date — defaults to now, converted to the project's timezone. |
| *(anything else)* | — | Optional | Any other field on the checklist module's own form. |

```json
[
  {
    "workfid": "67a1c2...",
    "scheduleid": "sch_8f12a0",
    "activityid": "66f0ab...",
    "subtaskid": "66f0ac..."
  }
]
```

### Response — 200 OK

```json
{ "insertedIds": ["67bfcbd6117e4e25e1d31dd3"] }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `userName`/project ID, user not found or inactive, no matching CxEntryLog entries, or a payload is missing a required field. |
| 403 | The acting user's tenant doesn't include the current tenant. |

### Try it

<OAOperation operation-id="createCxChecklist">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
</OAOperation>
