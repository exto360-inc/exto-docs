---
description: "Two ways to ask about a file, and why they behave differently."
---

# Attachments & documents

You can ask the assistant about a file two ways: **attach it to the message**,
or **point at a document already in [Drive](/work/documents)**. They look
similar in the panel and are entirely different underneath.

<Shot src="ai/attachments" alt="A question with two attached files" pending
  caption="Two files attached to one question, with the Sources list under the answer." />

## Which one you are using

<DSplit :columns="[
  {
    title: 'Attach a file',
    sub: 'the paperclip',
    via: 'The file itself goes to the model, whole',
    items: ['Reads the document end to end', 'Touches no tenant data'],
  },
  {
    title: 'Pick from Drive',
    sub: 'the document picker',
    via: 'Indexed passages of the document are retrieved',
    items: ['Searches across the documents', 'Cites the passages it used'],
  },
]" />

The short version: **attach** when the file is new and the question is about the
file. **Pick from Drive** when the document is already in Exto and you want
answers grounded in it, with citations.

## Attaching a file

Up to **three files** per message, **10 MB** each.

| Accepted | |
| --- | --- |
| Documents | PDF, plain text, Markdown |
| Images | PNG, JPEG, GIF, WebP |

Attaching changes the turn entirely. The assistant does **not** query your
tenant data — no modules, no records, no reasoning loop. It reads the documents
and answers from them alone.

That is deliberate. A question asked with a file attached is nearly always about
the file, and mixing a document read with a data query produces answers where
nobody can tell which half came from where.

Consequences worth knowing:

- **Attach a file, get a document answer.** "How many of these appear in the
  Inspections module" will not be answered — ask that in a separate message.
- **The answer lists its sources.** Every attached filename is named under the
  answer.
- **Files can be removed.** Removing an attachment deletes it from the model
  provider immediately.

Attachments are treated as untrusted throughout: text inside a document that
looks like an instruction, a system prompt or a role change is ignored rather
than acted on. See [Guardrails & permissions](/ai/guardrails#prompt-safety).

## Pointing at Drive documents

The document picker browses your [Drive](/work/documents) folders and search,
and lets you select up to **three** documents.

Only documents that have been **indexed for AI** can be selected. Drive shows an
indexing status badge per document; an un-indexed or unsupported file is not
selectable.

This path runs a proper retrieval pipeline rather than reading whole files:

<DBranch
  source="Question"
  :branches="[
    { label: 'Meaning search' },
    { label: 'Keyword search' },
    { label: 'Named-entity search' },
  ]"
  :then="[
    { label: 'Merged and re-ranked' },
    { label: 'Enough to answer?', note: 'if not, retrieve again — twice at most' },
  ]"
  result="Answer, with the passages it used" />

Because it retrieves passages rather than whole files, it works over documents
far larger than an attachment limit — and it tells you which passages the answer
came from.

::: tip Why both searches
Meaning search finds a passage that says the same thing in different words.
Keyword search finds an exact part number that no embedding will match. Serious
questions need both, so both run and the results are merged.
:::

### If it cannot fully answer

Retrieval stops after two extra passes. If the documents still do not contain
enough, the answer says what is missing rather than filling the gap — a stated
gap is more useful than a confident invention.

### Access is re-checked

The documents you select are re-validated against your actual document access
before anything is retrieved. Knowing a document's identifier is not enough to
have it read to you.

## Getting a document indexed

Indexing happens in the background after a document is uploaded to Drive.
Progress and failures appear on the [job status](/work/recycle-bin) page.

A document that stalls is picked up automatically and marked failed rather than
sitting in progress forever; an administrator can re-run the indexing for a
document.

## Attachments elsewhere

Attachments a **record** carries are read by [insights](/ai/insights) — a record
insight names its attachments and, where the file type allows, reads a preview
of them into the summary. That is separate from anything you attach in chat.

## Permissions

Both paths obey the same rules as the rest of the platform:

- **Attached files** are yours for that message. They are sent to the model
  provider and removed when you remove them.
- **Drive documents** are filtered to what you may actually open, regardless of
  what was selected.

The organisation-wide **AI access** switch and your AI entitlement apply here
as they do everywhere.

## Related

- [Documents](/work/documents) — Drive itself, and the indexing status badge.
- [Assistant](/ai/assistant) — the panel.
- [Grounding & retrieval](/ai/grounding) — how retrieval works in more depth.
