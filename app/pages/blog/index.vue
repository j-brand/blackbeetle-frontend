<template>
  <div v-if="errorStories" class="text-center py-24 w-full mx-auto">
    <p class="text-xl">Die Geschichten konnten nicht geladen werden. Bitte versuche es später erneut.</p>
  </div>
  <div v-else-if="stories" class="flex flex-col justify-center items-center gap-2 w-full max-w-5xl mx-auto overflow-y-hidden">
    <NuxtLink :to="`/blog/${story.slug}`" v-for="story in stories" :key="story.id" class="mb-6">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import type { IStory } from "@/types";

const { data: stories, error: errorStories } = await useAsyncData("stories", () => apiService.get<IStory[]>("/stories"));

useHead({
  title: "Geschichten",
  meta: [
    { name:"description", content: "Storytelling is not something we do. Storytelling is who we are. - Carmine Gallo" },
    { property: "og:title", content: "Blackbeetle - Geschichten" },
    { property: "og:description", content: "Storytelling is not something we do. Storytelling is who we are. - Carmine Gallo" },
  ],
});
</script>
