<template>
  <circle class="svg-circle" :cx="centerX" :cy="centerY" :r="radius" stroke-width="5" />
</template>

<script setup lang="ts">
defineProps<{
  radius: number;
  centerX: number;
  centerY: number;
  color?: string;
}>();
</script>
