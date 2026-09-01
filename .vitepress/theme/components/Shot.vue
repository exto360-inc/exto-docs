<script setup lang="ts">
/**
 * A screenshot, as a light/dark pair — the theme picks which to show, the way
 * console-docs does it.
 *
 * `src` is the stem: `workflows/list` resolves to `workflows/list-light.png` and
 * `-dark.png` under /screenshots. Until those files exist the frame renders as a
 * placeholder naming the exact path to drop them at, so a page is publishable
 * before its media and complete the moment the file lands — no page edit.
 */
const props = defineProps<{ src: string; alt: string; caption?: string; pending?: boolean }>();
const base = `/screenshots/${props.src}`;
</script>

<template>
  <figure class="shot">
    <div v-if="pending" class="pending">
      📷 screenshot pending — drop <code>{{ base }}-light.png</code> and <code>{{ base }}-dark.png</code>
    </div>
    <template v-else>
      <img class="light-only" :src="`${base}-light.png`" :alt="alt" />
      <img class="dark-only" :src="`${base}-dark.png`" :alt="alt" />
    </template>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
