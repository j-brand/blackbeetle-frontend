<template>
  <div class="flex flex-col justify-center items-center 2xl:mt-[5vh]">
    <svg viewBox="0 0 250 50" width="300" class="translate-y-6">
      <path id="curve" class="fill-transparent" d="m 20 90 a 15 10 0 0 1 210 0" />
      <text class="dark:fill-bb-light fill-bb-charcoal transform text-xl" width="300">
        <textPath xlink:href="#curve" startOffset="60">Wo sind die Räuber?</textPath>
      </text>
    </svg>
    <div class="h-96 w-96 rounded-full overflow-hidden border-5 border-bb-charcoal">
      <ClientOnly>
        <MapContainer v-if="location" class="w-full h-112" :zoom="4" v-slot="{ map }">
          <MapMarker :position="locationContent.position" :label="locationContent.info" />
          <MapBounds :coordinates="[locationContent]" :map="map" />
        </MapContainer>
      </ClientOnly>
    </div>
    <NuxtLink to="/blog/back-again" class="-translate-y-9">
      <UiButton class="btn-dark py-2"
        ><span class="flex flex-row">SCHAU ES DIR AN <IconArrow /></span>
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import type { IOption } from "@/types";

// API returns value as JSON string with { lat, lng }
// Fetch single option directly
const { data: location } = await useAsyncData("my_location", () =>
  apiService.getBySlug<IOption<string>>("/options", "my_location")
);

const locationContent = computed(() => {
  if (!location.value?.value) return { position: { lat: 0, lng: 0 }, info: "" };
  
  try {
    // Parse the JSON string from API
    const coords = JSON.parse(location.value.value).position as { lat: number; lng: number };
    return { 
      position: coords, 
      info: "Berlin" // Default label since API doesn't provide it
    };
  } catch {
    return { position: { lat: 0, lng: 0 }, info: "" };
  }
});
</script>

<style>
.spin {
  animation: 15s linear 0s infinite spin_cw;
}

.spin2 {
  animation: 18s linear 0s infinite spin_ccw;
}

@keyframes spin_cw {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin_ccw {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
