<script setup lang="ts">
/**
 * A stack of layers read top to bottom — the shape the AI lane keeps reaching
 * for: entry gates over context over the loop over the guards over the data.
 *
 * A layer carries a title, an optional body, and an optional `note` that names
 * *how* that layer works ("model call", "deterministic"). The note is the whole
 * point of several of these diagrams, so it gets its own column rather than
 * being smuggled into the body text.
 */
defineProps<{
  layers: { n?: string | number; title: string; body?: string; note?: string }[];
  inLabel?: string;
  outLabel?: string;
}>();
</script>

<template>
  <figure class="dg dg-stack">
    <div v-if="inLabel" class="dg-cap dg-cap-in">{{ inLabel }}</div>
    <div class="dg-card">
      <div v-for="(l, i) in layers" :key="i" class="dg-layer">
        <span v-if="l.n !== undefined" class="dg-n">{{ l.n }}</span>
        <div class="dg-main">
          <span class="dg-title">{{ l.title }}</span>
          <span v-if="l.body" class="dg-body">{{ l.body }}</span>
        </div>
        <span v-if="l.note" class="dg-note">{{ l.note }}</span>
      </div>
    </div>
    <div v-if="outLabel" class="dg-cap dg-cap-out">{{ outLabel }}</div>
  </figure>
</template>
