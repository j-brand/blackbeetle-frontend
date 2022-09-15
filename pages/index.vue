<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <Head>
      <Meta name="description" content="Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." />
    </Head>

  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { Story } from "~~/types";
import { useToast } from "vue-toastification/dist/index.mjs";
const toast = useToast();

const { data: story, pending, refresh, error } = await useAsyncData("story", () => apiService.getStoryBySlug<Story>("/story", "sit", "asc", 2));
useHead({
  title: "Home",
});

const stories = await apiService.get<Story>("/story");
</script>
