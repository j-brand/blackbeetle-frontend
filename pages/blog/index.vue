<template>
  <div v-if="stories" class="flex flex-col justify-center items-center pt-40 pb-52 gap-2 max-w-screen-md mx-auto">
    <NuxtLink :to="`/blog/${story.slug}`" v-for="story in stories" :key="story.id" class="mb-6 px-5 lg:px-0">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IStories } from "~~/types";

const { data: stories } = await useAsyncData("stories", () => apiService.get<IStories>("/story"));

useHead({
  title: "Blog",
});
</script>
