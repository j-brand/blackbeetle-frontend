<template>
  <div class="max-w-full lg:max-w-[600px] mx-auto flex justify-center">
    <Alice />
  </div>
</template>

<script setup lang="ts">
import Alice from "~/components/Alice.vue";

useHead({
  title: "Startseite",
  meta: [
    { name: "description", content: "Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." },
    { property: "og:title", content: "Blackbeetle - Startseite" },
    { property: "og:description", content: "Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." },
  ],
});
</script>
