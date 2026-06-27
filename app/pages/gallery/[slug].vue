<template>
  <div>
    <div v-if="errorAlbum" class="text-center py-24 max-w-screen-lg mx-auto">
      <p class="text-xl">Das Album konnte nicht geladen werden. Bitte versuche es später erneut.</p>
    </div>
    <div v-else-if="album" class="max-w-screen-lg mx-auto mb-16 px-6 md:px-0 lg:px-0 flex flex-col justify-between">
      <span class="bb-page-meta flex justify-end mb-2 md:mb-0">
        {{ formatDate(album.start_date, true) }} -
        {{ formatDate(album.end_date, true) }}
      </span>

      <div class="max-w-screen-lg">
        <h2 class="bb-page-section-title mb-3">{{ album.title }}</h2>
        <p class="bb-page-copy" v-html="album.description" />
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto">
      <div ref="gallery" v-if="album" class="gallery-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <a
          v-for="(img, index) in album.images"
          :key="index"
          :class="['bb-tile chamfer-lg group overflow-hidden', getGalleryTileClass(index)]"
          :href="getBestMediaUrl(img, 'large')"
          :data-thumb="getBestMediaUrl(img, 'small')"
          :data-sub-html="img.custom_properties?.description || img.name"
        >
          <layout-lazy-image
            class="w-full h-full"
            :src="getBestMediaUrl(img, 'small')"
            :lowsrc="img.urls?.lazy ?? ''"
            :width="img.custom_properties?.width"
            :height="img.custom_properties?.height"
            :blur="true"
            :alt="img.name"
          />
          <span class="cap">
            <span class="eb">Foto</span>
            <span class="ti">{{ (img.custom_properties?.description as string) || img.name }}</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/light-gallery.css";

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
const { lgLicenseKey } = useRuntimeConfig().public;

const { formatDate, getBestMediaUrl } = useHelper();

const { data: album, error: errorAlbum } = await useAsyncData(`album-${slug}`, () => apiService.getBySlug<IAlbum>("/albums", slug));

useHead({
  title: album.value?.title ?? "",
  meta: [
    { name: "description", content: album.value?.description ?? "" },
    { property: "og:title", content: `Blackbeetle - ${album.value?.title ?? ""}` },
    { property: "og:description", content: album.value?.description ?? "" },
    { property: "og:image", content: album.value?.title_image ? getBestMediaUrl(album.value.title_image, 'large') : "" },
  ],
});

function initGallery() {
  if (!gallery.value) return;
  
  lightGallery(gallery.value, {
    exThumbImage: "data-thumb",
    plugins: [lgZoom, lgThumbnail, lgFullscreen],
    licenseKey: lgLicenseKey,
    preload: 1,
    download: false,
  });
}

function getGalleryTileClass(index: number) {
  const pattern = index % 7;
  switch (pattern) {
    case 0:
      return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
    case 3:
      return "sm:col-span-2 lg:col-span-2";
    case 5:
      return "lg:row-span-2";
    default:
      return "";
  }
}

onMounted(() => {
  initGallery();
});
</script>
