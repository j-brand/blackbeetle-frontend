<template>
  <div class="relative h-96 w-full lg:min-w-[500px] overflow-hidden rounded-[1rem] border" style="border-color: var(--color-line-strong); background: var(--color-sunken)">
    <ClientOnly>
      <LazyMapContainer class="w-full h-full" :zoom="5" :max-zoom="6" :coordinates="locationContent" v-slot="{ map }">
        <MapBounds :coordinates="locationContent" :map="map" />
      </LazyMapContainer>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import type { IOption } from "@/types";

const LazyMapContainer = defineAsyncComponent(() => import("@/components/map/MapContainer.vue"));

interface LocationPoint {
  id: string;
  position: { lat: number; lng: number };
  info: string;
}

const fallbackCoordinate: LocationPoint = {
  id: "fallback-berlin",
  position: { lat: 52.5208, lng: 13.4094 },
  info: "Berlin",
};

const { data: location } = await useAsyncData("my_location", () => apiService.getBySlug<IOption<string>>("/options", "my_location"));

const locationContent = computed<LocationPoint[]>(() => {
  if (!location.value?.value) {
    return [fallbackCoordinate];
  }

  try {
    const parsed = JSON.parse(location.value.value) as {
      position?: { lat: number; lng: number };
      info?: string;
      label?: string;
      id?: string;
    };

    if (parsed?.position?.lat != null && parsed.position.lng != null) {
      return [
        {
          id: parsed.id ?? "api-location",
          position: parsed.position,
          info: parsed.info ?? parsed.label ?? "Berlin",
        },
      ];
    }
  } catch {
    // Ignore invalid backend data and fall back to dummy coordinates.
  }

  return [fallbackCoordinate];
});
</script>

<style scoped></style>
