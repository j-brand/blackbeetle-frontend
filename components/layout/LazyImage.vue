<template>
  <img data-sizes="auto" :data-src="src" :src="blur ? lazySrc() : null" class="lazyload blur-up" loading="lazy" />
</template>

<script setup lang="ts">
import "lazysizes";

const props = defineProps({
  src: { type: String, required: true, default: "" },
  blur: { type: Boolean, required: false, default: false },
  lowsrc: { type: String, required: false, default: "" },
});

function lazySrc() {
  if (props.lowsrc) {
    return props.lowsrc;
  } else {
    let split = props.src.split(".");
    split[split.length - 2] = split[split.length - 2].concat("_lazy");
    return split.join(".");
  }
}
</script>

<style lang="scss" scoped>
.blur-up {
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 600ms, -webkit-filter 600ms;
}

.blur-up.lazyloaded {
  -webkit-filter: blur(0);
  filter: blur(0);
}
</style>
