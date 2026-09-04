<script setup lang="ts">
/**
 * The commissioning matrix, drawn as an actual table: assets down, levels and
 * stages across, one stage instance per intersection.
 *
 * It was the diagram the ASCII version served worst — a grid rendered as
 * pipes and dashes is exactly the thing HTML already does well, with a real
 * header, a real row hierarchy, and cells a screen reader can announce.
 */
withDefaults(
  defineProps<{
    groups: { label: string; span: number }[];
    columns: string[];
    rows: { label: string; depth?: number; cells: ('done' | 'part' | 'todo' | '')[] }[];
    xLabel?: string;
    yLabel?: string;
    caption?: string;
    legend?: boolean;
  }>(),
  { legend: true },
);
const title = { done: 'Complete', part: 'In progress', todo: 'Not started', '': '' };
</script>

<template>
  <figure class="dg dg-matrix">
    <div v-if="xLabel" class="dg-axis dg-axis-x">{{ xLabel }} <span aria-hidden="true">→</span></div>
    <div class="dg-matrix-body">
      <div v-if="yLabel" class="dg-axis dg-axis-y"><span aria-hidden="true">↓</span> {{ yLabel }}</div>
      <div class="dg-scroll">
        <table>
          <thead>
            <tr>
              <td class="dg-corner"></td>
              <th v-for="(g, i) in groups" :key="i" :colspan="g.span" scope="colgroup">{{ g.label }}</th>
            </tr>
            <tr>
              <td class="dg-corner"></td>
              <th v-for="(c, i) in columns" :key="i" scope="col">{{ c }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in rows" :key="i">
              <th scope="row" :class="`dg-d${r.depth || 0}`">{{ r.label }}</th>
              <td v-for="(c, j) in r.cells" :key="j">
                <span v-if="c" :class="`dg-dot dg-${c}`" :title="title[c]" role="img" :aria-label="title[c]"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="legend" class="dg-legend">
      <span><i class="dg-dot dg-done"></i>Complete</span>
      <span><i class="dg-dot dg-part"></i>In progress</span>
      <span><i class="dg-dot dg-todo"></i>Not started</span>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
