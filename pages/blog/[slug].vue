<template>
  <div class="max-w-screen-md mx-auto flex flex-col justify-between" v-if="story">
    <transition name="fade">
      <Loader v-if="pending || loading" />
    </transition>
    <div class="mb-5">
      <Pagination v-if="story.posts.current_page > 1" :offset="3" :pagination="story.posts" @paginate="changePage" class="my-14 relative flex justify-center" />
      <div v-if="getPagination() == 1" class="flex flex-col justify-center min-h-1/2-screen mx-5 lg:mx-0">
        <h1 class="text-4xl text-center uppercase tracking-widest font-semibold">{{ story.title }}</h1>
        <p class="text-2xl text-center mt-10" v-html="story.description"></p>
        <StoryImage :storySlug="story.slug" />
      </div>
      <div v-if="getPagination() == 1" class="flex flex-row justify-end">
        <button
          type="button"
          id="subscribe"
          aria-label="subscribe"
          class="hover:bg-bb-charcoal dark:hover:bg-bb-light rounded-lg border border-solid border-bb-charcoal dark:border-bb-light transition duration-200 pt-1 pb-1 px-4 mr-3"
          href="#"
          v-on:click="showSub = !showSub"
        >
          <IconMail class="transition duration-200" />
        </button>

        <button
          type="button"
          v-on:click="toggleOrder()"
          aria-label="reverse post order "
          class="hover:bg-bb-charcoal dark:hover:bg-bb-light hover:text-bb-lighter dark:hover:text-bb-charcoal dark:text-bb-light rounded-lg border border-solid border-bb-charcoal dark:border-bb-light px-4 py-3 text-lg transition duration-200 flex flex-row"
          href="#"
          id="toggle-order"
        >
          <IconHistory class="transition duration-200 mr-2 mt-[2px] leading-none" />
          Sortierung umkehren
        </button>
      </div>
    </div>

    <template v-for="(post, index) in story.posts.data" :key="index">
      <hr class="w-1/4 my-10 mx-auto border-bb-charcoal dark:border-bb-light h-px" v-if="index != story.posts.data.length && index != 0" />
      <PostHtml v-if="post.type === 'html'" :post="post" />
      <PostImage v-if="post.type == 'image'" :post="post" class="md:rounded-md" />
      <PostMap v-if="post.type == 'map'" :post="post" class="rounded-md" />
      <PostVideo v-if="post.type == 'video'" :post="post" class="rounded-md" />
    </template>
    <Pagination :offset="3" v-if="story.posts.data.length > 5" :pagination="story.posts" @paginate="changePage" class="my-14 relative flex justify-center" />
    <transition name="fade">
      <ModalStorySubsription class="fixed w-full h-full left-0 top-0" v-if="showSub" :storyID="story.id" @close="showSub = !showSub"></ModalStorySubsription>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";
import { IStory } from "@/types";

const showSub = ref(false);
const loading = ref(true);
const pagination = ref(1);
const route = useRoute();
const order = useCookie(route.params.slug.toString());

const {
  data: story,
  pending,
  refresh,
  error,
} = await useAsyncData(`story-${route.params.slug}`, () => apiService.getStoryBySlug<IStory>("/story", route.params.slug as string, getOrder(), getPagination()));

const { getImgPath } = useHelper();

useHead({
  title: story.value.title,
  meta: [
    { name: "description", content: story.value.description },
    { name: "og:title", content: `Blackbeetle - ${story.value.title}` },
    { name: "og:description", content: story.value.description },
    { name: "og:image", content: getImgPath(story.value.title_image, "_aslider") },
  ],
});

function changePage(page: number) {
  window.scrollTo(0, 0);
  pagination.value = page;
  refresh();
}

function getOrder(): string {
  return order.value ? order.value : "asc";
}

function getPagination(): number {
  if (route.query != null && route.query.page != null) {
    return parseInt(route.query.page as string);
  }
  return 1;
}

function toggleOrder() {
  if (order.value === "asc") {
    order.value = "desc";
  } else {
    order.value = "asc";
  }
  refresh();
}

function deactivateLoading() {
  loading.value = false;
}

onMounted(() => {
  refreshNuxtData("story");
  setTimeout(deactivateLoading, 2000);
});
</script>

<style lang="scss">
.dark {
  #toggle-order,
  #subscribe {
    svg {
      fill: theme("colors.bb-light");
    }
    &:hover {
      svg {
        fill: theme("colors.bb-charcoal");
      }
    }
  }
}
#toggle-order,
#subscribe {
  svg {
    fill: theme("colors.bb-charcoal");
  }
  &:hover svg {
    fill: theme("colors.bb-lighter");
  }
}
</style>
