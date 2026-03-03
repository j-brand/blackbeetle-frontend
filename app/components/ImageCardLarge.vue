<template>
  <div class="relative text-bb-lighter overflow-hidden rounded-md zoom-in vignette">
    <template v-if="type == 'album'">
      <div class="absolute flex justify-between top-0 w-full p-5 text-shadow-lg z-10">
        <span>{{ formatDate(albumResource.start_date, true) }} - {{ formatDate(albumResource.end_date, true) }}</span>
        <div class="flex">
          <IconImages fill="#EAE7DC" /><span class="ml-2 leading-none">{{ albumResource.images_count ?? albumResource.images?.length ?? 0 }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="type == 'story'">
      <div class="absolute flex justify-end top-0 w-full p-5 text-shadow-lg z-10">
        <div class="flex">
          <IconPosts fill="#EAE7DC" />
          <span class="ml-2 leading-none">{{ storyResource.posts_count }}</span>
        </div>
      </div>
    </template>
    <div class="absolute bottom-0 w-full p-5 md:px-10 z-10 card-content">
      <h1 class="text-2xl md:text-3xl font-bold uppercase text-shadow-lg" v-html="resource.title"></h1>
      <span class="text-lg text-shadow-lg hidden md:block lg:w-2/5" v-html="getExcerpt(resource.description, 150)"></span>
    </div>
    <layout-lazy-image
      class="vignette"
      :src="getMediaUrl(resource.title_image, 'preview')"
      :width="resource.title_image.custom_properties?.width"
      :height="resource.title_image.custom_properties?.height"
      :blur="true"
      :alt="resource.title"
    />
  </div>
</template>

<script setup lang="ts">
import type { IAlbum, IStory } from "@/types";

const props = defineProps<{
  resource: IAlbum | IStory;
  type: "album" | "story";
}>();

const { formatDate, getMediaUrl, getExcerpt } = useHelper();

const albumResource = computed(() => props.resource as IAlbum);
const storyResource = computed(() => props.resource as IStory);
</script>

<style scoped>
.zoom-in img {
  transition: all 0.3s ease-in-out;
}
.zoom-in:hover img {
  transform: scale(1.05);
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
}
.vignette img {
  position: relative;
  z-index: -1; /* position beneath */
}
</style>
