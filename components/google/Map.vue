<template>
  <div v-bind="$attrs" class="leaflet-map-container">
    <LMap
      ref="mapRef"
      :zoom="zoom"
      :use-global-leaflet="false"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <slot v-if="map" :map="map" />
    </LMap>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import type { Map as LeafletMap } from "leaflet";

const props = defineProps({
  zoom: { type: Number, default: 4 },
});

const mapRef = ref<InstanceType<typeof LMap> | null>(null);
const map = ref<LeafletMap | null>(null);

function onMapReady(mapInstance: LeafletMap) {
  map.value = mapInstance;
}

defineExpose({ map });
</script>

<style scoped>
.leaflet-map-container {
  width: 100%;
  height: 100%;
}

.leaflet-map-container :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>
