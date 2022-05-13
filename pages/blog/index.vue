<template>
  <div v-if="stories" class="flex flex-col justify-center items-center pt-40">

  
    <NuxtLink :to="`/blog/${story.slug}`" v-for="story in stories.data.value" :key="story.id" class="mb-6 px-5 lg:px-0">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const { $storyRepository } = useNuxtApp();

const stories = await useAsyncData("stories", () => $storyRepository.index());


</script>
