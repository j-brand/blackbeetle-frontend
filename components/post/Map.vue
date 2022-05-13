<template>
  <GoogleMap class="w-full h-112" :zoom="content.zoomlevel" v-slot="{ map }">
    <GoogleMapMarker v-for="(marker, index) in content.coordinates" :key="index" :position="marker.position" :label="marker.id" :map="map"></GoogleMapMarker>
    <GoogleMapBounds :coordinates="content.coordinates" :map="map"></GoogleMapBounds>
  </GoogleMap>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Post } from "@/types";

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});
const content = computed(() => {
  return JSON.parse(props.post.content);
});
</script>
