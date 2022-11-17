<template>
  <div v-if="albums" class="flex flex-col items-center gap-3 max-w-screen-md mx-auto">
    <NuxtLink :to="`/gallery/${album.slug}`" v-for="album in albums" :key="album.id" class="mb-6">
      <ImageCardLarge :resource="album" :type="'album'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IAlbums } from "~~/types";

const { data: albums } = await useAsyncData("albums", () => apiService.get<IAlbums>("/album"));
useHead({
  title: "Galerie",
  meta: [{ description: "Ich habe noch nie ein Foto gemacht, wie ich es beabsichtigt hatte. Sie sind immer schlechter oder besser. - Diane Arbus" }],
});
</script>
