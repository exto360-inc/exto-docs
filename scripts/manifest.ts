/**
 * Capture manifest — one entry per <Shot> / <Clip> placeholder in the docs.
 *
 * `id` IS the placeholder's src, so `<Shot src="work/my-tasks" />` is satisfied
 * by the entry with id 'work/my-tasks'. Nothing else needs to agree.
 *
 * Fields:
 *   url        route to open, relative to the app's origin
 *   prep       optional clicks/waits to get the screen into the right state
 *   selector   crop to one element instead of the viewport
 *   themes     defaults to both
 *   settleMs   extra pause before the shot (animations, lazy grids)
 *   viewport   defaults to 1440×900
 *   unauth     capture signed out — for the sign-in page
 *   kind       'video' records a clip instead
 *
 * Routes marked TODO need an id from your tenant. Find one in the app, paste it
 * in, then verify with:  npm run capture -- --only <id> --headed
 */
import type { Page } from 'playwright';

export interface CaptureEntry {
  id: string;
  kind?: 'screenshot' | 'video';
  url: string;
  prep?: (page: Page) => Promise<void>;
  selector?: string;
  /** Capture a light/dark PAIR instead of one image. For heroes only. */
  themed?: boolean;
  settleMs?: number;
  viewport?: { width: number; height: number };
  unauth?: boolean;
  /** Selector whose text is real names — replaced with stable fakes. */
  scrub?: string;
  /** What kind of fake to use. Defaults to organisation names. */
  scrubAs?: 'org' | 'person';
  videoDurationMs?: number;
}

export const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Click something by its visible text, and don't fail the whole capture if the
 *  label has been renamed — the shot still lands, just on the wrong tab. */
const click = (label: string) => async (page: Page) => {
  await page.getByText(label, { exact: false }).first().click({ timeout: 4000 }).catch(() => {});
  await wait(700);
};

// ── Fill these in from your tenant, then the routes below resolve ──────────
const MODULE = 'ISSUE_PROJ';                                   // any module's name
const WORKBENCH = '6a88d76949f59290671a890d';             // Start up Project
const PROJECT  = 'jDC2I6';                                 // Commissioning Project 1
const WORKSPACE = 'vb6vX-6';                               // the DEFAULT workspace
const WORKFLOW = '6aaad40f033e3cadb3f4ba5c';               // ISSUE_PROJ v11 (active)
const RECORD  = '6aac3599113bdcb095c1f45d';                 // an approved System Issue

/** The matrix is a canvas, so a cell is a coordinate rather than an element.
 *  Click into the first data row's first stage column to open the side panel. */
const openFirstCell = async (page: Page) => {
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox().catch(() => null);
  if (box) await page.mouse.click(box.x + 900, box.y + 120);
  await wait(1500);
};

/** Open the tenant switcher — the button carrying the current tenant name at
 *  the very top of the sidebar. */
const openTenantSwitcher = async (page: Page) => {
  await page.locator('button, [role="button"]').filter({ hasText: /ORP Demo|Startup/ }).first()
    .click({ timeout: 5000 }).catch(() => {});
  await wait(1200);
};

/** Open the user menu — the avatar at the TOP RIGHT of the header — then its
 *  Account item, which opens the User Profile sheet. */
const openUserProfile = async (page: Page) => {
  // The avatar is the last control in the header strip; match its initials.
  const avatar = page.locator('header button, [data-slot="avatar"], button:has(> span)')
    .filter({ hasText: /^[A-Z]{1,3}$/ }).last();
  await avatar.click({ timeout: 5000 }).catch(() => {});
  await wait(1000);
  await page.getByRole('menuitem', { name: /account/i }).first()
    .click({ timeout: 5000 }).catch(() => {});
  await wait(1800);
};

/** Open the user menu, then hover its Theme submenu so the palette list shows. */
const openThemeMenu = async (page: Page) => {
  const avatar = page.locator('header button, [data-slot="avatar"], button:has(> span)')
    .filter({ hasText: /^[A-Z]{1,3}$/ }).last();
  await avatar.click({ timeout: 5000 }).catch(() => {});
  await wait(900);
  // A radix submenu opens on hover of its trigger.
  await page.getByText('Theme', { exact: true }).first().hover({ timeout: 5000 }).catch(() => {});
  await wait(1200);
};

/**
 * Several surfaces are slide-over PANELS opened from the header icons, not
 * routes — My Tasks, Job Status and the AI Assistant among them. Visiting their
 * URL renders the same grid full-width, which is not what a user ever sees.
 * Each is opened by its icon's aria-label.
 */
const openPanel = (label: string) => async (page: Page) => {
  await page.getByRole('button', { name: label, exact: false }).first()
    .click({ timeout: 6000 }).catch(() => {});
  await wait(2200);
};

/** Open the View settings popover — the button labelled exactly "View" at the
 *  right of the filter bar, not one of the "… View" tabs beside it. */
const openViewSettings = async (page: Page) => {
  await page.getByRole('button', { name: 'View', exact: true }).first()
    .click({ timeout: 6000 })
    .catch(async () => {
      await page.locator('button').filter({ hasText: /^\s*View\s*$/ }).last()
        .click({ timeout: 4000 }).catch(() => {});
    });
  await wait(1500);
};

/**
 * The record screens need an actual record open. Rather than hard-coding an id
 * that rots, click the first record link in the grid — the grid is sorted, so
 * the same record comes up each run and the shot stays stable.
 */
const openFirstRecord = async (page: Page) => {
  // AG Grid renders the record number as a styled span with a click handler,
  // not an anchor — so match the text rather than the element type.
  await page.getByText(/^[A-Z]{2,4}-\d+$/).first()
    .click({ timeout: 8000 })
    .catch(async () => {
      await page.locator('.ag-center-cols-container .ag-row').first()
        .locator('.ag-cell').nth(2).click({ timeout: 5000 }).catch(() => {});
    });
  await wait(3000);
};

/**
 * Open a record, then one of its sidebar widgets by label.
 *
 * The rail's icons carry an `aria-label`, not a `title`. Matching on `title`
 * silently found nothing, the catch swallowed it, and every widget shot came
 * out as whatever the panel already showed — the Insights rail.
 */
const openRecordWidget = (label: string) => async (page: Page) => {
  await page.waitForTimeout(3000);   // the widget rail mounts after the form
  const direct = page.getByRole('button', { name: label, exact: true }).first();
  if (await direct.count().catch(() => 0)) {
    await direct.click({ timeout: 5000 }).catch(() => {});
  } else {
    // Only four icons fit on the rail; the rest fold behind "More widgets".
    await page.getByRole('button', { name: 'More widgets', exact: true }).first()
      .click({ timeout: 5000 }).catch(() => {});
    await wait(1000);
    await page.getByText(label, { exact: true }).first()
      .click({ timeout: 5000 }).catch(() => {});
  }
  await wait(3000);
};

/** Open the Workflow widget, then one of its two views. */
const openProgress = (view?: 'Timeline' | 'Graphical', fullScreen = false) => async (page: Page) => {
  await openRecordWidget('Workflow')(page);
  if (view) {
    await page.getByText(view, { exact: true }).first().click({ timeout: 5000 }).catch(() => {});
    await wait(2500);
  }
  if (fullScreen) await maximizeProgress(page);
};

/**
 * Take the progress panel full screen.
 *
 * Two different expanders sit near each other and only one is the right one.
 * The rail's "Expand panel" widens the record sidebar; the progress panel's own
 * Maximize2 makes it take over the window. The latter has no accessible name,
 * so it is found as the rightmost narrow icon button in the panel's header
 * band — narrow enough to exclude the TB / LR direction toggles below it.
 */
const maximizeProgress = async (page: Page) => {
  const btns = page.locator('button');
  const n = await btns.count();
  let best = -1, bestX = -1;
  for (let i = 0; i < n; i++) {
    const bb = await btns.nth(i).boundingBox().catch(() => null);
    if (!bb || bb.y < 180 || bb.y > 240 || bb.x < 900 || bb.width > 40) continue;
    if (bb.x > bestX) { bestX = bb.x; best = i; }
  }
  if (best >= 0) await btns.nth(best).click({ timeout: 4000 }).catch(() => {});
  await wait(3500);
};

/** Open the CX Visual Insights panel — the fifth KPI card, present only when
 *  AI is enabled for the tenant. */
const openCxInsights = async (page: Page) => {
  await page.getByText('Visual Insights', { exact: false }).first()
    .click({ timeout: 6000 }).catch(() => {});
  await wait(2500);
};

/** Click a step on the workflow canvas so its properties panel opens. */
const clickNode = (label: string) => async (page: Page) => {
  await page.getByText(label, { exact: true }).first()
    .click({ timeout: 6000 }).catch(() => {});
  await wait(1500);
};

/**
 * The Forms tab is a LIST of forms — one row per form. The designer everyone
 * means by "form designer" is one level in: click the form, and the Form
 * Builder opens with the field palette on the left and the canvas on the right.
 * Capturing the URL alone gets the list, which is not the screen being
 * documented.
 */
const openFormBuilder = (tab?: string) => async (page: Page) => {
  await page.getByText('Issue Form', { exact: false }).first()
    .click({ timeout: 8000 }).catch(() => {});
  await wait(3200);
  if (tab) {
    await page.getByRole('tab', { name: tab, exact: false }).first()
      .click({ timeout: 4000 })
      .catch(async () => {
        await page.getByText(tab, { exact: true }).first()
          .click({ timeout: 3000 }).catch(() => {});
      });
    await wait(2000);
  }
};

/**
 * React Flow opens the workflow at its stored viewport, which on a wide canvas
 * leaves the chain as a thin strip near the bottom of the frame. The fit-view
 * control centres and scales it to fill the shot.
 */
const fitCanvas = async (page: Page) => {
  await wait(1800);
  await page.locator('.react-flow__controls-fitview').first()
    .click({ timeout: 4000 })
    .catch(async () => {
      await page.locator('.react-flow__controls button').last()
        .click({ timeout: 3000 }).catch(() => {});
    });
  await wait(1800);
};

/**
 * SSM and Gantt both open with a single root asset and everything below it
 * collapsed, which makes for a picture of one box.
 *
 * They expand by different means, because they are different renderers. The
 * Gantt's rows are DOM, and the shared CX context menu offers "Expand All" on
 * a right-click of the name column. The SSM flow chart is drawn to a canvas —
 * its chevrons are hit-tested coordinates, not elements — and it deliberately
 * clears its persisted expansion on mount, so neither a click nor a seeded
 * localStorage entry will do. What it does have is an auto-expand when a
 * search matches: CxFlowView unfolds the matched nodes' parents as long as the
 * result set is under CX_FLOW_MAX_AUTO_EXPAND. So the SSM shot searches.
 */
const expandGantt = async (page: Page) => {
  await page.getByText('Gantt', { exact: true }).first().click({ timeout: 6000 }).catch(() => {});
  await wait(4500);
  await page.locator('span.truncate.cursor-pointer').first()
    .click({ button: 'right', timeout: 6000 }).catch(() => {});
  await wait(1000);
  await page.getByText('Expand All', { exact: true }).first()
    .click({ timeout: 4000 }).catch(() => {});
  await wait(5000);
};

const expandSsm = async (page: Page) => {
  await page.getByText('SSM', { exact: true }).first().click({ timeout: 6000 }).catch(() => {});
  await wait(3500);
  await page.getByPlaceholder('Search assets', { exact: false }).first()
    .fill('DC').catch(() => {});
  await wait(5000);
};

/** The largest canvas on the page — the CX grid. Its index shifts once a side
 *  panel mounts, so it is found by size rather than by position. */
const gridCanvas = async (page: Page) => {
  const n = await page.locator('canvas').count();
  for (let i = 0; i < n; i++) {
    const bb = await page.locator('canvas').nth(i).boundingBox().catch(() => null);
    if (bb && bb.width > 300 && bb.height > 200) return bb;
  }
  return null;
};

/**
 * The CX grid opens showing the single root asset — "1 rows · 1 visible" —
 * with the whole hierarchy folded beneath it. Every shot of the matrix was
 * therefore a picture of one row.
 *
 * The grid is drawn to a canvas, so there is no row element to click. What
 * there is, is the shared CX context menu: right-click the name column and
 * "Expand All" unfolds the subtree (CxWorkbench routes it to expandChildren).
 * y+70 lands on the first data row, below the two header bands.
 */
const expandMatrix = async (page: Page) => {
  await wait(2500);
  const box = await gridCanvas(page);
  if (!box) return;
  await page.mouse.click(box.x + 100, box.y + 70, { button: 'right' });
  await wait(1000);
  await page.getByText('Expand All', { exact: true }).first()
    .click({ timeout: 4000 }).catch(() => {});
  await wait(5000);
};

/** Expand, then click a stage cell on a leaf asset to open its detail panel. */
const openCell = async (page: Page) => {
  await expandMatrix(page);
  const box = await gridCanvas(page);
  if (box) await page.mouse.click(box.x + 600, box.y + 350);
  await wait(3500);
};

/**
 * Open the cell panel and scroll it down to the checklist rows.
 *
 * Not a click on the "Checklist" heading — that heading is a disclosure
 * toggle, so clicking it collapses the very table the shot exists to show.
 */
const openChecklist = async (page: Page) => {
  await openCell(page);
  await page.mouse.move(1040, 600);
  await page.mouse.wheel(0, 430);
  await wait(2200);
};

/**
 * The CX project settings panel — Stage Configurations, Registry, Dates, Rules.
 *
 * Its trigger is the Settings2 icon at the right of the workbench header. That
 * button carries a tooltip but no accessible name and no title attribute, so
 * there is nothing to match on: it is found as the last small icon button in
 * the header band instead.
 */
const openWorkbenchSettings = (tab: string) => async (page: Page) => {
  await wait(2500);
  const btns = page.locator('button');
  const n = await btns.count();
  let last = -1;
  for (let i = 0; i < n; i++) {
    const bb = await btns.nth(i).boundingBox().catch(() => null);
    if (bb && bb.y > 70 && bb.y < 125 && bb.x > 1200 && bb.width < 40) last = i;
  }
  if (last >= 0) await btns.nth(last).click({ timeout: 5000 }).catch(() => {});
  await wait(2500);
  await page.getByText(tab, { exact: true }).first().click({ timeout: 5000 }).catch(() => {});
  await wait(3000);
};

/**
 * An asset's property panel — a different panel from the stage cell's.
 *
 * Clicking a STAGE cell opens that cell's record form. Clicking the asset's
 * NAME, in the frozen left column, opens the asset itself: General, Stages,
 * Predecessors, Documents, URLs and Notes, plus a tab per linked or gating
 * module. x+160 lands inside the name column, clear of the row checkbox.
 */
const openAssetPanel = (tab?: string) => async (page: Page) => {
  await expandMatrix(page);
  const box = await gridCanvas(page);
  if (box) await page.mouse.click(box.x + 160, box.y + 250);
  await wait(3500);
  if (tab) {
    await page.getByText(tab, { exact: true }).last().click({ timeout: 5000 }).catch(() => {});
    await wait(3000);
  }
};

/**
 * A master grid's inline cell editor — the Excel-like part.
 *
 * Master rows arrive late: /master-records/<code> paints its chrome, its column
 * headers and an empty body long before the rows land, which is how the old
 * shots came out as empty grids at settleMs 1200. Six seconds, then a
 * double-click on a cell that actually has text in it.
 */
const editMasterCell = async (page: Page) => {
  await wait(6500);
  // Scan every row, not just the first — a master can carry blank rows, and
  // double-clicking one of those opens an editor on nothing.
  const cells = page.locator('.ag-center-cols-container .ag-cell');
  const n = await cells.count().catch(() => 0);
  for (let i = 0; i < n; i++) {
    const t = (await cells.nth(i).innerText().catch(() => '')).trim();
    if (t.length > 2) { await cells.nth(i).dblclick({ timeout: 5000 }).catch(() => {}); break; }
  }
  await wait(2200);
};

export const manifest: CaptureEntry[] = [
  // ── Account ──────────────────────────────────────────────────────────────
  // NOT captured. /login is the Console hand-off: locally it falls through to
  // the legacy /login-v1 form, so capturing it overwrites the real Exto ID page
  // with the wrong one. The image is supplied by hand — see README.
  // { id: 'account/login', url: '/login', unauth: true },
  // The switcher is the tenant button at the TOP OF THE SIDEBAR, not /multitenant.
  // Its list is literally a list of customers, so the names are scrubbed.
  { id: 'account/tenant-picker', url: '/my-tasks', settleMs: 1500,
    prep: openTenantSwitcher, scrub: '[role="dialog"], [role="menu"], [data-radix-popper-content-wrapper]' },
  // The profile is a sheet opened from the user menu, not a route. Only the
  // identity rail is scrubbed — scrubbing the whole sheet would destroy the
  // setting labels the page is about.
  // The menu header carries the signed-in user's display name. Scrub only that
  // label — the theme names live in the submenu and must survive.
  { id: 'account/theme', url: '/my-tasks', settleMs: 1500, prep: openThemeMenu,
    scrubAs: 'person', scrub: '[data-slot="dropdown-menu-label"]' },
  { id: 'account/profile', url: '/my-tasks', settleMs: 1500,
    prep: openUserProfile, scrubAs: 'person',
    scrub: '[role="dialog"] dl dd, [role="dialog"] p.text-sm.font-semibold' },

  // ── Getting started ──────────────────────────────────────────────────────
    { id: 'getting-started/quick-start', url: '/projects', prep: openPanel('My Tasks'), settleMs: 2500 },
  { id: 'getting-started/new-module', url: '/settings/module-designer', settleMs: 1200 },
  { id: 'getting-started/first-workflow', url: `/settings/module-designer/${MODULE}/workflows?wf=${WORKFLOW}`,
    prep: fitCanvas, settleMs: 3000, viewport: { width: 1440, height: 620 } },

  // ── Working in Exto ──────────────────────────────────────────────────────
  { id: 'work/my-tasks', url: '/projects', prep: openPanel('My Tasks'), settleMs: 2500 },
  { id: 'work/record-list', url: `/mod/${MODULE}`, settleMs: 1500 },
  // The View settings popover — fields, group by, slice by, hierarchy, save.
  // Matching 'View' loosely hits "Default View" first and merely switches tab,
  // so this targets the settings button by its exact label.
  { id: 'work/views', url: `/mod/${MODULE}`, settleMs: 2000, prep: openViewSettings },
  { id: 'work/grid-editing', url: `/mod/${MODULE}`, settleMs: 1500 },
  { id: 'work/record-detail', url: `/mod/${MODULE}/record-v2/${RECORD}`, settleMs: 3500 },
  { id: 'work/record-widgets', url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openRecordWidget('Comments'), settleMs: 3500 },
  { id: 'work/workflow-progress',   url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openProgress('Graphical'),       settleMs: 3000 },
  { id: 'work/workflow-timeline',   url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openProgress('Timeline'),        settleMs: 3000 },
  { id: 'work/workflow-fullscreen', url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openProgress('Graphical', true), settleMs: 3000 },
  { id: 'work/workflow-timeline-full', url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openProgress('Timeline', true), settleMs: 3000 },
  { id: 'work/history', url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openRecordWidget('History'), settleMs: 3500 },
  { id: 'work/action-sheet', url: `/mod/${MODULE}/record-v2/${RECORD}`,
    prep: openRecordWidget('Actions'), settleMs: 3500 },
  { id: 'work/master-records', url: '/master-records/BIM_EXTO', settleMs: 7500 },
  { id: 'work/master-inline-edit', url: '/master-records/BIM_EXTO', prep: editMasterCell, settleMs: 1500 },
  { id: 'work/hierarchical-master', url: '/master-records/TERMINO', settleMs: 7500 },
  { id: 'work/import', url: '/settings/module-setup/import' },
  { id: 'work/drive', url: '/document-manager', settleMs: 1500 },
  { id: 'work/photos', url: '/photos', settleMs: 1500 },
  { id: 'work/reports', url: '/reports' },
  { id: 'work/recycle-bin', url: '/recycle-bin', settleMs: 1500 },
  { id: 'work/job-status', url: '/projects', prep: openPanel('Job Status'), settleMs: 2500 },

  // ── Building ─────────────────────────────────────────────────────────────
  { id: 'build/module-designer', url: `/settings/module-designer/${MODULE}/general`, settleMs: 1200 },
  { id: 'build/module-builder', url: '/settings/module-builder' },
  { id: 'build/form-designer', url: `/settings/module-designer/${MODULE}/forms`,
    prep: openFormBuilder(), settleMs: 2500 },
  { id: 'build/rules', url: `/settings/module-designer/${MODULE}/forms`,
    prep: openFormBuilder('Rules'), settleMs: 2200 },
  { id: 'build/tables', url: `/settings/module-designer/${MODULE}/tables`, settleMs: 1200 },
  { id: 'build/reference-tables', url: `/settings/module-designer/${MODULE}/reference-tables`, settleMs: 1200 },
  { id: 'build/log-views', url: `/settings/module-designer/${MODULE}/log-views`, settleMs: 1200 },
  { id: 'build/checklists', url: `/settings/module-designer/${MODULE}/checklists`, settleMs: 1200 },
  { id: 'build/data-sets', url: `/settings/module-designer/${MODULE}/data-sets`, settleMs: 1500 },
  { id: 'build/dashboard-builder', url: '/settings/dashboard-builder', settleMs: 1500 },
  { id: 'build/step-properties', url: `/settings/module-designer/${MODULE}/workflows?wf=${WORKFLOW}`, prep: clickNode('Issue Creation'), settleMs: 3000 },
  { id: 'build/condition-node', url: `/settings/module-designer/${MODULE}/workflows?wf=${WORKFLOW}`, prep: click('Trace'), settleMs: 3000 },
  // build/versions is the same screen as workflows/list — the workflows tab is
  // the version list. publishing.md references workflows/list directly.
  { id: 'workflows/list', url: `/settings/module-designer/${MODULE}/workflows`, settleMs: 2000 },
  { id: 'workflows/designer', url: `/settings/module-designer/${MODULE}/workflows?wf=${WORKFLOW}`,
    prep: fitCanvas, settleMs: 3000, viewport: { width: 1440, height: 620 } },

  // ── CX workbench ─────────────────────────────────────────────────────────
  { id: 'cx/matrix', url: `/cx/workbench/${WORKBENCH}`, prep: expandMatrix, settleMs: 2000 },
  { id: 'cx/cell-panel', url: `/cx/workbench/${WORKBENCH}`, prep: openCell, settleMs: 2500 },
  { id: 'cx/checklist', url: `/cx/workbench/${WORKBENCH}`, prep: openChecklist, settleMs: 2500 },
  { id: 'cx/documents', url: `/cx/workbench/${WORKBENCH}`, prep: click('Documents'), settleMs: 2000 },
  { id: 'cx/handover', url: `/cx/workbench/${WORKBENCH}`, prep: click('Handover'), settleMs: 2000 },
  { id: 'cx/registry', url: `/cx/workbench/${WORKBENCH}`, prep: expandSsm, settleMs: 2500 },
  { id: 'cx/dates', url: `/cx/workbench/${WORKBENCH}`, prep: expandGantt, settleMs: 2500 },
  { id: 'cx/levels', url: `/settings/cx-workbench/${WORKBENCH}?tab=level`, settleMs: 1500 },
  { id: 'cx/designer', url: `/settings/cx-workbench/${WORKBENCH}?tab=general`, settleMs: 1500 },
  { id: 'cx/stages', url: `/settings/cx-workbench/${WORKBENCH}?tab=stage`, settleMs: 1500 },
  { id: 'cx/stage-templates', url: `/settings/cx-workbench/${WORKBENCH}?tab=stage-template`, settleMs: 1500 },
  { id: 'cx/stage-configs', url: `/cx/workbench/${WORKBENCH}`,
    prep: openWorkbenchSettings('Stage Configurations'), settleMs: 2000 },
  { id: 'cx/asset-registry', url: `/cx/workbench/${WORKBENCH}`,
    prep: openWorkbenchSettings('Registry'), settleMs: 2000 },
  { id: 'cx/asset-panel',        url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel(),                  settleMs: 2000 },
  { id: 'cx/asset-stages',       url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel('Stages'),          settleMs: 2000 },
  { id: 'cx/asset-predecessors', url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel('Predecessors'),    settleMs: 2000 },
  { id: 'cx/asset-documents',    url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel('Documents'),       settleMs: 2000 },
  { id: 'cx/asset-urls',         url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel('URLs'),            settleMs: 2000 },
  { id: 'cx/asset-notes',        url: `/cx/workbench/${WORKBENCH}`, prep: openAssetPanel('Notes'),           settleMs: 2000 },

  // ── Administration ───────────────────────────────────────────────────────
  { id: 'admin/workspaces', url: `/workspace/edit/${WORKSPACE}?tab=general`, settleMs: 2000 },
  { id: 'admin/projects', url: '/projects', settleMs: 1500 },
  { id: 'projects/create', url: '/projects/create/project', settleMs: 2000 },
  { id: 'projects/edit', url: `/projects/edit/${PROJECT}?tab=general`, settleMs: 2500 },
  { id: 'projects/groups', url: `/projects/edit/${PROJECT}?tab=groups`, settleMs: 2500 },
  { id: 'admin/spaces', url: `/projects/edit/${PROJECT}?tab=space`, settleMs: 2500 },
  // There is no /settings/users route — users are granted per project, so this
  // opens a project and lands on its Users tab. See openProject above for why
  // it clicks a named row rather than using a hard-coded id.
  // Scrub the two name columns only. AG Grid puts a col-id on the HEADER cell
  // as well as the body cells, so the selector is anchored to the body
  // container — otherwise "First Name" becomes a person's name.
  { id: 'admin/users', url: `/projects/edit/${PROJECT}?tab=users`, settleMs: 2500,
    scrubAs: 'person',
    scrub: '.ag-center-cols-container [col-id="firstName"], .ag-center-cols-container [col-id="lastName"]' },
  // The group list is literally a list of customer names — scrub them.
  { id: 'admin/groups', url: '/settings/groups', settleMs: 1500 },
  { id: 'admin/menu-setup', url: '/settings/menu-setup' },
  { id: 'admin/module-setup', url: '/settings/module-setup', settleMs: 1200 },
  { id: 'admin/schema-editor', url: '/settings/datasetup/schema-editor', settleMs: 1500 },
  { id: 'admin/knowledge-graph', url: '/settings/knowledge-graph', settleMs: 2500 },

  // ── Integrations ─────────────────────────────────────────────────────────
  { id: 'integrations/webhooks', url: '/settings/webhooks' },
  { id: 'integrations/external-service', url: '/settings/external-service-log' },

  // ── AI ───────────────────────────────────────────────────────────────────
  { id: 'ai/assistant', url: '/projects', prep: openPanel('AI Assistant'), settleMs: 2500 },
  { id: 'ai/insights', url: `/mod/${MODULE}/record-v2/${RECORD}`, prep: openRecordWidget('Insights'), settleMs: 3500 },
  // The AI builder is a panel inside the form designer — open it, or the shot is
  // identical to build/form-designer.
  { id: 'ai/form-builder', url: `/settings/module-designer/${MODULE}/forms`,
    prep: click('AI'), settleMs: 2200 },


  // ── AI pages (added alongside the D* diagram components) ─────────────────
  // The AI Memory section lives in the user profile sheet, below Display
  // Preferences — same panel as account/profile, different part of it.
  { id: 'ai/memory', url: '/my-tasks', settleMs: 1500,
    prep: openUserProfile, scrubAs: 'person',
    scrub: '[role="dialog"] dl dd, [role="dialog"] p.text-sm.font-semibold' },

  // The fifth KPI card in the matrix opens a panel of charts.
  { id: 'ai/cx-intelligence', url: `/cx/workbench/${WORKBENCH}`,
    prep: openCxInsights, settleMs: 3000 },

  // These four need a real question asked in the assistant before there is
  // anything to photograph. Run each with --headed, ask the question the alt
  // text describes, and it captures what you land on.
  //   TODO ai/overview      — the panel open beside a record
  //   TODO ai/context       — answering about the open record
  //   TODO ai/attachments   — a question with two attached files
  //   TODO ai/steps         — the reasoning steps for one turn
  { id: 'ai/overview', url: '/projects', prep: openPanel('AI Assistant'), settleMs: 2500 },
  { id: 'ai/context', url: `/mod/${MODULE}/record-v2/${RECORD}`,
    prep: openPanel('AI Assistant'), settleMs: 3000 },
  { id: 'ai/attachments', url: '/projects', prep: openPanel('AI Assistant'), settleMs: 2500 },
  { id: 'ai/steps', url: '/projects', prep: openPanel('AI Assistant'), settleMs: 2500 },

  // ── Clips ────────────────────────────────────────────────────────────────
  // Playwright records the session; it cannot perform the gesture for you.
  // Run one with --headed, do the actions yourself, and it captures the window.
  { id: 'workflows/draw-a-workflow', kind: 'video', url: '/settings/module-designer', videoDurationMs: 25000 },
  { id: 'build/design-a-form', kind: 'video', url: '/settings/build-form', videoDurationMs: 25000 },
  { id: 'getting-started/build-a-form', kind: 'video', url: '/settings/build-form', videoDurationMs: 20000 },
  { id: 'getting-started/draw-and-publish', kind: 'video', url: '/settings/module-designer', videoDurationMs: 25000 },
];
