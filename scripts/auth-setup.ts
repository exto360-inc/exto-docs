/**
 * One-time interactive sign-in.
 *
 * Opens a real browser, waits for you to sign in yourself, then saves the
 * session so `capture.ts` can reuse it. Credentials are never typed by the
 * script, never passed as arguments, and never written to the repo — the
 * saved state file is gitignored.
 *
 *   npm run capture:auth
 */
import { chromium } from 'playwright';
import { createInterface } from 'node:readline/promises';
import path from 'node:path';

const BASE = process.env.EXTO_URL ?? 'http://localhost:5173';
const STATE = path.join(import.meta.dirname, '.auth-state.json');

const browser = await chromium.launch({ channel: 'chrome', headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE);

console.log(`\n  A browser has opened at ${BASE}.`);
console.log('  Sign in, choose your tenant, and wait until you can see the app.');

const rl = createInterface({ input: process.stdin, output: process.stdout });
await rl.question('\n  Then press Enter here to save the session... ');
rl.close();

await ctx.storageState({ path: STATE });
await browser.close();
console.log(`\n  ✓ Session saved to ${path.relative(process.cwd(), STATE)} (gitignored)`);
console.log('    Now run:  npm run capture\n');
