#!/usr/bin/env node
/**
 * Dead-link check over the docs source.
 *
 * Runs against the markdown, not the built HTML, so a broken link is reported
 * at the file and line someone can actually fix. Two sources of links are
 * checked, because they fail differently: prose links produce a 404 the reader
 * hits, and sidebar links produce a 404 the reader hits *first* — the config is
 * the more expensive one to get wrong.
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.vitepress', '.git', 'public', 'scripts']);

/** Every .md file in the docs tree. */
async function markdownFiles(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.vitepress') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP.has(entry.name)) continue;
      await markdownFiles(full, out);
    } else if (entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Does a site-absolute path resolve to a page?
 *
 * `cleanUrls` is on, so `/work/views` is `work/views.md` and `/work/` is
 * `work/index.md`. Both spellings of a directory index are accepted because
 * both appear in the sidebar today.
 */
function resolves(link) {
  const path = link.replace(/[?#].*$/, '');
  const bare = path.replace(/^\/+|\/+$/g, '');
  const candidates = bare === ''
    ? ['index.md']
    : [`${bare}.md`, `${bare}/index.md`, bare.endsWith('.md') ? bare : null];
  return candidates.filter(Boolean).some(c => existsSync(join(ROOT, c)));
}

const problems = [];

// ── Prose links ─────────────────────────────────────────────────────────────
for (const file of await markdownFiles()) {
  const rel = relative(ROOT, file);
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    // Site-absolute markdown links only. Relative links and external URLs are
    // out of scope: VitePress resolves the former itself, and reaching the
    // latter would make this check need the network.
    for (const m of line.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const link = m[1];
      if (!resolves(link)) problems.push(`${rel}:${i + 1}  ${link}`);
    }
  });
}

// ── Sidebar and nav links ───────────────────────────────────────────────────
const config = await readFile(join(ROOT, '.vitepress/config.mts'), 'utf8');
for (const m of config.matchAll(/link:\s*'([^']+)'/g)) {
  const link = m[1];
  if (link.startsWith('/') && !resolves(link)) {
    problems.push(`.vitepress/config.mts  ${link}`);
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} dead link${problems.length === 1 ? '' : 's'}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('');
  process.exit(1);
}

console.log('✓ no dead links');
