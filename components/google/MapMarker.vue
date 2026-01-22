<template>
  <LMarker :lat-lng="latLng">
    <LPopup v-if="label">{{ label }}</LPopup>
  </LMarker>
</template>

<script setup lang="ts">
import { LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import type { LatLngExpression } from "leaflet";

const props = defineProps({
  position: {
    type: Object as () => { lat: number; lng: number },
    required: true,
  },
  label: { type: String },
});

const latLng = computed<LatLngExpression>(() => [props.position.lat, props.position.lng]);
</script>
