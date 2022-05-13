<template>
  <div class="flex flex-col rounded-lg px-5 lg:p-0 my-8">
    <div class="flex flex-col md:flex-row justify-between mb-2">
      <span class="md:order-2 md:text-xl">{{ $formatDate(post.date) }}</span>
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
    </div>
    <article v-html="post.content" class="text-lg  md:text-xl html-post"></article>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/types';
import { PropType } from 'vue';



const { $formatDate } = useNuxtApp();

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  }
})

</script>
