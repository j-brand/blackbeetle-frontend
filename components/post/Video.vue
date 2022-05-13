<template>
  <video v-if="post" controls>
    <source :src="path" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup lang="ts">
import { Post } from "@/types";
import { computed, PropType } from "vue";
const props = defineProps({
  post: { type: Object as PropType<Post>, required: true },
});

const path = computed(() => {
  const content = JSON.parse(props.post.content);
  return `${useRuntimeConfig().public.backendUrl}/${content.path}/${content.filename}`;
});
</script>
