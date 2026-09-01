<script setup lang="ts">
/** A short screen recording: 15–30s, no audio, one task. See Shot for why the
 *  placeholder names its own path. */
const props = defineProps<{ src: string; caption?: string; pending?: boolean }>();
const path = `/videos/${props.src}.mp4`;
</script>

<template>
  <figure class="shot">
    <div v-if="pending" class="pending">🎬 clip pending — drop <code>{{ path }}</code></div>
    <video v-else :src="path" controls preload="metadata" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
