<script setup lang="ts">
/**
 * One thing splitting into several, or several converging into one — a question
 * fanning out to three retrieval strategies, or five independent sources being
 * assembled into a single working context.
 *
 * `then` is the chain the branches feed into, one box per link, which is what
 * lets a fan-out and the pipeline after it stay a single picture instead of
 * two that a reader has to staple together.
 */
withDefaults(
  defineProps<{
    source?: string;
    branches: { label: string; note?: string }[];
    then?: { label: string; note?: string }[];
    result?: string;
    dir?: 'out' | 'in';
  }>(),
  { dir: 'out' },
);
</script>

<template>
  <figure class="dg dg-branchfig" :class="`dg-fan-${dir}`">
    <div v-if="source && dir === 'out'" class="dg-source">{{ source }}</div>
    <ul class="dg-branch dg-fan">
      <li v-for="(b, i) in branches" :key="i">
        <div class="dg-node">
          <span class="dg-title">{{ b.label }}</span>
          <span v-if="b.note" class="dg-body">{{ b.note }}</span>
        </div>
      </li>
    </ul>
    <template v-for="(t, i) in then || []" :key="i">
      <div class="dg-arrow" aria-hidden="true"></div>
      <div class="dg-merge">
        <span class="dg-title">{{ t.label }}</span>
        <span v-if="t.note" class="dg-body">{{ t.note }}</span>
      </div>
    </template>
    <template v-if="result">
      <div class="dg-arrow" aria-hidden="true"></div>
      <div class="dg-source dg-result">{{ result }}</div>
    </template>
  </figure>
</template>
