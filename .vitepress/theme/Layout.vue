<script setup lang="ts">
/**
 * The default home layout, with two slots filled.
 *
 * VitePress's `hero.image` takes exactly one image and centres it in a square,
 * which is the wrong shape for a product screenshot and cannot show two. The
 * theme exposes named slots for precisely this, so the hero keeps its own
 * markup — name, headline, tagline, actions, and their responsive behaviour —
 * and only the eyebrow and the picture are ours.
 */
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-info-before>
      <p class="x-eyebrow">The system of record</p>
    </template>

    <template #home-hero-image>
      <div class="x-stack">
        <div class="x-stack-glow" aria-hidden="true" />
        <img
          class="x-stack-back"
          src="/screenshots/work/workflow-timeline.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <img
          class="x-stack-front"
          src="/screenshots/cx/matrix.png"
          alt="The Exto commissioning portal — assets down the side, stages across the top"
        />
        <span class="x-stack-badge">Commissioning portal</span>
      </div>
    </template>
  </Layout>
</template>
