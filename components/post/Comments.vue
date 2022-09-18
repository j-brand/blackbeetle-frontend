<template>
  <div class="flex flex-col rounded-lg pt-4">
    <div class="relative flex justify-end">
      <button type="button" class="dark:color-bb-lighter">
        <IconPen class="cursor-pointer mb-5 w-6 h-6 mr-3 dark:fill-bb-light" @click="emit('openModal')" />
      </button>
      <button>
        <IconComment @click="toggleComments" class="cursor-pointer mb-5 w-6 h-6 dark:fill-bb-light" v-if="comments.length > 0" />
        <span
          class="absolute top-[-10px] right-[-14px] px-[6px] pb-[0px] pt-[1px] text-[0.7rem] font-mono rounded-full border dark:text-bb-light border-bb-charcoal dark:border-bb-light bg-white dark:bg-bb-charcoal"
          >{{ comments.length }}</span
        >
      </button>
    </div>

    <div class="overflow-hidden duration-500 ease-in-out transition-[max-height]" :class="commentsOpen ? 'max-h-[300rem]' : ' max-h-0'">
      <article class="mb-5" v-for="comment in comments" :key="comment.id">
        <div class="flex justify-between mb-2">
          <h5 class="text-md font-bold">{{ comment.name }}</h5>
          <span>{{ formatDate(comment.created_at, true) }}</span>
        </div>
        <p>{{ comment.content }}</p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IComment } from "@/types";
import { PropType } from "vue";

import "@/assets/scss/_emoji-picker.scss";

const { formatDate } = useHelper();
const commentsOpen = ref<boolean>(false);
const emit = defineEmits(["openModal"]);

const props = defineProps({
  comments: {
    type: Object as PropType<IComment[]>,
    required: true,
  },
});

function toggleComments() {
  commentsOpen.value = !commentsOpen.value;
}
</script>

<style lang="scss">
textarea {
  @apply rounded-md pt-2;
}
</style>
