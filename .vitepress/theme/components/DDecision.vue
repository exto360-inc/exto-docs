<script setup lang="ts">
/**
 * The one diagram with a genuine branch that rejoins — a workflow whose two
 * outcomes reach the same end. Drawn as SVG on a viewBox so it scales down
 * with the column instead of scrolling sideways out of it.
 */
defineProps<{
  start: string;
  step: string;
  stepEdge: string;
  question: string;
  yesEdge: string;
  review: string;
  reviewEdge: string;
  end: string;
  noEdge: string;
  rejectEdge: string;
  joinEnd: string;
}>();
</script>

<template>
  <figure class="dg dg-decision">
    <svg viewBox="0 0 890 232" role="img" :aria-label="`${start} to ${end}, branching on ${question}`">
      <defs>
        <marker id="dgArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" class="dg-svg-head" />
        </marker>
      </defs>

      <rect class="dg-svg-term" x="4" y="32" width="76" height="36" rx="18" />
      <text class="dg-svg-t" x="42" y="55">{{ start }}</text>
      <path class="dg-svg-line" d="M80 50 H110" marker-end="url(#dgArrow)" />

      <rect class="dg-svg-box" x="116" y="32" width="118" height="36" rx="7" />
      <text class="dg-svg-t" x="175" y="55">{{ step }}</text>
      <path class="dg-svg-line" d="M234 50 H352" marker-end="url(#dgArrow)" />
      <text class="dg-svg-e" x="294" y="41">{{ stepEdge }}</text>

      <path class="dg-svg-dec" d="M358 50 L452 16 L546 50 L452 84 Z" />
      <text class="dg-svg-t" x="452" y="56">{{ question }}</text>
      <path class="dg-svg-line" d="M546 50 H584" marker-end="url(#dgArrow)" />
      <text class="dg-svg-e" x="566" y="41">{{ yesEdge }}</text>

      <rect class="dg-svg-box" x="590" y="32" width="110" height="36" rx="7" />
      <text class="dg-svg-t" x="645" y="55">{{ review }}</text>
      <path class="dg-svg-line" d="M700 50 H800" marker-end="url(#dgArrow)" />
      <text class="dg-svg-e" x="750" y="41">{{ reviewEdge }}</text>

      <rect class="dg-svg-term" x="806" y="32" width="76" height="36" rx="18" />
      <text class="dg-svg-t" x="844" y="55">{{ end }}</text>

      <path class="dg-svg-line" d="M452 84 V196 H480" marker-end="url(#dgArrow)" />
      <text class="dg-svg-e" x="462" y="146" text-anchor="start">{{ noEdge }}</text>
      <path class="dg-svg-line" d="M645 68 V196 H616" marker-end="url(#dgArrow)" />
      <text class="dg-svg-e" x="655" y="146" text-anchor="start">{{ rejectEdge }}</text>

      <rect class="dg-svg-term" x="486" y="178" width="124" height="36" rx="18" />
      <text class="dg-svg-t" x="548" y="201">{{ joinEnd }}</text>
    </svg>
  </figure>
</template>
