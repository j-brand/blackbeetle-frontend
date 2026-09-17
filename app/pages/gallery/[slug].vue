<template>
  <div>
    <div v-if="errorAlbum" class="text-center py-24 max-w-screen-lg mx-auto">
      <p class="text-xl bb-blur-behind">Das Album konnte nicht geladen werden. Bitte versuche es später erneut.</p>
    </div>
    <div v-else-if="album" class="max-w-screen-lg mx-auto mb-16 px-6 md:px-0 lg:px-0 flex flex-col justify-between">
      <span class="bb-page-meta flex justify-end mb-2 md:mb-0 bb-blur-behind">
        {{ formatDate(album.start_date, true) }} -
        {{ formatDate(album.end_date, true) }}
      </span>

      <div class="max-w-screen-lg">
        <h2 class="bb-page-section-title mb-3 bb-blur-behind">{{ album.title }}</h2>
        <p class="bb-page-copy bb-blur-behind" v-html="albumDescription" />
      </div>
    </div>

    <div class="gallery-shell max-w-screen-lg mx-auto">
      <div ref="gallery" v-if="album" class="gallery-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <a
          v-for="{ image, tile, caption } in tiles"
          :key="image.id"
          :class="['bb-tile chamfer-lg group overflow-hidden', tile.class]"
          :style="tile.style"
          :href="getBestMediaUrl(image, 'webp', 'large')"
          :data-thumb="getBestMediaUrl(image, 'thumb', 'medium')"
          :data-sub-html="caption"
          :aria-label="caption"
        >
          <layout-lazy-image
            class="w-full h-full"
            :src="getBestMediaUrl(image, 'large')"
            :srcset="getMediaSrcset(image)"
            :sizes="tile.sizes"
            :lowsrc="image.urls?.lazy ?? ''"
            :width="(image.custom_properties?.width as number) || undefined"
            :height="(image.custom_properties?.height as number) || undefined"
            :blur="true"
            :alt="getAltText(image)"
          />
          <span class="cap">
            <span class="eb">{{ album.title }}</span>
            <span class="ti">{{ caption }}</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.umd.js";
import lgZoom from "lightgallery/plugins/zoom/lg-zoom.umd.js";
import lgFullscreen from "lightgallery/plugins/fullscreen/lg-fullscreen.umd.js";

import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-thumbnail.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-fullscreen.scss";
import "@/assets/css/light-gallery.css";

import type { IAlbum } from "@/types";
import { apiService } from "@/lib/api.service";

const gallery = ref<HTMLElement | null>(null);

const route = useRoute();
const slug = 'slug' in route.params ? String(route.params.slug) : '';
const { lgLicenseKey } = useRuntimeConfig().public;

const { formatDate, getBestMediaUrl, getMediaSrcset } = useHelper();
const { sanitizeHtml } = useSanitize();
const { getTile, getCaption, getAltText } = useGalleryLayout();

const { data: album, error: errorAlbum } = await useAsyncData(`album-${slug}`, () => apiService.getBySlug<IAlbum>("/albums", slug));

const albumDescription = computed(() => sanitizeHtml(album.value?.description));

// Resolve each tile once instead of calling the composable repeatedly from the
// template; keeps SSR and client output identical.
const tiles = computed(() =>
  (album.value?.images ?? []).map((image) => ({
    image,
    tile: getTile(image),
    caption: getCaption(image),
  })),
);

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

onMounted(() => {
  initGallery();
});
</script>
