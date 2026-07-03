<script setup lang="ts">
import type { Map as LeafletMap, LatLngBoundsExpression } from "leaflet";

interface MapBoundsProps {
  // @vue-leaflet/vue-leaflet's LMap emits a structurally looser Map type via its
  // scoped slot than @types/leaflet's Map class expects (circular Layer[]._map
  // generic mismatch), so this can't be typed as LeafletMap without a false-positive
  // compile error at every call site. Cast to LeafletMap internally instead.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  coordinates?: Array<{ position: { lat: number; lng: number }; id?: string }>;
}

const props = defineProps<MapBoundsProps>();

function fitBounds(mapInstance: LeafletMap | null, coords: typeof props.coordinates) {
  if (mapInstance && coords && coords.length > 0) {
    const bounds: LatLngBoundsExpression = coords.map(
      (marker) => [marker.position.lat, marker.position.lng] as [number, number]
    );
    nextTick(() => {
      mapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: mapInstance.getMaxZoom() });
    });
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
