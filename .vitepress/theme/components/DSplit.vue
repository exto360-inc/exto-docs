<script setup lang="ts">
/**
 * Two or three things set side by side because the contrast between them is
 * the content — attaching a file versus picking one from Drive, facts versus
 * preferences, instructions versus data.
 */
defineProps<{
  columns: { title: string; sub?: string; via?: string; items?: string[]; foot?: string }[];
}>();
</script>

<template>
  <figure class="dg dg-split" :style="{ '--dg-cols': columns.length }">
    <div v-for="(c, i) in columns" :key="i" class="dg-col">
      <div class="dg-col-head">
        <span class="dg-title">{{ c.title }}</span>
        <span v-if="c.sub" class="dg-body">{{ c.sub }}</span>
      </div>
      <div v-if="c.via" class="dg-via">{{ c.via }}</div>
      <ul v-if="c.items?.length" class="dg-items">
        <li v-for="(it, j) in c.items" :key="j">{{ it }}</li>
      </ul>
      <div v-if="c.foot" class="dg-foot">{{ c.foot }}</div>
    </div>
  </figure>
</template>
