<template>
  <ClientOnly>
    <MapContainer
      class="w-full h-112"
      :zoom="content.zoomlevel"
      :coordinates="content.coordinates"
      v-slot="{ map }"
    >
      <MapBounds v-if="content.coordinates?.length" :coordinates="content.coordinates" :map="map" />
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
  const parsed = typeof props.post.content === 'string'
    ? JSON.parse(props.post.content)
    : props.post.content;
  return parsed;
});
</script>
