---
description: "Every AI surface in Exto, what governs them, and where to read further."
---

# AI

Exto has one AI platform and several surfaces onto it. They differ in what they
are for, not in what they are built on: the same tenant knowledge base, the same
permission checks, the same guards.

<Shot src="ai/overview" alt="The AI assistant panel open beside a record" pending
  caption="The assistant docked beside the page, with the reasoning steps expanded." />

## The surfaces

| Surface | Does | Where |
| --- | --- | --- |
| [Assistant](/ai/assistant) | Answers questions about your data, in chat | The docked panel, anywhere |
| [Attachments & documents](/ai/attachments) | Answers questions about files | The chat panel |
| [Memory](/ai/memory) | Remembers what you told it, across sessions | Behind the assistant |
| [CX workbench AI](/ai/cx) | Commissioning analytics, and a setup copilot | Inside a workbench |
| [Insights](/ai/insights) | Summarises one record, one module, one asset | On the page itself |
| [AI form builder](/ai/form-builder) | Reads a document and drafts a form | The module designer |
| [Module builder](/build/module-builder) | Reads a document and builds a whole module | Its own wizard |

## How it works

Four pages describe the mechanism rather than the screen. Read them if you need
to know *why* an answer came out the way it did.

| Page | Covers |
| --- | --- |
| [The reasoning loop](/ai/reasoning-loop) | How a question becomes an answer, step by step |
| [Grounding & retrieval](/ai/grounding) | What the AI knows about your data, and how it finds things |
| [Guardrails & permissions](/ai/guardrails) | What it may read, and what stops it reading more |
| [Limits, tracing & failure states](/ai/operations) | Budgets, quotas, auditing, and what happens when something breaks |

The architecture companion carries the system-level view:
[The AI platform](/architecture/ai-platform).

## What they share

**Grounding.** Every surface reads the same per-tenant knowledge base — your
schema, described in your own vocabulary. How good the answers are depends
directly on two things an administrator controls:

- **Module descriptions**, written in business terms, in the
  [module designer](/build/module-designer).
- **The schema editor** — display names, descriptions and synonyms per field.
  See [Data setup](/admin/data-setup).

Curating those is the difference between an assistant that answers in your
vocabulary and one that answers in column names.

**Permissions.** No AI surface widens access. Every one of them answers from
data you can already open, through the same
[permission model](/concepts/permissions) as every screen.

**Your context.** The assistant knows which page you have open, which modules
you can reach, and what you have told it before. All three are *defaults* that
help it interpret a vague question — none of them is a wall. See
[Context & scope](/ai/context).

## Turning AI on and off

Four switches, at three levels. They are checked in this order, and the first
one that says no wins.

<DFlow :steps="[
  {
    title: 'AI access',
    body: 'Off ⇒ no AI anywhere in the organisation',
    note: 'Settings → AI personalization',
  },
  {
    title: 'AI entitlement',
    body: 'Denied ⇒ this user’s turns are refused',
    note: 'seat / quota',
  },
  {
    title: 'AI insights',
    body: 'Off ⇒ no insights; chat is unaffected',
    note: 'your profile',
  },
  {
    title: 'AI memory',
    body: 'Off ⇒ nothing remembered or recalled',
    note: 'your profile',
  },
]" />

| Control | Scope | Where |
| --- | --- | --- |
| **AI access** | The whole organisation | Settings → AI personalization |
| **Custom instructions** and **terminology** | The whole organisation | Settings → AI personalization |
| **AI insights**, placement and trigger | One user | [Your profile](/account/profile) |
| **AI memory**, and purge | One user | [Your profile](/account/profile) |

The organisation-wide switch wins. With AI access off, every surface is
unavailable regardless of individual preferences.

::: tip Personalization is not a permission
**Custom instructions** and **terminology** shape tone and vocabulary. They
never grant access to data. A term defined in the glossary that maps to a
module you cannot open still gets you nothing.
:::

## What AI does not do

- **It does not take workflow actions.** Moving a record is always a person; see
  [Taking actions](/work/taking-actions).
- **It does not edit records.** The one exception is the CX
  [setup copilot](/ai/cx#the-setup-copilot), which writes configuration only
  behind an explicit confirmation you click.
- **It does not widen access.** It answers from data you can already see.
- **It does not confirm what you cannot see.** Asked about a module you have no
  access to, it says it may not have access to everything here — it does not
  tell you whether that module exists.
