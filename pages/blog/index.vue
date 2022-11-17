<template>
  <div v-if="stories" class="flex flex-col justify-center items-center gap-2 max-w-screen-md mx-auto overflow-y-hidden">
    <NuxtLink :to="`/blog/${story.slug}`" v-for="story in stories" :key="story.id" class="mb-6">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IStories } from "~~/types";

const { data: stories } = await useAsyncData("stories", () => apiService.get<IStories>("/story"));

useHead({
  title: "Geschichten",
  meta: [{ description: "Storytelling is not something we do. Storytelling is who we are. - Carmine Gallo" }],
});
</script>
