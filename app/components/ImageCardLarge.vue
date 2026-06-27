<template>
  <div class="relative overflow-hidden chamfer-xl bb-tile zoom-in lift">
    <template v-if="type === 'album'">
      <div class="absolute flex justify-between items-center top-0 w-full p-6 text-shadow-lg z-10 text-white">
        <span class="font-mono">{{ formatDate(albumResource.start_date, true) }} - {{ formatDate(albumResource.end_date, true) }}</span>
        <div class="flex items-center">
          <IconImages fill="currentColor" /><span class="ml-2 leading-none">{{ albumResource.images_count ?? albumResource.images?.length ?? 0 }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="type === 'story'">
      <div class="absolute flex justify-end items-center top-0 w-full p-6 text-shadow-lg z-10 text-white">
        <div class="flex items-center">
          <IconPosts fill="currentColor" />
          <span class="ml-2 leading-none">{{ storyResource.posts_count }}</span>
        </div>
      </div>
    </template>
    <div class="absolute bottom-0 w-full p-6 md:px-12 z-10 card-content text-white">
      <h1 class="bb-card-title uppercase text-shadow-lg">{{ resource.title }}</h1>
      <span class="bb-card-copy text-shadow-lg hidden md:block lg:w-2/5">{{ getExcerpt(resource.description, 150) }}</span>
    </div>
    <layout-lazy-image
      v-if="resource.title_image"
      class="vignette"
      :src="getBestMediaUrl(resource.title_image, 'large')"
      :lowsrc="resource.title_image.urls?.lazy ?? ''"
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

const { formatDate, getBestMediaUrl, getExcerpt } = useHelper();

const albumResource = props.resource as IAlbum;
const storyResource = props.resource as IStory;
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
.card-content .bb-card-title,
.card-content .bb-card-copy {
  color: #ffffff;
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
