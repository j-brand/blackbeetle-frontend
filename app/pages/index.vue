<template>
  <div>
    <MapCircle />

    <ClientOnly>
      <img v-if="colorMode.value == 'light'" src="/img/eggs.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
      <img v-if="colorMode.value == 'dark'" src="/img/eggs_dark.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "",
});

const colorMode = useColorMode();
</script>
