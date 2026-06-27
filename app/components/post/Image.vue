<template>
  <div class="cut-frame chamfer-lg lift" style="--bd:var(--color-line)">
    <div class="cut-inner chamfer-lg overflow-hidden" style="--sf:var(--color-card)">
      <div class="swiper-container w-full h-auto overflow-hidden relative cursor-pointer" ref="swiperEle">
        <div class="swiper-wrapper" ref="galleryEle">
          <div class="swiper-slide w-full min-w-0" v-for="(image, index) in post.images" :key="image.id ?? index">
            <div class="flex justify-center bg-sunken max-h-[576px] overflow-hidden">
              <img class="w-full max-w-full object-cover"
                :src="image.urls?.lazy ?? ''"
                :data-src="getBestMediaUrl(image, 'medium')"
                :data-large="getBestMediaUrl(image, 'large')"
                :data-thumb="getBestMediaUrl(image, 'small', 'medium')"
                :height="(image.custom_properties?.height as number) || undefined"
                :width="(image.custom_properties?.width as number) || undefined"
                :alt="(image.custom_properties?.description as string) || image.name || 'Bild'" />
              <span class="hidden" :id="'caption_' + index">{{ (image.custom_properties?.description as string) || image.name }}</span>
            </div>
          </div>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <div v-if="(post.images?.length ?? 0) > 1" class="slider-counter">
          <span class="font-mono text-[11px]">{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(post.images?.length ?? 0).padStart(2, '0') }}</span>
        </div>

        <div v-if="activeCaption" class="slider-caption">
          <p class="font-display font-semibold text-sm md:text-base tracking-tight text-white">{{ activeCaption }}</p>
        </div>

        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPost } from "@/types";
import "@/assets/css/swiper.css";
import "@/assets/css/light-gallery.css";

import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.umd.js";
import lgZoom from "lightgallery/plugins/zoom/lg-zoom.umd.js";
import lgAutoplay from "lightgallery/plugins/autoplay/lg-autoplay.umd.js";
import lgFullscreen from "lightgallery/plugins/fullscreen/lg-fullscreen.umd.js";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-thumbnail.scss";
import "lightgallery/scss/lg-autoplay.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-fullscreen.scss";

// Swiper Js Imports
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const { getBestMediaUrl } = useHelper();
const { lgLicenseKey } = useRuntimeConfig().public;

const galleryEle = ref<HTMLElement | null>(null);
const swiperEle = ref<HTMLElement | null>(null);
const swiperRef = ref<Swiper | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gallery = ref<ReturnType<typeof lightGallery> | null>(null);

const props = defineProps<{
  post: IPost;
}>();

const activeIndex = ref(0);
const activeCaption = computed(() => {
  const img = props.post.images?.[activeIndex.value];
  return (img?.custom_properties?.description as string) || '';
});

const isVisible = ref(false);
let observer: IntersectionObserver | null = null;

function initGallery() {
  if (!galleryEle.value) return;
  
  const dynamicEl = [...galleryEle.value.getElementsByClassName("swiper-slide")].map((slide) => {
    const img = slide.getElementsByTagName("img")[0];
    const span = slide.getElementsByTagName("span")[0];
    return {
      src: img?.getAttribute("data-large") || "",
      thumb: img?.getAttribute("data-thumb") || img?.src || "",
      subHtml: span?.innerText || "",
    };
  });
  gallery.value = lightGallery(galleryEle.value, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail, lgAutoplay, lgFullscreen],
    dynamicEl,
    licenseKey: lgLicenseKey,
    preload: 1,
    download: false,
  });

  [...galleryEle.value.getElementsByClassName("swiper-slide")].forEach((slide, index) => {
    slide.addEventListener("click", () => {
      gallery.value?.openGallery(index);
    });
  });

  galleryEle.value.addEventListener("lgAfterSlide", (event) => {
    const detail = (event as CustomEvent).detail;
    swiperRef.value?.slideTo(detail.index);
  });

  galleryEle.value.addEventListener("lgBeforeOpen", () => {
    document.body.style.overflow = "hidden";
  });

  galleryEle.value.addEventListener("lgAfterClose", () => {
    document.body.style.overflow = "auto";
  });
}

function destroyGallery() {
  gallery.value?.destroy();
}

function loadSlidesAt(swiper: Swiper, indices: number[]) {
  indices.forEach(i => {
    const slide = swiper.slides[i];
    if (!slide) return;
    const img = slide.querySelector('img[data-src]') as HTMLImageElement | null;
    if (img?.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}

function initSwiper() {
  if (!swiperEle.value) return;

  const container = swiperEle.value;
  swiperRef.value = new Swiper(container, {
    modules: [Navigation, Pagination],
    autoHeight: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    initialSlide: 0,
    pagination: {
      el: container.querySelector('.swiper-pagination') as HTMLElement,
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: container.querySelector('.swiper-button-next') as HTMLElement,
      prevEl: container.querySelector('.swiper-button-prev') as HTMLElement,
    },
    on: {
      init(swiper) {
        loadSlidesAt(swiper, [0]);
      },
      slideChange(swiper) {
        const i = swiper.activeIndex;
        activeIndex.value = i;
        loadSlidesAt(swiper, [i - 1, i, i + 1]);
      },
    },
  });
}

onMounted(() => {
  if (!swiperEle.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !isVisible.value) {
        isVisible.value = true;
        initSwiper();
        initGallery();
        observer?.disconnect();
        observer = null;
      }
    },
    { rootMargin: '200px' },
  );
  observer.observe(swiperEle.value);
});

onUnmounted(() => {
  observer?.disconnect();
  destroyGallery();
});
</script>

