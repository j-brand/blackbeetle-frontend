<template>
  <div v-bind="$attrs" class="leaflet-map-container">
    <LMap
      ref="mapRef"
      :center="center"
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
      <LMarker
        v-for="(marker, index) in coordinates"
        :key="index"
        :lat-lng="[marker.position.lat, marker.position.lng]"
        @ready="(leafletMarker: L.Marker) => onMarkerReady(leafletMarker, marker.id)"
      >
        <LIcon
          icon-url="/img/leaflet/marker-icon.png"
          icon-retina-url="/img/leaflet/marker-icon-2x.png"
          shadow-url="/img/leaflet/marker-shadow.png"
          :icon-size="[25, 41]"
          :icon-anchor="[12, 41]"
          :popup-anchor="[1, -34]"
          :shadow-size="[41, 41]"
        />
      </LMarker>
      <slot v-if="map" :map="map" />
    </LMap>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import type { Map as LeafletMap, Marker } from "leaflet";

const props = defineProps({
  center: { type: Array as unknown as () => [number, number], default: () => [0, 0] },
  zoom: { type: Number, default: 4 },
  coordinates: {
    type: Array as unknown as () => Array<{ position: { lat: number; lng: number }; id?: string }>,
    default: () => [],
  },
});

const map = ref<LeafletMap | null>(null);

function onMapReady(mapInstance: LeafletMap) {
  map.value = mapInstance;
}

function onMarkerReady(leafletMarker: Marker, id?: string) {
  if (id) {
    leafletMarker.bindTooltip(id, { permanent: true, direction: "top", offset: [0, -30] });
  }
}

defineExpose({ map });
</script>

<style scoped>
.leaflet-map-container :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>
