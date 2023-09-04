<template>
  <button aria-label="Toggle Color Theme" @click="toggleDarkMode">
    <IconThemeDark v-if="colorMode.value == 'light'" />
    <IconThemeLight v-if="colorMode.value == 'dark'" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const colorCookie = useCookie("colorMode");


function toggleDarkMode() {
  if (colorMode.value !== "dark") {
    colorMode.preference = "dark";
    colorCookie.value = "dark"
  } else {
    colorMode.preference = "light";
    colorCookie.value = "light"

  }
}
</script>
