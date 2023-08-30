<template>
  <div class="swiper-container w-full h-auto overflow-hidden relative cursor-pointer" ref="swiperEle">
    <div class="swiper-wrapper" ref="galleryEle">
      <div class="swiper-slide w-full " v-for="(image, index) in post.images">
        <div class="flex justify-center bg-bb-charcoal bg-opacity-40">
          <img class="max-h-[580px]" :data-large="getImgPath(image, '_large')" :src="getImgPath(image, '_aswipe')" loading="lazy" />
          <span class="hidden" :id="'caption_' + index">{{ image.description }}</span>
        </div>
      </div>
    </div>

    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script setup lang="ts">
import { IPost } from "@/types";

//Lightgallery Imports
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
import Swiper, { Navigation, Pagination } from "swiper";
import { PropType } from "vue";

const { getImgPath } = useHelper();

const galleryEle = ref<HTMLElement | null>(null);
const swiperEle = ref<HTMLElement | any>(null);
const swiperRef = ref(null);
const gallery = ref(null);

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

function initGallery() {
  const dynamicEl = [...galleryEle.value.getElementsByClassName("swiper-slide")].map((slide: HTMLImageElement) => {
    return {
      src: slide.getElementsByTagName("img")[0].getAttribute("data-large"),
      thumb: slide.getElementsByTagName("img")[0].src,
      subHtml: slide.getElementsByTagName("span")[0].innerText,
    };
  });
  gallery.value = lightGallery(galleryEle.value, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail, lgAutoplay, lgFullscreen],
    dynamicEl,
    licenseKey: useRuntimeConfig().public.lgLicenseKey,
  });

  [...galleryEle.value.getElementsByClassName("swiper-slide")].map((slide, index) => {
    slide.addEventListener("click", () => {
      gallery.value.openGallery(index);
    });
  });

  galleryEle.value.addEventListener("lgAfterSlide", (event: any) => {
    swiperRef.value.slideTo(event.detail.index);
  });

  galleryEle.value.addEventListener("lgBeforeOpen", () => {
    document.body.style.overflow = "hidden";
  });

  galleryEle.value.addEventListener("lgAfterClose", (event: any) => {
    document.body.style.overflow = "auto";
  });
}

function destroyGallery() {
  gallery.value.destroy();
}

function refreshGallery() {
  gallery.value.refresh();
}

function initSwiper() {
  swiperRef.value = new Swiper(swiperEle.value, {
    modules: [Navigation, Pagination],
    autoHeight: true,
    slidesPerView: 1,
    initialSlide: 0,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

onMounted(() => {
  initSwiper();
  initGallery();
});

onUnmounted(() => {
  destroyGallery();
});
</script>

<style lang="scss">
.swiper-button-next,
.swiper-button-prev {
  height: 100%;
  top: 1.5rem;
  width: 50px;
  &:focus {
    outline: none;
  }
}

.swiper-button-next {
  right: 0;
}

.swiper-button-prev {
  left: 0;
}
</style>
