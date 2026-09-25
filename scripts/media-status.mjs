#!/usr/bin/env node
/**
 * What media is still missing.
 *
 * Every <Shot> and <Clip> names its own destination, so the pages themselves
 * are the manifest — no separate list to keep in sync. This walks them, checks
 * public/, and prints what is still outstanding.
 *
 *   node scripts/media-status.mjs          what is missing
 *   node scripts/media-status.mjs --all    every asset, present or not
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.vitepress', '.git', 'public', 'scripts']);
// README documents the <Shot> syntax with real-looking examples. They are
// documentation of the convention, not placeholders anything renders.
const SKIP_FILES = new Set(['README.md', 'REVIEW.md']);
const showAll = process.argv.includes('--all');

async function md(dir = ROOT, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) await md(full, out); }
    else if (e.name.endsWith('.md') && !SKIP_FILES.has(e.name)) out.push(full);
  }
  return out;
}

const assets = [];
for (const file of await md()) {
  const page = relative(ROOT, file);
  const text = await readFile(file, 'utf8');
  for (const m of text.matchAll(/<(Shot|Clip)\s+src="([^"]+)"([^>]*)>/g)) {
    const [, kind, src, rest] = m;
    if (src === 'area/page' || src === 'area/task') continue;  // README examples
    // A <Shot> is one image unless it opts into a themed pair. See Shot.vue.
    const files = kind === 'Clip'
      ? [`public/videos/${src}.webm`]
      : /\bthemed\b/.test(rest)
        ? [`public/screenshots/${src}-light.png`, `public/screenshots/${src}-dark.png`]
        : [`public/screenshots/${src}.png`];
    assets.push({ page, kind, files });
  }
}

const rows = assets.flatMap(a => a.files.map(f => ({ ...a, file: f, has: existsSync(join(ROOT, f)) })));
const missing = rows.filter(r => !r.has);
const shown = showAll ? rows : missing;

const byPage = new Map();
for (const r of shown) (byPage.get(r.page) ?? byPage.set(r.page, []).get(r.page)).push(r);

for (const [page, list] of [...byPage].sort()) {
  console.log(`\n${page}`);
  for (const r of list) console.log(`  ${r.has ? '✓' : '·'} ${r.file}`);
}

const done = rows.length - missing.length;
console.log(`\n${done} of ${rows.length} present · ${missing.length} outstanding`);
if (missing.length === 0) console.log('✓ all media in place');
