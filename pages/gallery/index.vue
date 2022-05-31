<template>
  <div v-if="albums" class="flex flex-col justify-center items-center pt-40">
    <NuxtLink :to="`/gallery/${album.slug}`" v-for="album in albums.data.value" :key="album.id" class="mb-6 px-5 lg:px-0">
      <ImageCardLarge :resource="album" :type="'album'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { $albumRepository } = useNuxtApp();

//const albums = await useAsyncData("albums", () => $albumRepository.index());

const albums = await useAsyncData("albums", () => $fetch("/api/album"));

useHead({
  title: "Galerie",
});

</script>
