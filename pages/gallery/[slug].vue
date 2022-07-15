<template>
  <div class="pt-40 pb-10">
    <div v-if="album" class="container mx-auto mb-24 px-5 md:px-0 lg:px-0 flex flex-col justify-between">
      <span class="text-lg flex justify-end mb-10 md:mb-0">
        {{ $formatDate(album.start_date, true) }} -
        {{ $formatDate(album.end_date, true) }}
      </span>

      <div class="max-w-screen-lg">
        <h2 class="text-3xl mb-3">{{ album.title }}</h2>
        <p class="text-lg">{{ album.description }}</p>
      </div>
    </div>

    <div class="container mx-auto">
      <lightgallery class="columns-4 gap-5" id="lightgallery" v-if="album" :settings="{ speed: 500, plugins: plugins }">
        <a v-for="(img, index) in album.images" :key="index" :href="$getImgPath(img, '_large')" class="mb-5 block" :data-sub-html="'#caption_' + index">
          <nuxt-img class="rounded-md" :src="$getImgPath(img, '_thn')" loading="lazy" />
          <div class="hidden" :id="'caption_' + index">{{ img.description }}</div>
        </a>
      </lightgallery>
    </div>
  </div>
</template>

<script setup lang="ts">
//Lighgallery Imports (Style, Plugins)
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/scss/lightgallery.scss";
import { Album } from "~~/types";

const route = useRoute();

const { $formatDate, $getImgPath, $albumRepository } = useNuxtApp();

const { data: album } = await useAsyncData("album", () => $albumRepository.show(route.params.slug));

useHead({
  title: album.value.title,
  meta: [
    { name: "description", content: album.value.description },
    { name: "og:title", content: `Blackbeetle - ${album.value.title}` },
    { name: "og:description", content: album.value.description },
    { name: "og:image", content: $getImgPath(album.value.title_image, "_aslider") },
  ],
});

const plugins = [lgZoom, lgThumbnail];
</script>
