---
description: "Asking questions of your data — what comes back, and how the answer was reached."
---

# Assistant

A chat panel that answers questions about your tenant's data — *"how many
inspections are open in Riverside"*, *"show me last month's rejected expenses"*,
*"which of these are overdue"* — and returns a table, a chart, a file or an
answer in prose.

<Shot src="ai/assistant" alt="The assistant panel" pending
  caption="A question answered as a table, with the reasoning steps and the export action above it." />

## The panel

The assistant is **docked**, not an overlay. It is a sibling of the page
content: opening it shrinks the page rather than covering it, so you can read a
record and ask about it at the same time. Drag its edge to resize between a
fifth and three-fifths of the window.

It survives navigation. Moving to another page does not close the panel, end
the conversation or lose an answer in flight.

## Asking

Type a question. Before answering, the assistant works out what kind of question
it is:

| Kind | Example | What happens |
| --- | --- | --- |
| **New data question** | "how many open issues" | Goes to your data |
| **Follow-up** | "just the rejected ones" | Rewritten to stand alone, then goes to your data |
| **General question** | "hi", "what can you do" | Answered directly |

A follow-up is rewritten into a complete question before it runs, so *"and just
the rejected ones"* becomes the whole request rather than a fragment that needs
the previous one still in mind.

It also knows roughly where you are. The page you have open — a module, a
record, a project, a [CX workbench](/ai/cx) — is sent with the message as a
hint. See [Context & scope](/ai/context) for exactly what that does and does
not do.

::: tip The page hint is a default, not a filter
It nudges the assistant toward what you are looking at. It never restricts what
you can ask about, and it never widens what you are allowed to see.
:::

## What comes back

| Output | When |
| --- | --- |
| **Table** | A set of records or aggregates |
| **Chart** | Something better seen than read |
| **Markdown** | A prose answer |
| **Download** | A generated file |
| **Composite** | Several of the above together |
| **Clarification** | The question was ambiguous — it asks rather than guesses |
| **Explanation** | It could not answer, and says what it tried |

Summary questions come back **aggregated**, not as a raw list — counts by
status, totals by category, top-N. You get a list of individual records when you
ask to *show*, *list* or *view* them.

### Citations

Where an answer names a record, module, workbench or document that the
assistant actually retrieved, the name becomes a link. Clicking it takes you to
the thing itself.

Only entities the turn genuinely resolved are linked. A name the model produced
without retrieving it stays plain text — a dead link would be worse than none.

### Exporting

Table, chart and download answers carry an export action: **XLSX**, **CSV** or
**JSON**.

The export is not the rows on screen. It re-runs the same query without the
preview limit, so a table showing the first fifty rows exports all of them —
with every scope and permission filter from the original question still
applied.

## Watching it work

While a turn runs, the panel shows what the assistant is doing — a live step
list, not a spinner:

<DStack :layers="[
  { n: '✓', title: 'Identifying data source', note: 'Inspections selected' },
  { n: '✓', title: 'Searching Inspections', note: '128 records' },
  { n: '⋯', title: 'Composing the answer' },
]" />

Each step names the action in business language. Repeated attempts against the
same module are collapsed, so a retry does not read as two searches.

Underneath, the assistant plans one action at a time, runs it, reads the result
and decides again. [The reasoning loop](/ai/reasoning-loop) describes what it
can do at each step.

## When it asks back

If a question is genuinely ambiguous, the assistant stops and asks rather than
guessing. Two situations produce a question:

| Situation | Example |
| --- | --- |
| **You named something that does not exist** | "show me Acme Corp's records" — no such customer |
| **A required value was never given** | "items approaching expiry" — over what period? |

The question arrives as a card with real options where it can offer them —
actual project names, actual workspaces, actual modules you can open, actual
values from the field in question. Pick one, or type an answer.

Answering resumes the *original* request with your answer folded into it. It
does not start over, and it does not hand the resumed turn a fresh budget — the
work already done still counts.

## Sessions

Conversations are kept as sessions, with a title generated from your first
message, a turn count and a **favourite** flag. Follow-ups within a session keep
their context.

You can also rename a session, delete individual turns, delete the whole
session, and give a turn a thumbs up or down.

Sessions are threads, not scopes. A session opened on one module can ask about
any other — see [Context & scope](/ai/context).

::: warning Deleting a session is a memory event
Deleting a session is one of the moments the assistant extracts durable facts
from it. If you want a conversation to leave no trace, purge your
[memory](/ai/memory) as well as deleting the session.
:::

## Sending a new message mid-answer

Sending a second message while the first is still running **cancels** the first.
There is also an explicit stop control. A cancelled turn is recorded as
cancelled rather than as an error.

Closing the panel, navigating away or losing your connection does **not** cancel
anything. The turn continues on the server and is saved; reopening the session
shows the completed answer.

## When it says it is updating its knowledge

The assistant needs two things to answer: the **knowledge graph** of your schema
and the **vector store** of your content. If either is genuinely missing, it says
it is updating its knowledge rather than answering from a partial picture, and a
repair is triggered automatically.

This usually resolves on its own. If it persists, an administrator should check
[Data setup](/admin/data-setup) and the sync jobs on the
[job status](/work/recycle-bin) page. See
[Grounding & retrieval](/ai/grounding#when-the-knowledge-base-is-not-ready).

## Making it better

The single most effective thing an administrator can do is curate the **schema
editor** — display names, descriptions and **synonyms** per field — and write
real **module descriptions** in the
[module designer](/build/module-designer). Synonyms are what let people ask in
their own words; references are what let a question span two collections.

Curation only takes effect after a **schema sync**, and the
[knowledge graph](/admin/data-setup) shows whether anything is left isolated.

**Custom instructions** and a **terminology** list, under **Settings → AI
personalization**, shape tone and vocabulary organisation-wide. Terminology is
used two ways: to route a request to the right module, and to word the answer.

## Permissions

The assistant answers only from data you can already see. It is governed by the
same [permissions](/concepts/permissions) as every other screen — it is not a
way around them.

**AI access** is an organisation-wide switch under **Settings → AI
personalization**. With it off, the assistant is unavailable to everyone. A
per-user AI entitlement is checked as well; a user without one is refused before
any work starts.

## Related

- [Context & scope](/ai/context) — what the assistant knows about where you are.
- [Attachments & documents](/ai/attachments) — asking about files.
- [Memory](/ai/memory) — what carries across sessions.
- [Guardrails & permissions](/ai/guardrails) — what stops it overreaching.
