---
layout: home
description: "Exto documentation — commissioning, modules, masters and the setup behind them."
hero:
  name: Exto Docs
  text: From installed to handed over.
  tagline: Tracking assets through commissioning, quality and sign-off — and the evidence that proves it.
  actions:
    - theme: brand
      text: What is Exto?
      link: /introduction
    - theme: alt
      text: Commissioning
      link: /cx/
    - theme: alt
      text: Recipes
      link: /recipes/
features:
  - icon: 🧩
    title: Recipes
    details: "One question, one answer: how do I approve a record, close a stage, generate a handover pack."
    link: /recipes/
  - icon: 🏗
    title: Commissioning
    details: Assets down, stages across. Checklists, gates, dates and the handover pack at the end.
    link: /cx/
  - icon: 🗂
    title: Modules & masters
    details: The things you track, the shared lists they point at, and a record's journey from draft to close.
    link: /modules/
  - icon: 📋
    title: Using Exto
    details: Find the work that is yours, fill it in, move it on, and find out later what happened.
    link: /work/
  - icon: 📐
    title: Designers
    details: Four designers — module, workflow, analytics and workbench. Configure, don't code.
    link: /build/
  - icon: 🔧
    title: Setup & configuration
    details: Deploy a module to a project, and wire it into the menu so people can reach it.
    link: /setup/
  - icon: 🏢
    title: Projects & workspaces
    details: Where work lives, and how the hierarchy decides who can see it.
    link: /projects/
  - icon: 🔐
    title: Access control
    details: Four layers decide who can do what — and they all look the same when one says no.
    link: /access/
  - icon: ✨
    title: AI
    details: Ask questions of your data, attach documents, and read what it makes of a record.
    link: /ai/
  - icon: 🔌
    title: Integrations
    details: Call another system when a field changes, or tell one when a record is approved.
    link: /integrations/
  - icon: 👤
    title: Account
    details: Sign in, switch tenant, and set your date format and theme.
    link: /account/signing-in
  - icon: 🧱
    title: Architecture
    details: For people who build Exto — its layers, engines and how a feature is composed.
    link: /architecture/
---

## Where to start

| You | Start at |
| --- | --- |
| **Commissioning** an asset — working checks, recording results | [Commissioning](/cx/) |
| **Doing the work** — filling forms, approving, inspecting | [Using Exto](/work/) |
| **Designing** — modules, workflows, dashboards | [Designers](/build/) |
| **Setting up** — deploying modules, menus, dashboards | [Setup & configuration](/setup/) |
| **Administering** — projects, groups, who sees what | [Administering](/admin/) |
| **Just signed in** and not sure what you are looking at | [Quick start](/getting-started/quick-start) |

## The five things worth understanding

Everything else in these docs assumes these.

| | |
| --- | --- |
| **A module** is a type of thing you track. It owns its fields, its forms, and the workflow its records follow. [→](/modules/) |
| **A record** moves through workflow steps. Saving keeps it where it is; an **action** moves it on. [→](/modules/record-lifecycle) |
| **A master** is a shared list other records point at, maintained by the business rather than by a designer. [→](/masters/) |
| **The CX matrix** puts stages across and assets down, with one unit of commissioning at every crossing. [→](/cx/matrix) |
| **Four layers** decide access, and a refusal from any one looks identical. [→](/concepts/permissions) |

## When something is missing

Most "it's broken" turns out to be one of these. In rough order of likelihood:

| Symptom | Usually |
| --- | --- |
| A colleague cannot find the record you finished | You **saved** it; you did not **submit** it |
| Nothing looks right at all | Wrong [tenant](/account/tenants) |
| A module is missing from the sidebar | A [group grant](/admin/groups), or no [menu entry](/menu/) |
| The module opens but the list is empty | **View all records**, or nothing is on your step |
| You can see a record but there are no buttons | It is on somebody else's step |
| A commissioning stage will not close | A [gate](/cx/gates), not a permission |

[Diagnosing "I can't see it"](/recipes/cant-see-it) walks through it properly.
