<template>
  <button @click="toggleDarkMode">
    <IconThemeDark v-if="colorMode.value == 'light'" />
    <IconThemeLight v-if="colorMode.value == 'dark'" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

function toggleDarkMode() {
  if (colorMode.value !== "dark") {
    colorMode.preference = "dark";
  } else {
    colorMode.preference = "light";
  }
}
</script>
