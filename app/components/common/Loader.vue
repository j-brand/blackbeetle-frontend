<template>
  <div role="status" aria-live="polite" class="fixed z-20 left-0 top-0 h-full w-full bg-bb-lighter dark:bg-bb-charcoal flex justify-center items-center">
    <img v-if="colorMode.value === 'light'" class="w-36" src="/img/loader.gif" alt="Seite wird geladen" />
    <img v-if="colorMode.value === 'dark'" class="w-36" src="/img/loader_light.gif" alt="Seite wird geladen" />
  </div>
</template>
 
<script setup lang="ts">
const colorMode = useColorMode();



</script>