<template client-only>
  <!--   <transition name="fade">
    <Loader v-if="loading" />
  </transition> -->
  <div class="max-w-screen-md mx-auto flex flex-col justify-between pb-40" v-if="story">
    <div class="mb-5">
      <div class="flex flex-col justify-center min-h-screen mx-5 lg:mx-0">
        <h1 class="text-4xl text-center uppercase tracking-widest font-semibold">{{ story.title }}</h1>
        <span class="text-2xl text-center mt-10" v-html="story.description"></span>
        <!--         <StoryImage :storySlug="story.slug" /> -->
      </div>
      <div class="flex flex-row justify-end mx-5 lg:mx-0">
        <button
          type="button"
          id="subscribe"
          class="hover:bg-bb-charcole rounded-lg border border-solid border-bb-charcole transition duration-200 pt-2 pb-1 px-4 mr-3"
          href="#"
          v-on:click="showSub = !showSub"
        >
          <span class="ico-newsletter"></span>
        </button>

        <button
          type="button"
          v-on:click="toggleOrder()"
          class="hover:bg-bb-charcole hover:text-bb-lighter rounded-lg border border-solid border-bb-charcole px-4 py-3 text-lg transition duration-200"
          href="#"
          id="toggle-order"
        >
          <span class="ico-sort"></span>
          Sortierung umkehren
        </button>
      </div>
    </div>
    <Pagination v-if="story.posts.current_page > 1" :offset="3" :pagination="story.posts" @paginate="changePage" class="mt-44 mb-10" />

    <template v-for="(post, index) in story.posts.data" :key="index">
      <hr class="w-1/4 my-10 mx-auto border-bb-charcole h-px" v-if="index != story.posts.length - 1 && index != 0" />
      <PostHtml v-if="post.type == 'html'" :post="post" />
      <PostImage v-if="post.type == 'image'" :post="post" class="md:rounded-md" />
      <PostMap v-if="post.type == 'map'" :post="post" class="rounded-md" />
      <PostVideo v-if="post.type == 'video'" :post="post" class="rounded-md" />
    </template>
    <Pagination :offset="3" :pagination="story.posts" @paginate="changePage" class="mt-10" />
  </div>
  <!--<transition name="fade">
      <StoryNotoficationSubscription class="fixed top-1/4 w-full h-full" v-if="showSub" :storyID="story.id" @close="showSub = !showSub"></StoryNotoficationSubscription>
    </transition> -->
</template>

<script setup lang="ts">
import { Story } from "@/types";
/* import { computed, onMounted, ref } from "vue";

import { ActionTypes } from "@/store/action.type";
import { useStore } from "vuex";
import { useRoute } from "vue-router"; */

/* import helpers from "@/common/helpers"; */

/* const getPage = () => {
  const pagination = route.query.page;

  if (pagination != null) {
    return parseInt(pagination);
  }
  return null;
};


 */
/* import HtmlPost from "@/components/posts/HtmlPost.vue";
import ImagePost from "@/components/posts/ImagePost.vue";
import MapPost from "@/components/posts/MapPost.vue";
import VideoPost from "@/components/posts/VideoPost.vue";
import Pagination from "@/components/Pagination.vue";
import Loader from "@/components/Loader.vue"; */

/* import StoryNotoficationSubscription from "@/components/StoryNotificationSubscription.vue";
import StoryImage from "@/components/StoryHeaderImage.vue"; */

//show newsletter subscription modal

const route = useRoute();

const { $storyRepository } = useNuxtApp();

const order = useCookie(route.params.slug.toString());

const showSub = ref(false);
const loading = ref(true);
const pagination = ref(1);

const { data: story, pending, refresh, error } = await useAsyncData("story", () => $storyRepository.show(route.params.slug, getOrder(), getPagination()));

function changePage(page: number) {
  pagination.value = page;
  refresh();
}

function getOrder(): string {
  return order.value ? order.value : "asc";
}

function getPagination(): number | null {
  if (route.query.page != null) {
    return parseInt(route.query.page);
  }
  return null;
}

async function fetchStory(pagination?: number) {
  /*   loading.value = true; */
  const order = getOrder();
  let page = null;
  if (pagination) {
    page = pagination;
  } else if (route.query.page != null) {
    page = route.query.page;
  }
  const storyData = await useAsyncData("story", () => $storyRepository.show(route.params.slug, getOrder(), page));
  story.value = await storyData.data.value;

  setTimeout(() => {
    loading.value = false;
    window.scrollTo(0, 0);
  }, 200);
}

function toggleOrder() {
  if (order.value === "asc") {
    order.value = "desc";
  } else {
    order.value = "asc";
  }
  refresh();
}

onMounted(fetchStory);
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.1s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.ico-sort {
  background: url("/img/icon_history_dark.svg") no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 22px;
  width: 22px;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 200ms;
  vertical-align: sub;
}
#toggle-order:hover .ico-sort {
  background: url("/img/icon_history_light.svg") no-repeat top left;
  background-size: contain;
}

.ico-newsletter {
  transition: 0.2;
  background: url("/img/icon_mail_dark.svg") no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 22px;
  width: 22px;
  vertical-align: sub;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 200ms;
}
#subscribe:hover .ico-newsletter {
  background: url("/img/icon_mail_light.svg") no-repeat top left;
  background-size: contain;
}
</style>
