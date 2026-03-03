<template>
  <div class="flex flex-col rounded-lg px-2 lg:p-0">
    <div class="flex flex-col justify-between mb-2">
      <p class="text-right md:text-md">{{ formatDate(post.date) }}</p>
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
    </div>
    <article v-html="post.content" class="text-lg md:text-xl html-post"></article>
    <PostComments v-if="post.comments && post.comments.length > 0" :comments="post.comments" @open-Modal="commentModal = true" />
    <transition name="fade">
      <ModalPostComment v-if="commentModal" :post_id="post.id" @new="addNewComment" @close="commentModal = false" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { IPost, IComment } from "@/types";

const props = defineProps<{
  post: IPost;
}>();

const commentModal = ref<boolean>(false);
const { formatDate } = useHelper();

function addNewComment(comment: IComment) {
  if (props.post.comments) {
    props.post.comments.push(comment);
  }
}
</script>

<style>
a {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>