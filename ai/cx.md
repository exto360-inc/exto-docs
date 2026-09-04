---
description: "Commissioning intelligence, workbench-aware chat, the setup copilot, and handover evidence."
---

# CX workbench AI

The [CX workbench](/cx/) has more AI in it than any other part of Exto, because
it has more to reason about: thousands of assets, a stage matrix, gates, dates
and a handover package at the end.

Four distinct things, doing four distinct jobs.

<Shot src="ai/cx-intelligence" alt="The visual insights panel" pending
  caption="The Visual insights panel — status, completion by level, and the delay table." />

| | What it is | Where |
| --- | --- | --- |
| **Visual insights** | Pre-computed workbench analytics with a narrative | The matrix's fifth KPI card |
| **Workbench chat** | The assistant, aware of the workbench you are in | The docked panel |
| **Setup copilot** | Configuration help that can write, behind a confirmation | The docked panel, routed automatically |
| **Handover evidence** | A drafted evidence summary for a handover package | The handover flow |

## Visual insights

The fifth KPI card above the [matrix](/cx/matrix) opens a panel of workbench-wide
analytics. Unlike the other four cards it does not filter the matrix — it
answers a different question, which is "how is this workbench actually doing".

| Section | Shows |
| --- | --- |
| **Status distribution** | The mix of asset states, as a donut |
| **Completion by level** | Progress per [level](/cx/levels-and-stages) |
| **Top delayed** | The assets furthest past their dates |
| **Top blocked** | The assets with open [gates](/cx/gates) |
| **Upcoming** | Work about to become due |
| **My tasks** | Your own approaching tasks |
| **My assets** | The assets you are responsible for |
| **Accessible stages** | The stages you may actually act on |

Every aggregation runs in parallel and is capped, so a workbench with thousands
of assets returns a panel of the same size and shape as a small one. A narrative
summary is generated over the aggregates.

The last four sections are **permission-scoped** — they answer "what is mine and
what may I touch", not "what exists". Two people looking at the same workbench
see different lists.

## Asking the assistant about a workbench

The assistant reaches commissioning data through the same
[reasoning loop](/ai/reasoning-loop) as anything else, with three commissioning-
specific abilities added when they can be used unambiguously.

### When CX data is reachable at all

<DSplit :columns="[
  {
    title: 'You have at least one permitted workbench',
    via: 'Commissioning data is in scope',
    foot: 'Which workbench you may actually read is still decided per query.',
  },
  {
    title: 'You have none',
    via: 'Commissioning data is not in the picture at all',
    foot: 'And the assistant is told so plainly.',
  },
]" />

The gate is **permission**, not which page you are on. Having a workbench makes
CX askable from anywhere — consistent with every other module being governed by
permission rather than by where you happen to be standing.

Within that, each query is still scoped: pinned to one workbench when the page
names one you are permitted for, or across every workbench you are permitted for
when it does not.

### The three commissioning abilities

They are offered only when exactly **one** workbench is unambiguously in play —
either the page names one you are permitted for, or you have exactly one.

| Ability | Answers |
| --- | --- |
| **Workbench overview** | "How is commissioning going" — the pre-computed metrics |
| **Asset progress** | "Where is pump P-101" — one named asset's status, steps, dates, gates |
| **My tasks** | "What is coming up for me" |

With two or more workbenches and none named, these are not offered — the
assistant reaches commissioning data through ordinary queries instead, which
handle the multi-workbench case natively.

::: tip Ask about a named asset by name
"How far along is P-101" is answered from the live progress record for that
asset, not by searching for it. Naming the asset is what routes it there.
:::

### Asset summaries

Opening an asset's panel in the matrix offers an AI summary of that asset — its
state, its predecessors, what is holding it up. This is an [insight](/ai/insights),
not a chat turn: one pass over the asset's real progress data, no loop.

Commissioning **records** get an insight of their own too, which adds checklist
progress, linked record status and attachments to the standard record summary.

## The setup copilot

A configuration assistant for the workbench: it answers questions about how the
workbench is set up from live data, previews and validates changes freely, and
**writes only behind an explicit confirmation**.

It has no button and no session type of its own. Each message you send is
classified, and a configuration request with a workbench unambiguously in scope
runs against the copilot instead of the general assistant.

<DStack :layers="[
  {
    title: '“how many stages are in the Electrical level?”',
    body: 'A data question',
    note: 'general assistant',
  },
  {
    title: '“add a witness stage after Energisation”',
    body: 'Proposes the change, then asks',
    note: 'setup copilot',
  },
  {
    title: '“yes, apply it”',
    body: 'Executed exactly as proposed',
    note: 'setup copilot',
  },
]" />

Three properties are worth knowing:

- **It is guide-first.** It explains and previews before it proposes, and a
  proposal is validated against the workbench's own rules before you see it.
- **A confirmation is honoured literally.** Clicking Apply executes the proposal
  that was shown — the model does not get another turn in which to reinterpret
  or drop it. Anything ambiguous falls back to re-planning rather than guessing.
- **It asks which workbench.** A configuration request with more than one
  candidate workbench produces a picker, not a guess. Guessing here would apply
  a change to the wrong project.

A conversation that started with the copilot stays with it across the
confirmation, rather than re-classifying your one-word answer.

::: warning This is the one AI surface that writes
Everything else in Exto's AI reads. The setup copilot changes workbench
configuration — always behind a confirmation you click, always scoped to a
workbench you are permitted to configure.
:::

## Handover evidence

When a handover package is built, its evidence summary is drafted by an agent
that searches the package's documents and assembles what it finds, in a bounded
number of steps.

If it cannot finish — too many steps, or a failure — the package falls back to a
deterministic report built from the structured data alone. The package is
produced either way; the AI improves the write-up, it is not load-bearing for
the handover itself.

See [Handover](/cx/handover) for the package pipeline, eligibility and the
invalidated state.

## Permissions

Everything above is scoped by workbench permission:

- **Visual insights** shows workbench-wide aggregates, with your own tasks,
  assets and stages scoped to you.
- **Chat** may only read workbenches you are permitted for, enforced per query
  rather than by which one is open.
- **The setup copilot** writes only to a workbench you may configure, and only
  after you confirm.

The organisation-wide **AI access** switch governs all of it — with AI off, the
fifth KPI card does not appear.

## Related

- [The commissioning matrix](/cx/matrix) — the screen the insights sit above.
- [Handover](/cx/handover) — the package pipeline.
- [CX execution](/architecture/cx-execution) — the engine producing the numbers.
- [Insights](/ai/insights) — asset and record summaries in general.
