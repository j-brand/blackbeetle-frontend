<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <Alice class="w-full mb-16" />
    <img v-if="colorMode.value == 'light'" src="/img/eggs.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
    <img v-if="colorMode.value == 'dark'" src="/img/eggs_dark.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home",
});

const colorMode = useColorMode();
</script>
