<script setup lang="ts">
/** A role badge. Every screen page closes with who may do what — the question
 *  that actually blocks people, and the one console-docs answers on every page. */
defineProps<{ role: string }>();
</script>

<template><span class="perm">{{ role }}</span></template>
