---
description: "Budgets, switches, what is recorded per turn, and every state a turn can end in."
---

# Limits, tracing & failure states

What bounds an AI turn, what is recorded about it, and what happens when
something does not work. This is the page to read when an answer was slow,
missing, refused, or you need to account for what the platform did.

## The switches, in order

Four independent controls. They are evaluated top-down and the first *no* wins.

| # | Control | Scope | Set at | Off means |
| --- | --- | --- | --- | --- |
| 1 | **AI access** | The organisation | Settings → AI personalization | No AI anywhere in the tenant |
| 2 | **AI entitlement** | One user | Managed for the organisation | This user's turns are refused |
| 3 | **AI insights** | One user | [Your profile](/account/profile) | No insights; chat unaffected |
| 4 | **AI memory** | One user | [Your profile](/account/profile) | Nothing captured or recalled |

Both organisation-level controls are checked **before any work begins**, so a
refused turn costs nothing.

::: tip Personalization on/off is a third thing
**Settings → AI personalization** carries two independent switches: the tenant's
AI access, and whether custom instructions and terminology are applied at all.
Turning personalization off does not turn AI off.
:::

## Budgets

| Bound | Applies to | Behaviour at the limit |
| --- | --- | --- |
| **Iterations** | One chat turn | A narrative of what was tried, not a bare failure |
| **Consecutive failures** | One chat turn | Ends after three, constructively |
| **Wall clock** | One chat turn | Hard cap, so nothing runs indefinitely |
| **Observations retained** | The planner's view | Only the most recent few |
| **Retrieval passes** | Document questions | Two extra passes, then answer with a stated gap |
| **Agent steps** | Handover evidence | Falls back to a deterministic report |
| **Attachments** | One message | Three files, ten megabytes each |
| **Drive documents** | One message | Three documents |
| **Extraction transcript** | Memory capture | The most recent stretch of a long session |

A [clarification](/ai/reasoning-loop#clarifying-and-coming-back) does not reset
the iteration budget. The resumed turn continues on what was left, so a
question and its answer together cost about what one uninterrupted turn would
have.

## Usage accounting

Every turn records what it consumed — prompt tokens, completion tokens, and how
many model calls were made across the whole turn, including the guards, the
classifier and every tool.

Refused turns are accounted for too, when a guard actually made a model call to
refuse. A decline is cheap, not free, and the record says so.

## What is recorded per turn

Two records are written alongside the answer, for different readers.

**For you**, on the turn itself: how long it took, how many iterations it ran,
the readable step list, the entity and record citations, and the page you were
on.

**For audit**, a separate record: the model and prompt version used, the outcome,
duration, token and call counts, which collection was queried and how many rows
came back, every web search performed, and every sanitiser decision.

The sanitiser entries are content-free by construction — operation names,
collection names and counts. Never filter values, never record data.

::: tip The prompt version is the useful field
"Why did this answer change?" is usually answered by the model and prompt
version recorded on the turn, not by anything in the data.
:::

## Watching a turn run

The panel subscribes to a live progress stream before the message is even sent,
so nothing emitted early is missed.

Three properties make it reliable rather than decorative:

- **Events are buffered.** A subscriber that arrives late — a reconnect, a slow
  page — is replayed what it missed.
- **A finished run stays available briefly.** An immediate reconnect after
  completion gets a clean close rather than an error.
- **The stream is progress only.** The answer itself comes back on the request.
  Losing the stream costs you the live steps, never the result.

## Cancelling and preempting

| Action | Effect |
| --- | --- |
| **Stop** | Cancels the running turn; recorded as cancelled, not failed |
| **Send another message** | Cancels the running turn and starts yours |
| **Close the panel** | Nothing — the turn continues |
| **Navigate away** | Nothing — the turn continues |
| **Lose connection** | Nothing — the turn continues and is saved |

The last three matter more than they look. A turn runs detached from the
request that started it, so a browser event cannot abort work that is nearly
done. The answer is persisted regardless, and reopening the session shows it.

## Every way a turn can end

| Outcome | What you see |
| --- | --- |
| **Success** | The answer |
| **Awaiting input** | A clarifying question |
| **Declined** | A polite explanation — out of domain, or out of tenant scope |
| **Refused** | AI is off for the organisation, or you have no entitlement |
| **Cancelled** | Recorded as cancelled |
| **Error** | An explanation of what was attempted |
| **Unavailable** | The knowledge base is not ready; a repair has been triggered |

An exhausted iteration budget produces the **error** outcome with a narrative —
what it tried and why it stopped — rather than a generic failure.

## Degraded states

| State | Effect on chat |
| --- | --- |
| Knowledge graph unreadable, previous copy good | Works, flagged **degraded** |
| Vector store missing, previous copy present | Works, on the previous copy |
| Either genuinely missing | Declines; repair sync triggered automatically |
| Knowledge base missing **and** you attached a file | The file is still answered |

That last row is deliberate: a question about an attached document does not need
the knowledge base, so it still works when the rest of chat does not.

Repair syncs are rate-limited, so a wave of requests during an outage triggers
one sync rather than a queue. Progress appears on the
[job status](/work/recycle-bin) page.

Document indexing has its own recovery: a job stuck too long is picked up and
marked failed rather than sitting in progress forever, and can be re-run.

## Feedback

A thumbs up or down on a turn is stored against it, and captures a snapshot of
that turn — the prompt, the response, its citations, and the model and prompt
version — for evaluation.

The snapshot is best-effort and never blocks or undoes the feedback itself.

## Where to look when something is wrong

| Symptom | Look at |
| --- | --- |
| "It says it is updating its knowledge" | [Data setup](/admin/data-setup) and the sync jobs |
| Answers use column names, not business names | Schema curation — descriptions and synonyms |
| A count disagrees with the log page | It should not; check the module's view permissions |
| A document cannot be selected in chat | Its indexing status in [Drive](/work/documents) |
| Nothing AI appears at all | The organisation's AI access switch |
| Insights missing for one person only | Their profile's AI insights switch |
| The workbench has no fifth KPI card | AI is off for the organisation |

## Related

- [Grounding & retrieval](/ai/grounding) — degraded knowledge-base states in depth.
- [Guardrails & permissions](/ai/guardrails) — what the sanitiser records.
- [The reasoning loop](/ai/reasoning-loop) — where the budgets apply.
- [Job status](/work/recycle-bin) — sync and indexing jobs.
