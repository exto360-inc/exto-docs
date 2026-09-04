import DefaultTheme from 'vitepress/theme';
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
import './custom.css';

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
  },
};
