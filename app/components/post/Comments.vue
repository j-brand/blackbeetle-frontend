<template>
  <div class="flex flex-col pt-4 pr-6">
    <div class="relative flex justify-end">
      <button type="button" class="text-fg" aria-label="Kommentar schreiben">
        <IconPen class="cursor-pointer mb-6 w-6 h-6 mr-3 fill-current" @click="emit('openModal')" />
      </button>
      <button type="button" aria-label="Kommentare anzeigen">
        <IconComment @click="toggleComments" class="cursor-pointer mb-6 w-6 h-6 fill-current text-fg" v-if="comments.length > 0" />
        <span
          class="absolute top-[-8px] right-[-12px] px-2 py-0 text-xs font-mono rounded-full border text-fg border-line-strong bg-card"
          >{{ comments.length }}</span
        >
      </button>
    </div>
    <transition name="expand">
      <div v-show="commentsOpen" class="" ref="com">
        <article class="mb-6" v-for="comment in comments" :key="comment.id">
          <div class="flex justify-between mb-2">
            <h5 class="text-md font-bold">{{ comment.name }}</h5>
            <span>{{ formatDate(comment.created_at, true) }}</span>
          </div>
          <p>{{ comment.content }}</p>
        </article>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from "@/types";

import "@/assets/css/emoji-picker.css";

const { formatDate } = useHelper();
const com = ref<HTMLDivElement>();
const commentsOpen = ref<boolean>(true);
const emit = defineEmits(["openModal"]);

const props = defineProps<{
  comments: IComment[];
}>();

let height = ref();

function toggleComments() {
  commentsOpen.value = !commentsOpen.value;
}

onMounted(() => {
  height.value = `${com?.value?.getBoundingClientRect().height}px`;
  commentsOpen.value = false;
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

textarea {
  @apply pt-2;
}

.expand-leave-active,
.expand-enter-active {
  transition: all 300ms ease-in-out;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  height: v-bind(height);
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  height: 0;
}
</style>
