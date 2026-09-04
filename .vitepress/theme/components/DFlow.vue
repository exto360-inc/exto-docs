<script setup lang="ts">
/**
 * A chain of steps joined by arrows. `dir="right"` reads left to right and
 * folds to a column on a narrow screen, which is the one thing the ASCII
 * version could never do.
 *
 * `edge` labels the arrow *into* a step — "HTTP", "submit" — because on several
 * of these the transport or the trigger is the interesting part. `loop` draws
 * the return path under the whole chain, for a lifecycle that can go back.
 */
withDefaults(
  defineProps<{
    steps: { title: string; body?: string; note?: string; edge?: string }[];
    dir?: 'down' | 'right';
    numbered?: boolean;
    loop?: string;
    loopTo?: number;
  }>(),
  { dir: 'down', numbered: false, loopTo: 0 },
);
</script>

<template>
  <figure class="dg dg-flow" :class="[`dg-${dir}`, { 'dg-has-loop': loop }]">
    <div class="dg-track">
      <template v-for="(s, i) in steps" :key="i">
        <div v-if="i" class="dg-arrow">
          <span v-if="s.edge" class="dg-edge">{{ s.edge }}</span>
        </div>
        <div class="dg-step">
          <span v-if="numbered" class="dg-n">{{ i + 1 }}</span>
          <div class="dg-main">
            <span class="dg-title">{{ s.title }}</span>
            <span v-if="s.body" class="dg-body">{{ s.body }}</span>
          </div>
          <span v-if="s.note" class="dg-note">{{ s.note }}</span>
        </div>
      </template>
    </div>
    <div
      v-if="loop"
      class="dg-loop"
      :style="{ marginLeft: dir === 'right' ? `${(loopTo / steps.length) * 100}%` : undefined }"
    >
      <span>{{ loop }}</span>
    </div>
  </figure>
</template>
