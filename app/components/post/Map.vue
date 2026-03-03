<template>
  <ClientOnly>
    <MapContainer class="w-full h-112" :zoom="content.zoomlevel" v-slot="{ map }">
      <MapMarker
        v-for="(marker, index) in content.coordinates"
        :key="index"
        :position="marker.position"
        :label="marker.info"
      />
      <MapBounds :coordinates="content.coordinates" :map="map" />
    </MapContainer>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { IPost } from "@/types";

const props = defineProps<{
  post: IPost;
}>();

const content = computed(() => {
  // Handle both string (old API) and object (new API) formats
  if (typeof props.post.content === 'string') {
    return JSON.parse(props.post.content);
  }
  return props.post.content;
});
</script>
