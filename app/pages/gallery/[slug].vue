<template>
  <div>
    <div v-if="album" class="max-w-screen-lg mx-auto mb-16 px-5 md:px-0 lg:px-0 flex flex-col justify-between">
      <span class="text-lg flex justify-end mb-2 md:mb-0 dark:text-bb-light">
        {{ formatDate(album.start_date, true) }} -
        {{ formatDate(album.end_date, true) }}
      </span>

      <div class="max-w-screen-lg">
        <h2 class="text-3xl mb-3">{{ album.title }}</h2>
        <p class="text-lg">{{ album.description }}</p>
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto">
      <div class="md:columns-3 lg:columns-4 gap-5" ref="gallery" v-if="album">
        <a class="mb-5 block" v-for="(img, index) in album.images" :key="index" :href="getMediaUrl(img, 'original')" :data-thumb="getMediaUrl(img, 'thumb')" :data-sub-html="img.custom_properties?.description || img.name">
          <layout-lazy-image class="lg:rounded-md" :src="getMediaUrl(img, 'thumb')" :width="img.custom_properties?.width" :height="img.custom_properties?.height" :blur="true" :alt="img.name" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//Lighgallery Imports (Style, Plugins)
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.umd.js";
import lgZoom from "lightgallery/plugins/zoom/lg-zoom.umd.js";
import lgFullscreen from "lightgallery/plugins/fullscreen/lg-fullscreen.umd.js";

import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-thumbnail.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-fullscreen.scss";

import type { IAlbum } from "@/types";
import { apiService } from "@/lib/api.service";

const gallery = ref<HTMLElement | null>(null);

const route = useRoute();
const slug = 'slug' in route.params ? String(route.params.slug) : '';

const { formatDate, getMediaUrl } = useHelper();

const { data: album } = await useAsyncData(`album-${slug}`, () => apiService.getBySlug<IAlbum>("/albums", slug));

useHead({
  title: album.value?.title ?? "",
  meta: [
    { name: "description", content: album.value?.description ?? "" },
    { name: "og:title", content: `Blackbeetle - ${album.value?.title ?? ""}` },
    { name: "og:description", content: album.value?.description ?? "" },
    { name: "og:image", content: album.value?.title_image ? getMediaUrl(album.value.title_image, "preview") : "" },
  ],
});

function initGallery() {
  if (!gallery.value) return;
  
  lightGallery(gallery.value, {
    exThumbImage: "data-thumb",
    plugins: [lgZoom, lgThumbnail, lgFullscreen],
    licenseKey: useRuntimeConfig().public.lgLicenseKey,
  });
}

onMounted(() => {
  initGallery();
});
</script>
