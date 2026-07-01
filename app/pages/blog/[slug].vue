<template>
  <div class="max-w-screen-md mx-auto flex flex-col justify-between py-26">
    <ClientOnly>
      <CommonLoader v-if="isLoading" />
    </ClientOnly>
    <div v-if="errorStory || errorPosts" class="text-center py-24">
      <p class="text-xl">Die Daten konnten nicht geladen werden. Bitte versuche es später erneut.</p>
    </div>
    <template v-if="story && !isLoading && !errorStory">
    <div class="mb-10">
      <CommonPagination v-if="posts && posts.meta.last_page > 1 && posts.meta.current_page > 1" :offset="3" :pagination="posts.meta" @paginate="changePage" class="my-12 relative flex justify-center" />
      <div v-if="currentPage == 1" class="flex flex-col justify-center min-h-1/2-screen mx-6 lg:mx-0">
        <h1 class="bb-page-title text-center">{{ story.title }}</h1>
        <p class="bb-page-copy text-center mt-8" v-html="story.description"></p>
        <StoryImage :storySlug="story.slug" />
      </div>
      <div v-if="currentPage == 1" class="flex flex-row justify-end my-10">
        <UiButton
          type="button"
          @click="toggleOrder()"
          aria-label="reverse post order"
          variant="outline"
          size="sm"
          id="toggle-order"
        >
          <template #icon>
            <IconHistory/>
          </template>
          Sortierung umkehren
        </UiButton>
      </div>
    </div>

    <template v-for="(post, index) in posts?.data" :key="post.id">
      <hr class="w-1/4 my-12 mx-auto border-line h-px" v-if="posts && index != posts.data.length && index != 0" />
      <PostHtml v-if="post.type === 'html'" :post="post" />
      <PostImage v-if="post.type == 'image'" :post="post" class="md:chamfer-md" />
      <PostMap v-if="post.type == 'map'" :post="post" class="chamfer-md" />
      <PostVideo v-if="post.type == 'video'" :post="post" class="chamfer-md" />
    </template>
    <CommonPagination v-if="posts && posts.meta.last_page > 1" :offset="3" :pagination="posts.meta" @paginate="changePage" class="my-12 relative flex justify-center" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "@/lib/api.service";
import Button from "@/components/ui/Button.vue";
import type { IStory, IPost } from "@/types";

const currentPage = ref(1);
const minLoaderActive = ref(true);
const route = useRoute();
const slug = 'slug' in route.params ? String(route.params.slug) : '';
const orderCookie = useCookie(slug);

// Fetch story metadata
const {
  data: story,
  pending: pendingStory,
  error: errorStory,
} = await useAsyncData(`story-${slug}`, () => apiService.getStory<IStory>(slug));

// Fetch paginated posts
const {
  data: posts,
  pending: pendingPosts,
  error: errorPosts,
  refresh: refreshPosts,
} = await useAsyncData(
  `story-${slug}-posts`,
  () => apiService.getStoryPosts<IPost>(slug, {
    page: currentPage.value,
    order: getOrder(),
    order_by: "date",
  }),
  { watch: [currentPage] }
);

const isLoading = computed(() => pendingStory.value || pendingPosts.value || minLoaderActive.value);

const { getBestMediaUrl } = useHelper();

useHead({
  title: story.value?.title ?? "",
  meta: [
    { name: "description", content: story.value?.description ?? "" },
    { property: "og:title", content: `Blackbeetle - ${story.value?.title ?? ""}` },
    { property: "og:description", content: story.value?.description ?? "" },
    { property: "og:image", content: story.value?.title_image ? getBestMediaUrl(story.value.title_image, 'large') : "" },
  ],
});

function changePage(page: number) {
  window.scrollTo(0, 0);
  currentPage.value = page;
}

function getOrder(): string {
  return orderCookie.value ? orderCookie.value : "asc";
}

function toggleOrder() {
  if (orderCookie.value === "desc") {
    orderCookie.value = "asc";
  } else {
    orderCookie.value = "desc";
  }
  refreshPosts();
}

// Initialize page from query parameter
onMounted(() => {
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page as string);
  }
  setTimeout(() => {
    minLoaderActive.value = false;
  }, 2000);
});
</script>
