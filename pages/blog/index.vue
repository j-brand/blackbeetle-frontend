<template>
  <div v-if="stories" class="flex flex-col justify-center items-center pt-40">
    <NuxtLink :to="`/blog/${story.slug}`" v-for="story in stories" :key="story.id" class="mb-6 px-5 lg:px-0">
      <ImageCardLarge :resource="story" :type="'story'" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { Stories } from "~~/types";

const { data: stories } = await useAsyncData("stories", () => apiService.get<Stories>("/story"));

useHead({
  title: "Blog",
});
</script>
