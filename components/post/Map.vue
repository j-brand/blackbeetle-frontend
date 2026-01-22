<template>
  <ClientOnly>
    <GoogleMap class="w-full h-112" :zoom="content.zoomlevel" v-slot="{ map }">
      <GoogleMapMarker
        v-for="(marker, index) in content.coordinates"
        :key="index"
        :position="marker.position"
        :label="marker.info"
      />
      <GoogleMapBounds :coordinates="content.coordinates" :map="map" />
    </GoogleMap>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { IPost } from "@/types";

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

const content = computed(() => {
  return JSON.parse(props.post.content);
});
</script>
