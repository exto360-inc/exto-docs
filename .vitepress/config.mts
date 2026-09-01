import { defineConfig } from 'vitepress';

/**
 * Lanes, not a flat tree.
 *
 * Ten sidebar groups matching the ten cards on the landing page: a reader picks
 * a lane on the home page and the sidebar keeps them in it. Derived from the
 * product's shipped routes rather than from a topic list, which is how my-tasks,
 * webhooks, reports and documents earned places.
 */
export default defineConfig({
  title: 'Exto Docs',
  description: 'Build modules, forms and workflows — and follow a record through them.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: 'Getting started', link: '/getting-started/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'Working in Exto', link: '/work/' },
      { text: 'Building', link: '/build/' },
      { text: 'Recipes', link: '/recipes/' },
      { text: 'Architecture', link: '/architecture/' },
    ],
    sidebar: {
      '/architecture/': [
        { text: 'Application architecture', collapsed: false, items: [
          { text: 'Overview', link: '/architecture/' },
          { text: 'The web client', link: '/architecture/web-client' },
          { text: 'API layers', link: '/architecture/api-layers' },
          { text: 'The data model', link: '/architecture/data-model' },
          { text: 'The form engine', link: '/architecture/form-engine' },
          { text: 'The workflow engine', link: '/architecture/workflow-engine' },
          { text: 'Records & audit', link: '/architecture/records-and-audit' },
        ] },
        { text: 'Feature architecture', collapsed: false, items: [
          { text: 'Module designer', link: '/architecture/module-designer' },
          { text: 'CX designer', link: '/architecture/cx-designer' },
          { text: 'CX execution', link: '/architecture/cx-execution' },
        ] },
      ],
      '/': [
      { text: 'Getting started', collapsed: false, items: [
        { text: 'Overview', link: '/getting-started/' },
        { text: 'Your first module', link: '/getting-started/first-module' },
        { text: 'Your first workflow', link: '/getting-started/first-workflow' },
      ] },
      { text: 'Core concepts', collapsed: true, items: [
        { text: 'Overview', link: '/concepts/' },
        { text: 'Modules & records', link: '/concepts/modules-and-records' },
        { text: 'Workflows & versions', link: '/concepts/workflows-and-versions' },
        { text: 'Permissions', link: '/concepts/permissions' },
        { text: 'Projects & spaces', link: '/concepts/projects-and-spaces' },
        { text: 'Masters', link: '/concepts/masters' },
      ] },
      { text: 'Working in Exto', collapsed: true, items: [
        { text: 'Overview', link: '/work/' },
        { text: 'Finding work', items: [
          { text: 'My tasks', link: '/work/my-tasks' },
          { text: 'Record list', link: '/work/record-list' },
          { text: 'Views', link: '/work/views' },
        ] },
        { text: 'Working a record', items: [
          { text: 'Record detail', link: '/work/record-detail' },
          { text: 'Record widgets', link: '/work/record-widgets' },
          { text: 'Taking actions', link: '/work/taking-actions' },
          { text: 'Workflow progress', link: '/work/workflow-progress' },
          { text: 'Editing in the grid', link: '/work/grid-editing' },
          { text: 'History', link: '/work/history' },
        ] },
        { text: 'Reference data', items: [
          { text: 'Master data', link: '/work/masters' },
          { text: 'Hierarchical masters', link: '/work/hierarchical-masters' },
          { text: 'Importing & exporting', link: '/work/import-export' },
        ] },
        { text: 'Files & output', items: [
          { text: 'Documents', link: '/work/documents' },
          { text: 'Photos', link: '/work/photos' },
          { text: 'Reports', link: '/work/reports' },
          { text: 'Recycle bin & jobs', link: '/work/recycle-bin' },
        ] },
      ] },
      { text: 'Building', collapsed: true, items: [
        { text: 'Overview', link: '/build/' },
        { text: 'Module designer', link: '/build/module-designer' },
        { text: 'Module builder', link: '/build/module-builder' },
        { text: 'Forms', link: '/build/forms' },
        { text: 'Field types', link: '/build/field-types' },
        { text: 'Rules & validations', link: '/build/rules' },
        { text: 'Workflows', link: '/build/workflows' },
        { text: 'Steps & actions', link: '/build/steps-and-actions' },
        { text: 'Conditions', link: '/build/conditions' },
        { text: 'Publishing & versions', link: '/build/publishing' },
        { text: 'Tables & data sets', link: '/build/tables-and-datasets' },
        { text: 'Reference tables', link: '/build/reference-tables' },
        { text: 'Log page views', link: '/build/log-page-views' },
        { text: 'Checklists', link: '/build/checklists' },
        { text: 'Dashboards & reports', link: '/build/dashboards' },
      ] },
      { text: 'CX workbench', collapsed: true, items: [
        { text: 'Overview', link: '/cx/' },
        { text: 'Understanding it', items: [
          { text: 'Concepts', link: '/cx/concepts' },
        ] },
        { text: 'Setting it up', items: [
          { text: 'Designing a workbench', link: '/cx/designer' },
          { text: 'Levels & stages', link: '/cx/levels-and-stages' },
          { text: 'Gates & dependencies', link: '/cx/gates' },
          { text: 'Stage templates', link: '/cx/stage-templates' },
          { text: 'The asset registry', link: '/cx/assets' },
          { text: 'Dates & scheduling', link: '/cx/dates' },
        ] },
        { text: 'Running it', items: [
          { text: 'The commissioning matrix', link: '/cx/matrix' },
          { text: 'Completing a cell', link: '/cx/completing-a-cell' },
          { text: 'Documents', link: '/cx/documents' },
          { text: 'Handover', link: '/cx/handover' },
        ] },
      ] },
      { text: 'Administration', collapsed: true, items: [
        { text: 'Overview', link: '/admin/' },
        { text: 'Workspaces', link: '/admin/workspaces' },
        { text: 'Projects', link: '/admin/projects' },
        { text: 'Spaces', link: '/admin/spaces' },
        { text: 'Users', link: '/admin/users' },
        { text: 'Groups & permissions', link: '/admin/groups' },
        { text: 'Menu configuration', link: '/admin/menu' },
        { text: 'Settings', link: '/admin/settings' },
        { text: 'Data setup', link: '/admin/data-setup' },
      ] },
      { text: 'Integrations', collapsed: true, items: [
        { text: 'Overview', link: '/integrations/' },
        { text: 'External services', link: '/integrations/external-services' },
        { text: 'Webhooks', link: '/integrations/webhooks' },
      ] },
      { text: 'AI', collapsed: true, items: [
        { text: 'Overview', link: '/ai/' },
        { text: 'Assistant', link: '/ai/assistant' },
        { text: 'Record insights', link: '/ai/insights' },
        { text: 'AI form builder', link: '/ai/form-builder' },
      ] },
      { text: 'Account', collapsed: true, items: [
        { text: 'Signing in', link: '/account/signing-in' },
        { text: 'Choosing a tenant', link: '/account/tenants' },
        { text: 'Your profile', link: '/account/profile' },
      ] },
      { text: 'Recipes', collapsed: true, items: [
        { text: 'Overview', link: '/recipes/' },
        { text: 'An approval workflow', link: '/recipes/approval-workflow' },
        { text: 'Onboarding a project team', link: '/recipes/onboard-a-team' },
        { text: 'Connecting an external system', link: '/recipes/connect-a-system' },
        { text: "Diagnosing \"I can't see it\"", link: '/recipes/cant-see-it' },
      ] },
      ],
    },
  },
});
