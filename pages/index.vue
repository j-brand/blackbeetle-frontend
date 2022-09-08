<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <Head>
      <Meta name="description" content="Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." />
    </Head>

    <nuxt-img :modifiers="{ grayscale: true, tint: '#00DC82' }" src="/default.jpeg" format="webp" sizes="sm:640px md:768px lg:1024px xl:1280px" loading="lazy" placeholder/>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { Story } from "~~/types";
const { data:story, pending, refresh, error } = await useAsyncData("story", () => apiService.getStoryBySlug<Story>("/story", "sit", "asc", 2));
useHead({
  title: "Home",
});

const stories = await apiService.get<Story>("/story");
</script>
