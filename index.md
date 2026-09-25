---
layout: home
description: "The Exto product manual — the system of record for operational readiness."
hero:
  name: Exto
  text: One platform. Every asset. From first install to final handover.
  tagline: The system of record for operational readiness — every asset, every check, every signature, and the evidence behind them, in one place.
  actions:
    - theme: brand
      text: Start here
      link: /introduction
    - theme: alt
      text: Commissioning (CX)
      link: /cx/
    - theme: alt
      text: Recipes
      link: /recipes/
---
<div class="x-home">

## What Exto is

Exto tracks **operational readiness** — getting installed equipment from *it is
on site* to *it has been proven and handed over*, with the evidence to show for
it. Two screens carry most of the product.

<div class="x-two">
  <div class="x-two-col">
    <h3>The commissioning portal</h3>
    <p>Every crossing of an asset and a stage is one unit of work: a checklist to
    complete on one piece of equipment at one point in its commissioning. The
    bands above the columns group stages into <strong>levels</strong>, each with
    its own roll-up, and the counters along the top filter the whole grid to
    what is due, overdue, blocked or done.</p>
    <div class="x-keys">
      <span class="x-key x-key-green">Complete</span>
      <span class="x-key x-key-amber">In progress</span>
      <span class="x-key x-key-red">Blocked</span>
      <span class="x-key x-key-grey">Not started</span>
    </div>
    <a class="x-two-go" href="/cx/matrix">The commissioning matrix →</a>
  </div>
  <div class="x-two-col">
    <h3>Records and their workflows</h3>
    <p>Everything that is not a commissioning crossing is a <strong>record</strong>
    — an issue, an inspection, a punch item — moving through a workflow. Each one
    can show its own journey: the steps it took, who took them, and how long each
    one held it, as a timeline or as a diagram.</p>
    <a class="x-two-go" href="/work/workflow-progress">Workflow progress →</a>
  </div>
</div>

## Start from what you are doing

<div class="x-roles">
  <a class="x-role" href="/cx/">
    <span class="x-role-k">On site</span>
    <span class="x-role-t">I am commissioning assets</span>
    <span class="x-role-b">Open the workbench, find your assets and stages, record checklist results, and close out to handover.</span>
    <span class="x-role-go">Commissioning →</span>
  </a>
  <a class="x-role" href="/work/">
    <span class="x-role-k">Day to day</span>
    <span class="x-role-t">I am filling in and approving records</span>
    <span class="x-role-b">Find the work assigned to you, complete the form, submit or approve it, and track where it went.</span>
    <span class="x-role-go">Using Exto →</span>
  </a>
  <a class="x-role" href="/build/">
    <span class="x-role-k">Designing</span>
    <span class="x-role-t">I am building modules and workflows</span>
    <span class="x-role-b">Define fields and tables, lay out forms, draw the workflow, add rules, and publish a version.</span>
    <span class="x-role-go">Designers →</span>
  </a>
  <a class="x-role" href="/setup/">
    <span class="x-role-k">Rolling out</span>
    <span class="x-role-t">I am deploying it to a project</span>
    <span class="x-role-b">Attach a module to a project, add it to the menu, and set up the dashboards people land on.</span>
    <span class="x-role-go">Setup →</span>
  </a>
  <a class="x-role" href="/admin/">
    <span class="x-role-k">Administering</span>
    <span class="x-role-t">I run projects and access</span>
    <span class="x-role-b">Create projects and workspaces, assign users, grant groups — and see why a refusal from any layer looks identical.</span>
    <span class="x-role-go">Projects &amp; access →</span>
  </a>
  <a class="x-role" href="/getting-started/quick-start">
    <span class="x-role-k">First time</span>
    <span class="x-role-t">I just signed in and I am lost</span>
    <span class="x-role-b">What the sidebar is, what a module is, and the difference between saving and submitting.</span>
    <span class="x-role-go">Quick start →</span>
  </a>
</div>

## How a module reaches the people who use it

Almost everything in Exto follows this path. Where you join it depends on your role.

<DFlow
  numbered
  dir="right"
  :steps="[
    { title: 'Design',  body: 'Fields, tables, forms, workflow steps and rules.', note: 'Module designer' },
    { title: 'Publish', body: 'A version becomes active. Older versions keep running.', note: 'Workflows' },
    { title: 'Deploy',  body: 'Attach the module to a project and put it on the menu.', note: 'Setup' },
    { title: 'Capture', body: 'People create records and complete the form.', note: 'Everyone' },
    { title: 'Move on', body: 'An action advances the record to the next step.', note: 'Workflow' },
    { title: 'Report',  body: 'Dashboards, exports and handover packages.', note: 'Analytics' },
  ]"
/>

## The six things worth understanding

Everything else in these docs assumes these six.

<div class="x-concepts">
  <a class="x-concept" href="/modules/">
    <span class="x-concept-n">1</span>
    <span class="x-concept-t">A module is a type of thing you track</span>
    <span class="x-concept-b">Issues, inspections, punch items. It owns its fields, its forms, and the workflow its records follow.</span>
  </a>
  <a class="x-concept" href="/modules/record-lifecycle">
    <span class="x-concept-n">2</span>
    <span class="x-concept-t">A record moves through steps</span>
    <span class="x-concept-b">Saving keeps it where it is. An <strong>action</strong> is what moves it on — and hands it to somebody else.</span>
  </a>
  <a class="x-concept" href="/projects/">
    <span class="x-concept-n">3</span>
    <span class="x-concept-t">Work lives in a project</span>
    <span class="x-concept-b">Tenant → workspace → project → space. The level a thing sits at decides who can reach it.</span>
  </a>
  <a class="x-concept" href="/masters/">
    <span class="x-concept-n">4</span>
    <span class="x-concept-t">A master is a shared list</span>
    <span class="x-concept-b">Contractors, systems, disciplines. Maintained by the business rather than by a designer.</span>
  </a>
  <a class="x-concept" href="/cx/matrix">
    <span class="x-concept-n">5</span>
    <span class="x-concept-t">The CX matrix crosses stages with assets</span>
    <span class="x-concept-b">Stages across the top, assets down the side. Every crossing is one unit of commissioning work.</span>
  </a>
  <a class="x-concept" href="/concepts/permissions">
    <span class="x-concept-n">6</span>
    <span class="x-concept-t">Four layers decide access</span>
    <span class="x-concept-b">Role, project, group grant and workflow step. A refusal from any one of them looks identical.</span>
  </a>
</div>

## When something looks wrong

Most "it's broken" turns out to be one of these, in rough order of likelihood.

| Symptom | Usually |
| --- | --- |
| A colleague cannot find the record you finished | You **saved** it; you did not **submit** it |
| Nothing looks right at all | Wrong [tenant](/account/tenants) |
| A module is missing from the sidebar | A [group grant](/admin/groups), or no [menu entry](/menu/) |
| The module opens but the list is empty | You are on a filtered [view](/work/views), or nothing is on your step |
| You can see a record but there are no buttons | It is sitting on somebody else's step |
| A commissioning stage will not close | A [gate](/cx/gates), not a permission |

[Diagnosing "I can't see it"](/recipes/cant-see-it) walks through it properly.

## Also in here

<div class="x-more">
  <a class="x-m" href="/analytics/dashboard-builder"><strong>Dashboard builder</strong><span>Widgets, data sets and the dashboards people land on.</span></a>
  <a class="x-m" href="/admin/projects"><strong>Creating a project</strong><span>The form, the schedule, and the four tabs on an existing project.</span></a>
  <a class="x-m" href="/menu/"><strong>Menu configuration</strong><span>What appears in the sidebar, for whom, and in what order.</span></a>
  <a class="x-m" href="/ai/"><strong>AI</strong><span>Ask questions of your data and read what it makes of a record.</span></a>
  <a class="x-m" href="/integrations/"><strong>Integrations</strong><span>Call another system on a change, or be called by one.</span></a>
  <a class="x-m" href="/account/signing-in"><strong>Your account</strong><span>Signing in, switching tenant, date format and theme.</span></a>
  <a class="x-m" href="/architecture/"><strong>Architecture</strong><span>For people who build Exto — its layers and how a feature is composed.</span></a>
</div>

</div>
