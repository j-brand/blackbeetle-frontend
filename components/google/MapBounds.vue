<template></template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  map: {
    type: Object as PropType<google.maps.Map>,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
});

const bounds = new google.maps.LatLngBounds();

props.coordinates.forEach((marker: any) => {
  bounds.extend(new google.maps.LatLng(marker.position));
});

props.map.setCenter(bounds.getCenter());
</script>
