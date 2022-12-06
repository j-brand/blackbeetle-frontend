<template>
  <div>
    <Countdown :date-string="countdownDate" v-if="showCountdown" />
    <MapCircle v-else />

    <img v-if="colorMode.value == 'light'" src="/img/eggs.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
    <img v-if="colorMode.value == 'dark'" src="/img/eggs_dark.svg" alt="Eier" class="absolute right-0 bottom-[178px] md:bottom-[108px] h-10 md:h-16" />
  </div>
</template>

<script setup lang="ts">
const countdownDate = "January 4, 2022 15:15:00";

const showCountdown = new Date(countdownDate) > new Date();

useHead({
  title: "",
});

const colorMode = useColorMode();
</script>
