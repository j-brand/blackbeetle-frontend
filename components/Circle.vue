<template>
  <circle ref="circle" class="svg-circle" :cx="centerX" :cy="centerY" :r="radius" stroke-width="5" />
</template>

<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";

const props = defineProps(["radius", "centerX", "centerY", "color"]);
const circle = ref(null);

</script>
