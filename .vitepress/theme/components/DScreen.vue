<script setup lang="ts">
/**
 * A wireframe of a screen's regions — what sits where, not what it looks like.
 * Deliberately unstyled inside each pane: the moment it starts imitating the
 * product it becomes a screenshot that lies, and Shot already does screenshots.
 */
defineProps<{
  title?: string;
  panes: { head?: string; label: string; flex?: number }[];
  rail?: string[];
}>();
</script>

<template>
  <figure class="dg dg-screen">
    <div class="dg-chrome">
      <div class="dg-panes">
        <div v-for="(p, i) in panes" :key="i" class="dg-pane" :style="{ flex: p.flex || 1 }">
          <div class="dg-pane-head">{{ i === 0 && title ? title : p.head }}</div>
          <div class="dg-pane-body">{{ p.label }}</div>
        </div>
        <div v-if="rail?.length" class="dg-rail">
          <span v-for="(r, i) in rail" :key="i">{{ r }}</span>
        </div>
      </div>
    </div>
  </figure>
</template>
