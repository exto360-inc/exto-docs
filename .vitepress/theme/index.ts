import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import Shot from './components/Shot.vue';
import Clip from './components/Clip.vue';
import Perm from './components/Perm.vue';
import DStack from './components/DStack.vue';
import DFlow from './components/DFlow.vue';
import DTree from './components/DTree.vue';
import DBranch from './components/DBranch.vue';
import DSplit from './components/DSplit.vue';
import DMatrix from './components/DMatrix.vue';
import DScreen from './components/DScreen.vue';
import DDecision from './components/DDecision.vue';
import Method from './components/Method.vue';
import { theme as openapiTheme, useOpenapi, useTheme, generateCodeSample } from 'vitepress-openapi/client';
import dataApiSpec from './data/data-api.json';
import { buildHarSample } from './harSample';
import 'vitepress-openapi/dist/style.css';
import './custom.css';

// vitepress-openapi's own default code-sample languages, copied rather than
// imported — the library's `useTheme.d.ts` declares `availableLanguages` as
// a public export of 'vitepress-openapi/client', but the compiled client
// bundle (0.2.5) doesn't actually include it, so importing it fails the
// build. Extended below with one more entry for HAR export.
const DEFAULT_CODE_SAMPLE_LANGUAGES = [
  { lang: 'curl', label: 'cURL', target: 'shell', client: 'curl', highlighter: 'bash', icon: 'curl' },
  { lang: 'javascript', label: 'JavaScript', target: 'js', client: 'fetch', highlighter: 'javascript', icon: '.js' },
  { lang: 'php', label: 'PHP', target: 'php', client: 'curl', highlighter: 'php', icon: '.php' },
  { lang: 'python', label: 'Python', target: 'python', client: 'requests', highlighter: 'python', icon: '.py' },
];

// vitepress-openapi 0.2.5's Playground never prepends "Bearer " to the
// Authorization value for an http/bearer (or apiKey) security scheme — it
// sends whatever's typed into the field verbatim (traced through the
// library's bundled `mo()` header-builder; only oauth2/openIdConnect get an
// auto prefix). There's no supported config for this — `SecurityConfig` only
// exposes `defaultScheme`, and the field's "example" only fills the
// placeholder, never the real value that gets sent. Patching the vendored
// bundle would get silently wiped on the next install/upgrade, so instead:
// a `fetch` wrapper, scoped to our own API hosts, that fixes the header
// right before the request goes out. Only touches calls to *.exto360.com
// under /data/api/ — every other fetch on the page passes through untouched.
function patchFetchToPrefixBearer() {
  if (typeof window === 'undefined' || (window as any).__extoBearerFetchPatched) return;
  (window as any).__extoBearerFetchPatched = true;
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const rawUrl = input instanceof Request ? input.url : String(input);
      const url = new URL(rawUrl, window.location.origin);
      const isDataApi = /(^|\.)exto360\.com$/i.test(url.hostname) && url.pathname.startsWith('/data/api/');
      if (isDataApi) {
        const sourceHeaders = init?.headers ?? (input instanceof Request ? input.headers : undefined);
        if (sourceHeaders) {
          const headers = new Headers(sourceHeaders);
          const auth = headers.get('Authorization')?.trim();
          if (auth && !/^Bearer\s/i.test(auth)) {
            headers.set('Authorization', `Bearer ${auth}`);
            init = { ...init, headers };
          }
        }
      }
    } catch {
      // Any parsing hiccup — fall through and send the request unmodified.
    }
    return originalFetch(input as RequestInfo, init);
  };
}

// The "Samples" tab (curl/JS/PHP/Python/HAR) is a separate code path from the
// live fetch above — it renders a *string*, built from `request.headers`
// (already resolved from the Authorization field, same missing-"Bearer" bug)
// by `generateCodeSample`/`buildHarSample` below, not by sending a real
// request our fetch patch could intercept. Fixed here instead, once, before
// either generator sees the request — `request.headers` is a plain object
// at runtime despite the `readonly` in its TS type, safe to mutate in place.
function ensureBearerPrefixOnRequestHeaders(request: { headers?: Record<string, string> }) {
  const headers = request?.headers;
  if (!headers) return;
  const authKey = Object.keys(headers).find((k) => k.toLowerCase() === 'authorization');
  if (!authKey) return;
  const value = headers[authKey]?.trim();
  if (value && !/^Bearer\s/i.test(value)) {
    headers[authKey] = `Bearer ${value}`;
  }
}

// Try-it's "Server" field is meant to be an empty box hinting
// `https://<host-name>.exto360.com` (set as its placeholder below, via the
// i18n override) — not vitepress-openapi's own default, which is to show its
// server picker pre-filled with a real-looking value. Two library quirks get
// in the way, both worked around here instead of in the vendored bundle:
//
// 1. The field's bound value is seeded from `operation.defaultBaseUrl`
//    resolved through the library's own `resolveBaseUrl`, which rejects
//    anything `URL.canParse` chokes on (angle brackets included) and silently
//    substitutes its own hardcoded "http://localhost" — so the field shows
//    that instead of starting blank.
// 2. The field is really two stacked controls — a text input and a
//    server-picker dropdown — chosen between by a persisted
//    `<prefix>-use-custom-server` flag. Our spec declares no servers, so the
//    dropdown's only real entry is "Custom Server"; it's hidden outright in
//    custom.css, which makes the flag matter even more; forcing it `true`
//    here ensures the (otherwise-hidden) dropdown can never be the only thing
//    a reader sees, including on a return visit where a prior manual toggle
//    left it `false`.
//
// The library persists whatever a reader types in `<prefix>-custom-server-url`
// across visits via localStorage — convenient in isolation, but it means a
// real tenant hostname someone once typed in (say, `app-us.exto360.com`)
// quietly survives in their browser and gets re-submitted the next time
// *anyone* on that machine clicks "Try it" without noticing the field was
// already filled in. The docs are a public reference, not a personal API
// client, so no server URL should ever outlive the page it was typed into —
// this wipes the stored value on every load rather than only seeding it once.
function forceEmptyCustomServerField() {
  if (typeof window === 'undefined') return;
  try {
    const prefix = useTheme().getStoragePrefix();
    window.localStorage.setItem(`${prefix}-use-custom-server`, 'true');
    window.localStorage.setItem(`${prefix}-custom-server-url`, '');
  } catch {
    // localStorage unavailable (e.g. private browsing) — the library's own
    // in-memory defaults apply instead; nothing to patch around.
  }
}

/**
 * Three media components, because ninety pages repeat the same three things: a
 * screenshot, a short clip, and who is allowed to do this.
 *
 * Then eight diagram components. The diagrams used to be box-drawing characters
 * in bare code fences, which meant every one of them rendered as *code* —
 * monospace, code chrome, a copy button, and eighty columns that scrolled off
 * the side of a phone. Six of the eight cover a shape the docs kept redrawing
 * by hand (a stack, a chain, a tree, a fan-out, a comparison, a grid); the last
 * two are the screen wireframe and the one branching workflow. Authoring stays
 * in the page, so a diagram still diffs in review — the repo's own rule.
 *
 * All registered globally so a page never imports them.
 */
export default {
  extends: DefaultTheme,
  // Fills the hero's eyebrow and image slots — see Layout.vue.
  Layout,
  enhanceApp({ app }) {
    patchFetchToPrefixBearer();
    app.component('Shot', Shot);
    app.component('Clip', Clip);
    app.component('Perm', Perm);
    app.component('DStack', DStack);
    app.component('DFlow', DFlow);
    app.component('DTree', DTree);
    app.component('DBranch', DBranch);
    app.component('DSplit', DSplit);
    app.component('DMatrix', DMatrix);
    app.component('DScreen', DScreen);
    app.component('DDecision', DDecision);
    app.component('Method', Method);

    // The Data API's interactive explorer — one spec, rendered by
    // vitepress-openapi. See /integrations/data-api-explorer.
    //
    // Shifted down one level: OASpec renders each operation's own title as an
    // h1 (so it never shows in VitePress's "On this page" outline, which
    // skips the page's real h1) and its subsections — Parameters, Responses,
    // Playground — as h2 (so *those* flood the outline instead). Bumping
    // everything down one level puts operation titles at h2, where the
    // outline actually lists them, and the noisy subsections at h3+, below
    // the outline's depth.
    useOpenapi({ spec: dataApiSpec });
    useTheme({
      headingLevels: { h1: 2, h2: 3, h3: 4, h4: 5, h5: 6, h6: 6 },
      // Single column: a 2-column split was tried (docs left, Try-it pinned
      // right) and worked, but read as cluttered at the site's normal content
      // width even after widening it — reverted.
      //
      // The library's own default is actually `cols: 2`, not 1 — easy to miss
      // because with every slot present, the left column (path/description/
      // security/parameters/responses) is usually much taller than the right
      // (playground/code-samples), so it mostly *reads* as single-column by
      // accident. It stops being an accident the moment a page empties the
      // left column via slot overrides (see data-api-explorer-masters.md):
      // the grid cell still reserves its 50%, leaving Playground stranded in
      // a narrow right-hand strip next to dead space. Set explicitly so every
      // page actually gets one full-width column, not a lucky-looking one.
      // `branding` is the library's own "Powered by VitePress OpenAPI" credit
      // line, on by default — hidden since it's not ours to ship.
      //
      // `defaultBaseUrl`: the spec declares zero `servers` (every tenant has
      // its own hostname — there's no real one to list). This is the
      // fallback base URL the library resolves requests and generated code
      // samples (curl, JS, …) against until a reader fills in their own —
      // *not* what the Try-it "Server" field displays (see
      // `forceEmptyCustomServerField` above for that). Has to be a URL
      // `URL.canParse` actually accepts — angle brackets aren't valid
      // hostname characters, and the library silently swaps in its own
      // `http://localhost` for anything it can't parse, which is far more
      // confusing in a generated curl command than a placeholder hostname.
      operation: { cols: 1, hiddenSlots: ['branding'], defaultBaseUrl: 'https://host-name.exto360.com/data' },
      //
      // Tried reordering `operation.slots` to put 'code-samples' before
      // 'playground', to de-emphasize Try-it without forking the component —
      // confirmed to have no effect (0.2.5 treats `slots`/`hiddenSlots` as an
      // inclusion filter only; rendering order is fixed). Playground stays
      // where the library puts it, right after Responses. A real tab/modal
      // for it would need a custom wrapper around the Playground internals,
      // not a config change.
      spec: { showPathsSummary: true },
      playground: { examples: { behavior: 'value' } },
      response: { responseCodeSelector: 'tabs' },
      storage: { persistAuth: true },
      // Required for the Try-it "Server" field to render at all once the
      // spec's `servers` list is empty — without it the whole field
      // disappears rather than falling back to a plain input.
      server: { allowCustomServer: true },
      // Repoints the Server field's own placeholder text (shown only while
      // it's empty) at our hostname pattern instead of the library's generic
      // "Enter a custom server URL". Spreads the library's existing message
      // table rather than replacing it outright — `setI18nConfig` overwrites
      // `messages` wholesale, and this site never switches locales, but
      // there's no reason to silently drop the other bundled languages'
      // translations for every other string on their account.
      i18n: {
        messages: {
          ...useTheme().getI18nConfig().messages,
          en: {
            ...useTheme().getI18nConfig().messages?.en,
            'Enter a custom server URL': 'https://<host-name>.exto360.com/data',
          },
        },
      },
      // One more "Samples" tab alongside curl/JS/PHP/Python: a HAR request,
      // which Postman and Insomnia both import directly (File → Import → the
      // saved .har file) — the fastest way to hand a request to a real client
      // instead of using the inline Playground.
      codeSamples: {
        availableLanguages: [
          ...DEFAULT_CODE_SAMPLE_LANGUAGES,
          { lang: 'har', label: 'HAR (Postman/Insomnia)', highlighter: 'json' },
        ],
        generator: async (langConfig, request) => {
          ensureBearerPrefixOnRequestHeaders(request);
          return langConfig.lang === 'har' ? buildHarSample(request) : generateCodeSample(langConfig, request);
        },
      },
    });
    forceEmptyCustomServerField();
    openapiTheme.enhanceApp({ app });
  },
};
