<script setup lang="ts">
/**
 * An HTTP method badge for hand-written API reference prose — GET/POST/etc,
 * colored. Reuses vitepress-openapi's own OAMethodBadge--* classes (its CSS
 * is already loaded site-wide for the Data API explorer) so a hand-written
 * "## Get all master records" section matches the colors on the live
 * Playground right below it, instead of inventing a second palette.
 */
const props = defineProps<{
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
}>();
</script>

<template>
  <span
    class="OAMethodBadge inline-flex items-center border text-xs font-semibold border-transparent px-2 py-1 rounded"
    :class="`OAMethodBadge--${props.method}`"
  >{{ props.method.toUpperCase() }}</span>
</template>
