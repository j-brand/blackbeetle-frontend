<template>
  <iframe
    v-if="content.path == 'youtube'"
    class="w-100 min-h-[280px] md:min-h-[435px]"
    :src="`https://www.youtube-nocookie.com/embed/${content.filename}?rel=0&showinfo=0&contorls=2&controls=2`"
    title="YouTube video player"
    frameborder="0"
    color="white"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    anonymous
  ></iframe>

  <video v-else preload="none" controls>
    <source :src="path" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup lang="ts">
import type { IPost } from "@/types";

const props = defineProps<{
  post: IPost;
}>();

const content = computed(() => {
  // Handle both string (old API) and object (new API) formats
  if (typeof props.post.content === 'string') {
    return JSON.parse(props.post.content);
  }
  return props.post.content;
});

const path = computed(() => {
  return `${useRuntimeConfig().public.backendUrl}/${content.value.path}/${content.value.filename}`;
});
</script>
 