<template>
  <div v-if="albums" class="flex flex-col justify-center items-center pt-40">
    <NuxtLink :to="`/gallery/${album.slug}`" v-for="album in albums" :key="album.id" class="mb-6 px-5 lg:px-0">
      <ImageCardLarge :resource="album" :type="'album'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IAlbums } from "@/types";

const { data: albums } = await useAsyncData("albums", () => apiService.get<IAlbums>("/album"));
useHead({
  title: "Galerie",
});
</script>
