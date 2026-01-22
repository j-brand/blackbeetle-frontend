<template>
  <div class="lazy-image-wrapper">
    <img
      v-if="showPlaceholder"
      :src="placeholderSrc"
      class="lazy-placeholder"
      aria-hidden="true"
    />
    <img
      :src="src"
      loading="lazy"
      class="lazy-image"
      :class="{ loaded: isLoaded }"
      @load="onLoad"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true, default: "" },
  blur: { type: Boolean, required: false, default: true },
  lowsrc: { type: String, required: false, default: "" },
});

const isLoaded = ref(false);
const showPlaceholder = computed(() => props.blur && !isLoaded.value);

const placeholderSrc = computed(() => {
  if (props.lowsrc) {
    return props.lowsrc;
  }
  const split = props.src.split(".");
  split[split.length - 2] = split[split.length - 2].concat("_lazy");
  return split.join(".");
});

function onLoad() {
  isLoaded.value = true;
}
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
  filter: blur(10px);
  transform: scale(1.1);
}

.lazy-image {
  opacity: 0;
  transition: opacity 600ms ease-in-out;
}

.lazy-image.loaded {
  opacity: 1;
}
</style>
