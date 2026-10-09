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
      operation: { cols: 1, hiddenSlots: ['branding'] },
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
      // One more "Samples" tab alongside curl/JS/PHP/Python: a HAR request,
      // which Postman and Insomnia both import directly (File → Import → the
      // saved .har file) — the fastest way to hand a request to a real client
      // instead of using the inline Playground.
      codeSamples: {
        availableLanguages: [
          ...DEFAULT_CODE_SAMPLE_LANGUAGES,
          { lang: 'har', label: 'HAR (Postman/Insomnia)', highlighter: 'json' },
        ],
        generator: async (langConfig, request) =>
          langConfig.lang === 'har' ? buildHarSample(request) : generateCodeSample(langConfig, request),
      },
    });
    openapiTheme.enhanceApp({ app });
  },
};
