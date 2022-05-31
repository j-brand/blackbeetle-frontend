<template>
  <div class="relative text-bb-lighter overflow-hidden rounded-md zoom-in vignette">
    <template v-if="type == 'album'">
      <div class="absolute flex justify-between top-0 w-full p-5 text-shadow-lg z-10">
        <span>{{ $formatDate(resource.start_date, true) }} - {{ $formatDate(resource.end_date, true) }}</span>
        <div class="flex">
          <IconImages fill="#EAE7DC" /><span class="ml-2 leading-none">{{ resource.images_count }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="type == 'story'">
      <div class="absolute flex justify-end top-0 w-full p-5 text-shadow-lg z-10">
        <div class="flex">
          <IconPosts fill="#EAE7DC" />
          <span class="ml-2 leading-none">{{ resource.posts_count }}</span>
        </div>
      </div>
    </template>
    <div class="absolute bottom-0 w-full p-5 md:px-10 z-10 card-content">
      <h1 class="text-2xl md:text-3xl font-bold uppercase text-shadow-lg" v-html="resource.title"></h1>
      <span class="text-lg text-shadow-lg hidden md:block lg:w-2/5" v-html="$getExcerpt(resource.description, 150)"></span>
    </div>
    <img class="vignette" height="500" width="1000" :src="$getImgPath(resource.title_image, '_aslider')" loading="lazy" />
  </div>
</template>

<script setup>
const props = defineProps(["resource", "type"]);

const { $formatDate, $getImgPath, $getExcerpt } = useNuxtApp();
</script>

<style lang="scss" scoped>
.zoom-in {
  img {
    transition: all 0.3s ease-in-out;
  }
  &:hover img {
    transform: scale(1.05);
  }
}
.card-content {
  background: linear-gradient(hsl(0 0% 0% / 0), hsl(0 0% 10% / 1));
}
.vignette {
  -webkit-box-shadow: inset 0px 0px 85px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: inset 0px 0px 85px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0px 0px 85px rgba(0, 0, 0, 0.4);

  line-height: 0; /* ensure no space between bottom */

  display: inline-block; /* don't go wider than image */
  img {
    position: relative;
    z-index: -1; /* position beneath */
  }
}
</style>
