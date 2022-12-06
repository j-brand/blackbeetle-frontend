<template>
  <div class="flex flex-col justify-center items-center 2xl:mt-[5vh]">
    <svg viewBox="0 0 250 50" width="300" class="translate-y-6">
      <path id="curve" class="fill-transparent" d="m 20 90 a 15 10 0 0 1 210 0" />
      <text class="dark:fill-bb-light fill-bb-charcoal transform text-xl" width="300">
        <textPath xlink:href="#curve" startOffset="60">Wo sind die Räuber?</textPath>
      </text>
    </svg>
    <div class="h-96 w-96 rounded-full overflow-hidden border-5 border-bb-charcoal">
      <GoogleMap v-if="location" class="w-full h-112" :zoom="4" v-slot="{ map }">
        <GoogleMapMarker :position="content.position" :label="content.info" :map="map"></GoogleMapMarker>
        <GoogleMapBounds :coordinates="[content]" :map="map"></GoogleMapBounds>
      </GoogleMap>
    </div>
    <NuxtLink to="/blog/back-again" class="-translate-y-9">
      <LayoutButton class="btn-dark py-2"
        ><span class="flex flex-row">SCHAU ES DIR AN <IconArrow /></span>
      </LayoutButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IOption } from "~~/types";

const { data: location } = await useAsyncData("location", () => apiService.get<IOption>("/option/my_location"));

const content = computed(() => {
  return JSON.parse(location.value?.content!);
});
</script>

<style lang="scss">
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
