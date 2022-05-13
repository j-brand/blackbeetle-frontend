<template>
  <div v-bind="$attrs" ref="mapRef"></div>
  <template v-if="Boolean(map)">
    <slot :map="map" />
  </template>
</template>

<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
import { IGoogleMapsAPI, IMap } from "@/types/gmap";
import { mapStyles } from "@/conf/gmap-style";

const props = defineProps({
  zoom: Number,
  apiKey: String,
});

const mapRef = ref<HTMLElement | null>(null);
const map = ref<IMap | null>(null);
const api = ref<IGoogleMapsAPI | null>(null);
const loader = new Loader({
  apiKey: useRuntimeConfig().public.googleApiKey,
  version: "weekly",
});

function initMap() {
  const { Map } = (api.value = google.maps);
  map.value = new Map(mapRef.value as HTMLElement, {
    zoom: props.zoom,
    clickableIcons: false,
    streetViewControl: false,
    gestureHandling: "cooperative",
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
  });

  const style = new google.maps.StyledMapType(mapStyles, { name: "Styled Map" });

  map.value.mapTypes.set("styled_map", style);
  map.value.setMapTypeId("styled_map");
}

function initLoader() {
  if (!window.google) {
    loader.load().then(() => initMap());
  } else {
    initMap();
  }
}

onMounted(initLoader);
</script>
