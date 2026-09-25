/**
 * Screenshot and clip capture for the doc site.
 *
 * Reads `manifest.ts`, opens each entry against a locally running Exto, and
 * writes the files the <Shot> and <Clip> placeholders already name:
 *
 *   public/screenshots/<stem>-light.png   and  -dark.png
 *   public/videos/<stem>.webm
 *
 * Drop a file at that path and the page completes itself — the only edit
 * needed afterwards is removing `pending` from the tag.
 *
 *   npm run capture
 *   npm run capture -- --only work/my-tasks     one entry, while iterating
 *   npm run capture -- --skip-videos            faster
 *   npm run capture -- --headed                 watch it, to fix a selector
 *   npm run capture -- --base-url http://localhost:5173
 */
import { chromium, type Browser, type Page } from 'playwright';
import { mkdir, access, copyFile, readdir, stat, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { statSync } from 'node:fs';
import path from 'node:path';
import { manifest, type CaptureEntry } from './manifest.ts';

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(n);
const val = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };

const BASE = val('--base-url') ?? process.env.EXTO_URL ?? 'http://localhost:5173';
const ONLY = val('--only');
const HEADED = flag('--headed');
const SKIP_VIDEOS = flag('--skip-videos');
const NO_REDACT = flag('--no-redact');
/** Domains whose addresses must never appear in a published screenshot. */
const REDACT_DOMAINS = (val('--redact-domains') ?? 'exto360,synkrato').split(',');
const ROOT = path.join(import.meta.dirname, '..');
const STATE = path.join(import.meta.dirname, '.auth-state.json');

/**
 * Exto has no light/dark switch. It has twelve NAMED themes, four of which are
 * intrinsically dark — the `dark` class is derived from which one is picked
 * (see exto-web/src/hooks/useAppTheme.ts). So "light" and "dark" here mean
 * "the default theme" and "a dark theme", paired for similar hue.
 *
 * Set before load so the first paint is already right and we never capture a
 * flash of the wrong palette.
 */
const THEME_ID = { light: 'graphite-cobalt', dark: 'cyber-slate' } as const;
const DARK_THEMES = ['electric-slate', 'midnight-cyan', 'nebula-ai', 'cyber-slate'];

async function useTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript(([id, darks]) => {
    try {
      localStorage.setItem('exto.app-theme', id);
      const root = document.documentElement;
      root.setAttribute('data-theme', id);
      root.classList.toggle('dark', darks.includes(id));
    } catch { /* private window — ignore */ }
  }, [THEME_ID[theme], DARK_THEMES] as const);
}

/**
 * Redaction. The demo tenant carries real staff emails and names in Submitted By /
 * Created By / assignee columns, and the README's rule is "no real names" — so we
 * swap them for stable fakes in the DOM immediately before the shot.
 *
 * Stable, not random: the same input always maps to the same replacement, so a
 * re-capture produces an identical image rather than a gratuitous diff.
 */
// Wide enough that a long tenant list does not run out and start repeating.
const FAKE_ORGS = [
  'Northwind Energy', 'Copperline Utilities', 'Halstead Rail', 'Brightfall Data',
  'Kestrel Manufacturing', 'Ardent Semiconductor', 'Lumen Transit', 'Ferrous Works',
  'Calder Power', 'Meridian Fabrication', 'Westgate Terminal', 'Oakhurst Systems',
  'Pinefield Logistics', 'Stonebridge Water', 'Marlow Chemical', 'Harrowgate Metro',
  'Vantage Cleanroom', 'Redmill Industries', 'Thornbury Grid', 'Aspen Biotech',
  'Fenwick Assembly', 'Glenmore Refining', 'Ashcroft Robotics', 'Bexley Substation',
];
/** Names safe to leave visible — the seeded demo tenant, not a customer. */
const KEEP_NAMES = ['ORP Demo', 'Startup', 'Current', 'Tenants', 'Search tenants . . .',
                    'PME', 'User', 'Exto'];

const FAKE_PEOPLE = [
  ['alex.morgan', 'Alex Morgan'], ['sam.patel', 'Sam Patel'],
  ['jo.rivera', 'Jo Rivera'],     ['chris.doyle', 'Chris Doyle'],
  ['robin.hale', 'Robin Hale'],   ['kim.tanaka', 'Kim Tanaka'],
];

/**
 * Passed to the browser as a STRING, not a function.
 *
 * tsx compiles with esbuild's keep-names, which wraps named functions in a
 * `__name()` helper. page.evaluate serialises the function source and runs it
 * in the page, where that helper does not exist — so any transformed closure
 * dies with "__name is not defined". A string is never transformed.
 */
const REDACT_JS = `(function (people, marks) {
  function pick(seed) {
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return people[Math.abs(h) % people.length];
  }
  // Any whitespace-free token containing "@" is an address.
  var TOKEN = /[^\\s\\u00a0<>",;()]*@[^\\s\\u00a0<>",;()]*/g;
  var changed = 0;

  var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (w.nextNode()) nodes.push(w.currentNode);
  for (var j = 0; j < nodes.length; j++) {
    var n = nodes[j], t = n.nodeValue;
    if (!t) continue;
    var out = t;
    if (t.indexOf('@') !== -1) out = out.replace(TOKEN, function (m) { return pick(m)[0] + '@example.com'; });
    for (var k = 0; k < marks.length; k++) {
      if (out.indexOf(marks[k]) !== -1) {
        out = out.split(marks[k]).map(function (p, i) { return i ? pick(marks[k])[1] : p; }).join('');
      }
    }
    if (out !== t) { n.nodeValue = out; changed++; }
  }

  // Tooltips carry the untruncated address even when the cell does not.
  var tipped = document.querySelectorAll('[title],[aria-label]');
  for (var a = 0; a < tipped.length; a++) {
    ['title', 'aria-label'].forEach(function (attr) {
      var v = tipped[a].getAttribute(attr);
      if (v && v.indexOf('@') !== -1) {
        tipped[a].setAttribute(attr, v.replace(TOKEN, function (m) { return pick(m)[0] + '@example.com'; }));
        changed++;
      }
    });
  }
  return changed;
})(PEOPLE, MARKS)`;

const SCRUB_JS = `(function (sel, orgs, keep) {
  function pick(seed) {
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return orgs[Math.abs(h) % orgs.length];
  }
  var n = 0, used = {}, seen = {};
  var nodes = document.querySelectorAll(sel);
  for (var i = 0; i < nodes.length; i++) {
    var w = document.createTreeWalker(nodes[i], NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      var t = (w.currentNode.nodeValue || '').trim();
      if (!t || t.length < 2) continue;
      if (keep.indexOf(t) !== -1) continue;
      if (/^[0-9\\W]+$/.test(t)) continue;      // dates, counts, punctuation
      if (t.indexOf('@') !== -1) continue;      // already handled by the address pass
      // An avatar fallback renders initials sized for two characters; a full
      // name dropped in there overflows into unreadable glyphs.
      var el = w.currentNode.parentElement, inAvatar = false;
      while (el && el !== nodes[i]) {
        if (el.getAttribute && el.getAttribute('data-slot') === 'avatar') { inAvatar = true; break; }
        el = el.parentElement;
      }
      if (inAvatar) continue;
      if (seen[t]) { w.currentNode.nodeValue = seen[t]; continue; }
      var name = pick(t), tries = 0;
      while (used[name] && tries < orgs.length) {
        name = orgs[(orgs.indexOf(name) + 1) % orgs.length];
        tries++;
      }
      used[name] = true; seen[t] = name;
      w.currentNode.nodeValue = name;
      n++;
    }
  }
  return n;
})(SEL, ORGS, KEEP)`;

/** Replace organisation names inside `sel` with stable fakes. */
async function scrub(page: Page, sel: string, as: 'org' | 'person' = 'org'): Promise<number> {
  const pool = as === 'person' ? FAKE_PEOPLE.map(p => p[1]) : FAKE_ORGS;
  const js = SCRUB_JS
    .replace('SEL', JSON.stringify(sel))
    .replace('ORGS', JSON.stringify(pool))
    .replace('KEEP', JSON.stringify(KEEP_NAMES));
  return (await page.evaluate(js)) as number;
}

async function redact(page: Page, stems: string[]): Promise<number> {
  const js = REDACT_JS
    .replace('PEOPLE', JSON.stringify(FAKE_PEOPLE))
    .replace('MARKS', JSON.stringify(stems));
  return (await page.evaluate(js)) as number;
}

/**
 * A dead session does not error — the app redirects to /login and every capture
 * becomes a photograph of the sign-in form. Catch it on the first entry rather
 * than after 65 files are on disk.
 *
 * Note it is the SERVER session that dies, not the cookie: exto-go expires a
 * session after 30 minutes idle (SESSION_IDLE_TIMEOUT_MIN) while the xto_sid
 * cookie Playwright restores stays valid for days. So a state file can look
 * perfectly healthy and still be useless.
 */
function assertSignedIn(page: Page, entry: CaptureEntry) {
  if (entry.unauth) return;
  const url = page.url();
  if (!/\/login|\/sso-login|\/verify-otp/.test(url)) return;

  const saved = statSync(STATE).mtimeMs;
  const mins = Math.round((Date.now() - saved) / 60000);
  console.error(`\n  Redirected to ${new URL(url).pathname} — not signed in.`);
  console.error(`  The saved session is ${mins} minute${mins === 1 ? '' : 's'} old.`);
  if (mins >= 30) {
    console.error('  exto-go drops a session after 30 minutes idle, so this one is stale.');
  }
  console.error('\n  Sign in again, then start the capture straight away:\n');
  console.error('    npm run capture:auth');
  console.error('    npm run capture -- --skip-videos\n');
  process.exit(1);
}

/**
 * The signed-in account has AI Insights on with trigger=auto, so an Insights
 * rail opens beside every module grid. That is this user's preference, not part
 * of the screen being documented.
 *
 * It is driven by the session store (hydrated from the server profile), so a
 * localStorage override does nothing, and it re-opens after a click. Hiding it
 * in the DOM immediately before the shot is the only deterministic option —
 * the panel is a flex sibling, so the grid simply takes the width back.
 *
 * Passed as a string: tsx's keep-names helper does not exist in the page.
 */
const HIDE_CHROME_JS = `(function () {
  var hidden = 0;
  var spans = document.querySelectorAll('span, h2, h3');
  for (var i = 0; i < spans.length; i++) {
    if ((spans[i].textContent || '').trim() !== 'Insights') continue;
    var el = spans[i];
    // Walk out to the panel: the first ancestor with a left border and a width.
    for (var up = 0; up < 6 && el; up++) {
      el = el.parentElement;
      if (!el) break;
      var cls = el.className || '';
      if (typeof cls === 'string' && cls.indexOf('border-l') !== -1) {
        el.style.display = 'none';
        hidden++;
        break;
      }
    }
  }
  return hidden;
})()`;

async function hideChrome(page: Page): Promise<number> {
  return (await page.evaluate(HIDE_CHROME_JS).catch(() => 0)) as number;
}

async function settle(page: Page, entry: CaptureEntry) {
  await page.waitForLoadState('networkidle').catch(() => {});
  assertSignedIn(page, entry);
  if (entry.prep) await entry.prep(page);
  await page.waitForTimeout(entry.settleMs ?? 600);
  if (!NO_REDACT) {
    const n = await redact(page, REDACT_DOMAINS);
    if (n) console.log(`    redacted ${n} identifier${n === 1 ? '' : 's'}`);
    if (entry.scrub) {
      const m = await scrub(page, entry.scrub, entry.scrubAs);
      if (m) console.log(`    scrubbed ${m} name${m === 1 ? '' : 's'}`);
    }
  }
}

async function shoot(browser: Browser, entry: CaptureEntry) {
  // One image unless the entry opts into a themed pair. See Shot.vue for why.
  const themes = entry.themed ? (['light', 'dark'] as const) : (['light'] as const);
  for (const theme of themes) {
    const ctx = await browser.newContext({
      viewport: entry.viewport ?? { width: 1440, height: 900 },
      storageState: entry.unauth ? undefined : STATE,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await useTheme(page, theme);
    await page.goto(BASE + entry.url, { waitUntil: 'domcontentloaded' });
    await settle(page, entry);

    const hid = await hideChrome(page);
    if (hid) console.log(`    hid ${hid} side panel${hid === 1 ? '' : 's'}`);

    const suffix = entry.themed ? `-${theme}` : '';
    const out = path.join(ROOT, 'public/screenshots', `${entry.id}${suffix}.png`);
    await mkdir(path.dirname(out), { recursive: true });
    const target = entry.selector ? page.locator(entry.selector).first() : page;
    await target.screenshot({ path: out });
    await ctx.close();
    console.log(`  ✓ ${entry.id}${suffix}.png`);

  }
}

async function film(browser: Browser, entry: CaptureEntry) {
  const dir = path.join(ROOT, 'public/videos', path.dirname(entry.id));
  await mkdir(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: entry.viewport ?? { width: 1440, height: 900 },
    storageState: STATE,
    recordVideo: { dir, size: { width: 1440, height: 900 } },
  });
  const page = await ctx.newPage();
  await useTheme(page, 'light');
  await page.goto(BASE + entry.url, { waitUntil: 'domcontentloaded' });
  await settle(page, entry);
  await page.waitForTimeout(entry.videoDurationMs ?? 15000);
  const video = page.video();
  await ctx.close();
  if (video) {
    const out = path.join(ROOT, 'public/videos', `${entry.id}.webm`);
    await mkdir(path.dirname(out), { recursive: true });
    await video.saveAs(out);
    console.log(`  ✓ ${entry.id}.webm`);
  }
}

// ── run ────────────────────────────────────────────────────────────────────
let entries = manifest;
if (ONLY) entries = entries.filter(e => e.id === ONLY || e.id.startsWith(ONLY));
if (SKIP_VIDEOS) entries = entries.filter(e => e.kind !== 'video');
if (!entries.length) { console.error(`  Nothing matches --only ${ONLY}`); process.exit(1); }

// Only the sign-in page can be captured signed out. Everything else needs the
// saved session, so bail early rather than producing 118 screenshots of a login form.
const needsAuth = entries.some(e => !e.unauth);
if (needsAuth) {
  try { await access(STATE); }
  catch {
    console.error('\n  No saved session — these entries need one:\n\n    npm run capture:auth\n');
    process.exit(1);
  }
}

// Guard: the docs site and the app both default to :5173, and VitePress answers
// every URL with a 200 — including its own 404 page. A capture run pointed at the
// wrong server produces 65 identical screenshots of "PAGE NOT FOUND", with no
// error anywhere. Verify we are talking to Exto before capturing anything.
{
  const probe = await chromium.launch({ channel: 'chrome' });
  const pg = await (await probe.newContext()).newPage();
  let title = '';
  try {
    await pg.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    title = await pg.title();
  } catch {
    console.error(`\n  Nothing is serving ${BASE}. Start exto-web first.\n`);
    await probe.close(); process.exit(1);
  }
  await probe.close();
  if (/docs/i.test(title)) {
    console.error(`\n  ${BASE} is serving the DOCS site ("${title}"), not Exto.`);
    console.error('  VitePress takes :5173 when the app is not running. Start exto-web,');
    console.error('  or pass --base-url with the app\'s real port.\n');
    process.exit(1);
  }
}

console.log(`\n  Capturing ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} from ${BASE}\n`);
const browser = await chromium.launch({ channel: 'chrome', headless: !HEADED });

let ok = 0; const failed: string[] = [];
for (const entry of entries) {
  try {
    if (entry.kind === 'video') await film(browser, entry);
    else await shoot(browser, entry);
    ok++;
  } catch (e) {
    failed.push(entry.id);
    console.log(`  ✗ ${entry.id} — ${(e as Error).message.split('\n')[0]}`);
  }
}
await browser.close();

// Size matters here: these files go into plain git, so the total is the number
// that decides whether that stays reasonable.
async function dirSize(dir: string): Promise<number> {
  let total = 0;
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name);
    total += e.isDirectory() ? await dirSize(p) : (await stat(p)).size;
  }
  return total;
}
const mb = (b: number) => (b / 1024 / 1024).toFixed(1);
const shots = await dirSize(path.join(ROOT, 'public/screenshots'));
const vids = await dirSize(path.join(ROOT, 'public/videos'));

console.log(`\n  ${ok} captured, ${failed.length} failed`);
console.log(`  public/screenshots ${mb(shots)} MB · public/videos ${mb(vids)} MB`);

// Identical files mean every capture landed on the same screen — a wrong target,
// an expired session, a route that silently redirects. A green run hides it.
const seen = new Map<string, string[]>();
const hashDir = async (dir: string) => {
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { await hashDir(fp); continue; }
    if (!e.name.endsWith('.png')) continue;
    const h = createHash('md5').update(await readFile(fp)).digest('hex');
    seen.set(h, [...(seen.get(h) ?? []), path.relative(ROOT, fp)]);
  }
};
await hashDir(path.join(ROOT, 'public/screenshots'));
const dupes = [...seen.values()].filter(g => g.length > 1).sort((a, b) => b.length - a.length);
if (dupes.length) {
  console.log(`\n  ⚠ ${dupes[0].length} screenshots are IDENTICAL — same screen captured more than once:`);
  for (const f of dupes[0].slice(0, 4)) console.log(`      ${f}`);
  if (dupes[0].length > 4) console.log(`      …and ${dupes[0].length - 4} more`);
  // The wrong target and an expired session are already caught before and during
  // the run, so duplicates reaching this point mean something narrower.
  console.log('');
  console.log('    Likely causes, now that target and session are checked up front:');
  console.log('      · their prep steps clicked nothing, so each landed on the same default tab');
  console.log('      · their URLs redirect to the same place (a route that no longer exists)');
  console.log('      · the screens genuinely look the same at this viewport');
  console.log('');
  console.log(`    Look at one:   open ${dupes[0][0]}`);
  console.log(`    Then retry it: npm run capture -- --only ${dupes[0][0].replace('public/screenshots/','').replace('.png','')} --headed`);
}
if (failed.length) {
  console.log('\n  Retry one at a time to fix its prep step:');
  for (const id of failed.slice(0, 5)) console.log(`    npm run capture -- --only ${id} --headed`);
}
console.log('');
