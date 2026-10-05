---
outline: 2
title: Documents explorer
description: "Bulk document upload and download through the Data API, with a live Try it."
---

# Documents

Part of the [Data API explorer](/integrations/data-api-explorer). Three
endpoints bring bulk document handling to the Data API — the same capability
the legacy REST API (`/api/v2/bp/documents`) has long provided, plus
tenant/project authorization on every call.

- **Bulk upload** — up to 100 files per request.
- **Single download** — one document by ID, scoped to the caller's tenant and
  project.
- **Bulk download** — every attachment on a record, streamed as a single ZIP.
- **Authorization on all three** — checked against the caller's tenant and
  project before anything touches storage.

## Uploading documents

<Method method="post" /> `/api/v1/documents`

Accepts `multipart/form-data` and attaches files at record level, sub-table
level, or checklist-item level, depending on the `module`/`ID` pair supplied.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | file[] | Required | Any form-field name is accepted. 1 to `DATA_API_BULK_UPLOAD_MAX_FILES` files (default 100), `DATA_API_BULK_UPLOAD_MAX_FILE_SIZE_MB` MB max per file (default 50) — both env-configurable. |
| `module` | string | Optional | Target module/entity the file(s) attach to. Requires `ID` when set. |
| `ID` | string | Conditional | Record ID being attached to. Required whenever `module` is present. |
| `meta` | JSON string | Optional | Extra metadata applied to every file (tags, description). Per-file `docTitle` always defaults to that file's own name, regardless of this value. |
| `linkedRefID` | string | Optional | Reference ID linking the upload to a related record. |
| `groupID` | string | Optional | Document group to file the upload under. |
| `folderID` | string | Optional | Destination folder in the document manager. |
| `parentID` | string | Optional | Parent document ID, for versioning under an existing file. |
| `scope` | JSON string | Optional | Visibility scope array, e.g. `["PROJECT"]`. Defaults by context when omitted. |

::: tip `module` without `ID` is rejected
A request with `module` set but no `ID` returns `400` rather than silently
saving an orphaned, unlinked document.
:::

```bash
curl -X POST https://api.example.com/api/v1/documents \
  -H "Authorization: Bearer <token>" \
  -F "files=@site-photo-1.jpg" \
  -F "files=@site-photo-2.jpg" \
  -F "module=inspection_checklist_item" \
  -F "ID=68f0a2c1..." \
  -F 'meta={"userTags":["punch-list"]}'
```

::: tip Partial failures still return 200
If one file in a batch fails — type validation, for example — the request
still returns `200`, with `message: "errors.error_partial_upload"`. The
files that succeeded are in `data`; the rest are in `errors` as
`{ fileName, message }`.
:::

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `x-tenant-id` ("Missing tenant ID") or `x-project-id` ("Missing project ID"). |
| 400 | No resolvable username on the authenticated context — "Missing user name". |
| 400 | No files attached — "At least one file is required". |
| 400 | `module` given without `ID` — "ID is required when module is specified". |
| 403 | Caller isn't found/inactive, isn't a member of the tenant, or lacks access to the project. |

### Try it

<OAOperation operation-id="uploadDocuments">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Downloading one document

<Method method="get" /> `/api/v1/documents/download/:id`

Downloads a single document by its ID, as a file stream. Returns a binary
file stream with `Content-Disposition: attachment; filename="…"`.

| Param | In | Required | Description |
| --- | --- | --- | --- |
| `id` | path | Required | Document ID. |
| `version` | query | Optional | Specific version name. Defaults to the latest version. |
| `x-tenant-id` | header | Required | — |
| `x-project-id` | header | Required | — |

::: warning Fixed: cross-project downloads
An earlier version only loosely checked tenant, so a document ID from another
project in the same tenant could be downloaded. This endpoint scopes strictly
by tenant, project, and not-deleted before serving the file.
:::

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `x-tenant-id` or `x-project-id`. |
| 403 | Caller not found/inactive, not in the tenant, or lacks access to the project. |
| 404 | Document not found for the tenant/project — "errors.error_document_not_found". |
| 404 | Document exists but its file is missing on disk — "errors.error_document_file_missing". |

### Try it

<OAOperation operation-id="downloadDocument">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Downloading every attachment on a record

<Method method="get" /> `/api/v1/documents/download/all/:recordId`

Streams every attachment on a record as a single ZIP archive, piped directly
to the response — the archive is never fully buffered in memory. Returns an
`application/zip` stream named `<recordId>_attachments.zip`; each
attachment's latest version is included, named `<documentName>-<version>`.

| Param | In | Required | Description |
| --- | --- | --- | --- |
| `recordId` | path | Required | ID of the record to collect attachments for. |
| `module` | query | Required | Module the record belongs to. |
| `x-tenant-id` | header | Required | — |
| `x-project-id` | header | Required | — |

### Errors

| Status | Condition |
| --- | --- |
| 400 | Missing `x-tenant-id`/`x-project-id`, or `module` query param omitted. |
| 403 | Caller not found/inactive, not in the tenant, or lacks access to the project. |
| 404 | No attachments resolve for the record — "errors.error_no_documents_found". |

### Try it

<OAOperation operation-id="downloadAllDocuments">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Authentication

All three endpoints sit behind the Data API's global auth guard — there's no
separate login step for documents specifically.

| Header | How it's resolved |
| --- | --- |
| `Authorization: Bearer <apiKey>` | Checked against stored, active [Personal Access Tokens](/integrations/data-api#generating-a-key). |

Every request must also include `x-tenant-id` and `x-project-id` headers.

::: tip The token doesn't bypass tenant/project checks
The resolved user still has to belong to the tenant and have access to the
project, or the request is rejected with `403` — the same rules apply no
matter which valid token is used.
:::
