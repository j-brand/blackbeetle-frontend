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
        <a class="mb-5 block" v-for="(img, index) in album.images" :key="index" :href="getImgPath(img, '_large')" :data-thumb="getImgPath(img, '_thn')" :data-sub-html="img.description">
          <layout-lazy-image class="lg:rounded-md" :src="getImgPath(img, '_thn')" :width="img.width" :height="img.height" :blur="true" :alt="img.title" />
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

import { IAlbum } from "~~/types";
import { apiService } from "~~/lib/api.service";

const gallery = ref(null);

const route = useRoute();

const { formatDate, getImgPath } = useHelper();

const { data: album } = await useAsyncData(`album-${route.params.slug}`, () => apiService.getBySlug<IAlbum>("/album", route.params.slug as string));

useHead({
  title: album.value.title,
  meta: [
    { name: "description", content: album.value.description },
    { name: "og:title", content: `Blackbeetle - ${album.value.title}` },
    { name: "og:description", content: album.value.description },
    { name: "og:image", content: getImgPath(album.value.title_image, "_aslider") },
  ],
});

function initGallery() {
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
