<script setup lang="ts">
/** A short screen recording: 15–30s, no audio, one task. See Shot for why the
 *  placeholder names its own path.
 *
 *  webm, not mp4 — it is what Playwright records natively and what console-docs
 *  uses, so a captured clip needs no conversion step before it lands. */
import { withBase } from 'vitepress';

const props = defineProps<{ src: string; caption?: string; pending?: boolean }>();
const path = `/videos/${props.src}.webm`;
</script>

<template>
  <figure class="shot">
    <div v-if="pending" class="pending">🎬 clip pending — drop <code>{{ path }}</code></div>
    <video v-else :src="withBase(path)" controls preload="metadata" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
