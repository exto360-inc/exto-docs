import DefaultTheme from 'vitepress/theme';
import Shot from './components/Shot.vue';
import Clip from './components/Clip.vue';
import Perm from './components/Perm.vue';
import './custom.css';

/**
 * Three components, because ninety pages repeat the same three things: a
 * screenshot, a short clip, and who is allowed to do this. Registered globally
 * so a page never imports them.
 */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Shot', Shot);
    app.component('Clip', Clip);
    app.component('Perm', Perm);
  },
};
