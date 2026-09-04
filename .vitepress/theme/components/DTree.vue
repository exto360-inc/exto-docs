<script setup lang="ts">
/**
 * A containment hierarchy — tenant over workspace over project, or a module
 * over its form, workflow and records. Indent guides are drawn in CSS so the
 * labels can be prose in the body font instead of box-drawing characters
 * pretending to be a font.
 *
 * `mono` is for the one tree that really is a directory listing, where the
 * code font is the correct signal rather than a leftover.
 */
import DTreeNodes from './DTreeNodes.vue';
defineProps<{
  nodes: { label: string; note?: string; children?: any[] }[];
  root?: string;
  mono?: boolean;
}>();
</script>

<template>
  <figure class="dg dg-tree" :class="{ 'dg-mono': mono }">
    <div v-if="root" class="dg-root">{{ root }}</div>
    <DTreeNodes :nodes="nodes" />
  </figure>
</template>
