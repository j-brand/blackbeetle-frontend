<template>
  <div class="flex flex-col justify-center items-center 2xl:mt-[5vh]">
    <div class="cut-frame   chamfer-lg lift w-full max-w-[1400px]" style="--bd: var(--color-line); outline: 2px dashed rgba(220,38,38,0.5);">
      <div class="cut-inner chamfer-lg bg-primary p-6 md:p-8" style="--sf: var(--color-card); background: var(--color-card)">
        <div class="mb-6 flex flex-col gap-3">
          <span class="font-mono text-[11px] uppercase tracking-[0.16em]" style="color: var(--color-accent)">Standort</span>
          <h2 class="bb-card-title">Wo sind die Räuber?</h2>
        </div>

        <div class="relative h-96 w-full lg:min-w-[500px] overflow-hidden rounded-[1rem] border" style="border-color: var(--color-line-strong); background: var(--color-sunken)">
          <ClientOnly>
            <MapContainer class="w-full h-full" :zoom="5" :max-zoom="6" :coordinates="locationContent" v-slot="{ map }">
              <MapBounds :coordinates="locationContent" :map="map" />
            </MapContainer>
          </ClientOnly>
        </div>
        <NuxtLink to="/blog/back-again" class="mt-6">
          <UiButton class="mt-4" variant="accent" size="sm" iconPosition="end">
            SCHAU ES DIR AN

            <template #icon>
              <IconArrow />
            </template>
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import type { IOption } from "@/types";

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
