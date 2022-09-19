<template>
  <div v-if="stories" class="container mx-auto pt-40 flex flex-col gap-2">
    <NuxtLink  :to="`/blog/${story.slug}`" v-for="story in stories" :key="story.id" class="mb-6 px-5 lg:px-0 w-full">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IStories } from "@/types";

const { data: stories } = await useAsyncData("stories", () => apiService.get<IStories>("/story"));

useHead({
  title: "Blog",
});
</script>
