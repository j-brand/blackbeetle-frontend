<template></template>

<script setup lang="ts">
import type { Map as LeafletMap, LatLngBoundsExpression } from "leaflet";

interface MapBoundsProps {
  // Accept any object since Vue's scoped slots don't preserve exact types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  coordinates?: Array<{ position: { lat: number; lng: number } }>;
}

const props = defineProps<MapBoundsProps>();

function fitBounds(mapInstance: LeafletMap, coords: typeof props.coordinates) {
  if (mapInstance && coords && coords.length > 0) {
    const bounds: LatLngBoundsExpression = coords.map(
      (marker) => [marker.position.lat, marker.position.lng] as [number, number]
    );
    mapInstance.fitBounds(bounds, { padding: [50, 50] });
  }
}

onMounted(() => {
  if (props.coordinates) {
    fitBounds(props.map as LeafletMap, props.coordinates);
  }
});

watch(
  () => props.coordinates,
  (newCoords) => {
    if (newCoords) fitBounds(props.map as LeafletMap, newCoords);
  },
  { deep: true }
);
</script>
