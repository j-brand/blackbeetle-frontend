<template>
  <div class="max-w-full lg:max-w-[600px] mx-auto">
    <Card eyebrow="Standort" title="Wo sind die Räuber?" variant="primary">
      <MapEmbed />
      <template #actions>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import MapEmbed from '@/components/MapEmbed.vue'
useHead({
  title: "Startseite",
  meta: [
    { name: "description", content: "Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." },
    { property: "og:title", content: "Blackbeetle - Startseite" },
    { property: "og:description", content: "Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." },
  ],
});

</script>

