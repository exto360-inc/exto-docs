<script setup lang="ts">
/**
 * A screenshot.
 *
 * `src` is the stem: `work/my-tasks` resolves to `/screenshots/work/my-tasks.png`.
 *
 * ONE image by default. Exto has no light/dark switch — it has twelve named
 * themes — so a per-theme pair was never describing the product, only the docs
 * reader's own mode. A light screenshot on a dark docs page is unremarkable, and
 * the pair doubled both the capture time and the files in git for no real gain.
 *
 * Pass `themed` on the few images large enough for the mismatch to be
 * distracting — a full-width hero — and it resolves `-light` / `-dark` instead,
 * letting the theme pick.
 *
 * Until the file exists the frame renders a placeholder naming the exact path to
 * drop it at, so a page is publishable before its media and completes the moment
 * the file lands — no page edit.
 */
import { withBase } from 'vitepress';

const props = defineProps<{
  src: string;
  alt: string;
  caption?: string;
  pending?: boolean;
  themed?: boolean;
}>();
const base = `/screenshots/${props.src}`;
</script>

<template>
  <figure class="shot">
    <div v-if="pending" class="pending">
      📷 screenshot pending — drop
      <template v-if="themed">
        <code>{{ base }}-light.png</code> and <code>{{ base }}-dark.png</code>
      </template>
      <code v-else>{{ base }}.png</code>
    </div>
    <template v-else-if="themed">
      <img class="light-only" :src="withBase(`${base}-light.png`)" :alt="alt" />
      <img class="dark-only" :src="withBase(`${base}-dark.png`)" :alt="alt" />
    </template>
    <img v-else :src="withBase(`${base}.png`)" :alt="alt" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
