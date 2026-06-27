<template>
  <div v-if="errorAlbums" class="text-center py-24 mx-auto">
    <p class="text-xl">Die Alben konnten nicht geladen werden. Bitte versuche es später erneut.</p>
  </div>
  <div v-else-if="albums" class="flex flex-col items-center gap-3 mx-auto">
    <NuxtLink :to="`/gallery/${album.slug}`" v-for="album in albums" :key="album.id" class="mb-6">
      <ImageCardLarge :resource="album" :type="'album'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import type { IAlbum } from "@/types";

const { data: albums, error: errorAlbums } = await useAsyncData("albums", () => apiService.get<IAlbum[]>("/albums"));
useHead({
  title: "Galerie",
  meta: [
    { name:"description", content: "Ich habe noch nie ein Foto gemacht, wie ich es beabsichtigt hatte. Sie sind immer schlechter oder besser. - Diane Arbus" },
    { property: "og:title", content: "Blackbeetle - Galerie" },
    { property: "og:description", content: "Ich habe noch nie ein Foto gemacht, wie ich es beabsichtigt hatte. Sie sind immer schlechter oder besser. - Diane Arbus" },
  ],
});
</script>
