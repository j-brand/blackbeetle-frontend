<template></template>

<script setup lang="ts">
import type { Map as LeafletMap, LatLngBoundsExpression } from "leaflet";

const props = defineProps({
  map: {
    type: Object as () => LeafletMap,
    required: true,
  },
  coordinates: {
    type: Array as () => Array<{ position: { lat: number; lng: number } }>,
    required: true,
  },
});

onMounted(() => {
  if (props.map && props.coordinates.length > 0) {
    const bounds: LatLngBoundsExpression = props.coordinates.map(
      (marker) => [marker.position.lat, marker.position.lng] as [number, number]
    );
    props.map.fitBounds(bounds, { padding: [50, 50] });
  }
});

watch(
  () => props.coordinates,
  (newCoords) => {
    if (props.map && newCoords.length > 0) {
      const bounds: LatLngBoundsExpression = newCoords.map(
        (marker) => [marker.position.lat, marker.position.lng] as [number, number]
      );
      props.map.fitBounds(bounds, { padding: [50, 50] });
    }
  },
  { deep: true }
);
</script>
