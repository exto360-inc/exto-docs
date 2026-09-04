<script setup lang="ts">
/** The recursive half of DTree, split out because a component cannot be its
 *  own child in `<script setup>` without a name. */
defineProps<{ nodes: { label: string; note?: string; children?: any[] }[] }>();
</script>

<template>
  <ul class="dg-branch">
    <li v-for="(n, i) in nodes" :key="i">
      <div class="dg-node">
        <span class="dg-title">{{ n.label }}</span>
        <span v-if="n.note" class="dg-body">{{ n.note }}</span>
      </div>
      <DTreeNodes v-if="n.children?.length" :nodes="n.children" />
    </li>
  </ul>
</template>
