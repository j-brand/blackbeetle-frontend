<template>
  <div class="flex flex-col rounded-lg px-5 lg:p-0">
    <div class="flex flex-col justify-between mb-2">
      <p class="text-right md:text-md">{{ formatDate(post.date) }}</p>
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
    </div>
    <article v-html="post.content" class="text-lg md:text-xl html-post"></article>
    <PostComments v-if="post.comments.length > 0" :comments="post.comments" @open-Modal="commentModal = true" />
    <transition name="fade">
      <ModalPostComment v-if="commentModal" :post_id="post.id" @new="addNewComment" @close="commentModal = false" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { IPost, IComment } from "@/types";
import { PropType } from "vue";

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});
const commentModal = ref<boolean>(false);
const { formatDate } = useHelper();

function addNewComment(comment: IComment) {
  props.post.comments.push(comment);
}
</script>
