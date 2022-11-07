<template>
  <template v-if="storySlug == 'the-journey'">
    <img v-if="colorMode.value == 'light'" class="h-32 md:h-48 w-auto object-contain transform -rotate-10 mt-10" src="/img/flower_export_800.png" />
    <img v-if="colorMode.value == 'dark'" class="h-32 md:h-48 w-auto object-contain transform -rotate-10 mt-10" src="/img/flower_light_export_800.png" />
  </template>
</template>

<script setup lang="ts">
const props = defineProps({ storySlug: { type: String } });
const colorMode = useColorMode();
</script>
