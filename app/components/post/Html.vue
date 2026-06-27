<template>
  <div class="flex flex-col px-2 lg:p-0">
    <div class="flex flex-col justify-between mb-2">
      <p class="bb-page-meta text-right">{{ formatDate(post.date) }}</p>
      <h2 class="bb-page-section-title">{{ post.title }}</h2>
    </div>
    <article v-html="htmlContent" class="bb-page-copy html-post"></article>
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
const { sanitizeHtml } = useSanitize();

const htmlContent = computed(() => {
  let raw: string;
  if (typeof props.post.content === 'object' && props.post.content !== null && 'html' in props.post.content) {
    raw = (props.post.content as { html: string }).html;
  } else {
    raw = String(props.post.content);
  }
  return sanitizeHtml(raw);
});

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

.html-post :deep(h1),
.html-post :deep(h2),
.html-post :deep(h3) {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--color-fg);
  margin: 1.5rem 0 0.75rem;
}

.html-post :deep(h1) {
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
}

.html-post :deep(h2) {
  font-size: clamp(1.3rem, 2.1vw, 1.65rem);
}

.html-post :deep(h3) {
  font-size: 1.15rem;
}

.html-post :deep(blockquote) {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 3px solid var(--color-accent);
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-fg);
}

.html-post :deep(ul),
.html-post :deep(ol) {
  padding-left: 1.25rem;
  margin: 1rem 0 1.25rem;
}

.html-post :deep(li) {
  margin-bottom: 0.5rem;
}
</style>