<template>
  <div class="lazy-image-wrapper" :style="wrapperStyle">
    <img
      v-if="blur && lowsrc && !placeholderHidden"
      :src="lowsrc"
      class="lazy-placeholder"
      alt=""
      aria-hidden="true"
    />
    <img
      ref="imgEl"
      :src="src"
      :srcset="srcset || undefined"
      :sizes="srcset ? sizes || undefined : undefined"
      :width="width || undefined"
      :height="height || undefined"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      class="lazy-image"
      :class="{ loaded: isLoaded, cover }"
      :alt="alt"
      @load="onLoad"
      @error="onError"
      @transitionend="onTransitionEnd"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true, default: "" },
  blur: { type: Boolean, required: false, default: true },
  lowsrc: { type: String, required: false, default: "" },
  srcset: { type: String, required: false, default: "" },
  sizes: { type: String, required: false, default: "100vw" },
  width: { type: [Number, String], required: false, default: undefined },
  height: { type: [Number, String], required: false, default: undefined },
  eager: { type: Boolean, required: false, default: false },
  // Fill the container (object-fit: cover). On by default to match the
  // `.bb-tile img` convention; pass :cover="false" to keep the natural ratio.
  cover: { type: Boolean, required: false, default: true },
  alt: { type: String, required: false, default: "" },
});

const imgEl = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);
const hasError = ref(false);
// The blurred placeholder stays mounted UNDER the real image and is only
// removed once the real image has fully faded in (transitionend). This
// prevents the background flashing through during the fade.
const placeholderHidden = ref(false);

const wrapperStyle = computed(() => {
  if (props.width && props.height) {
    return { aspectRatio: `${props.width} / ${props.height}` };
  }
  return {};
});

function onLoad() {
  isLoaded.value = true;
}

function onError() {
  hasError.value = true;
  isLoaded.value = true;
  placeholderHidden.value = true;
}

function onTransitionEnd() {
  if (isLoaded.value) placeholderHidden.value = true;
}

onMounted(() => {
  // Cached images may finish before the @load listener attaches and would
  // otherwise stay stuck at opacity: 0.
  if (imgEl.value?.complete && imgEl.value.naturalWidth > 0) {
    isLoaded.value = true;
    placeholderHidden.value = true;
  }
});
</script>

<style scoped>
.lazy-image-wrapper {
  position: relative;
  overflow: hidden;
}

.lazy-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(12px);
  transform: scale(1.08);
}

.lazy-image {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}

/* Fill the wrapper/tile instead of keeping the intrinsic ratio. */
.lazy-image.cover {
  height: 100%;
  object-fit: cover;
}

.lazy-image.loaded {
  opacity: 1;
}
</style>
