<template>
  <div class="flex flex-col rounded-lg pt-4 pr-5">
    <div class="relative flex justify-end">
      <button type="button" class="dark:color-bb-lighter">
        <IconPen class="cursor-pointer mb-5 w-6 h-6 mr-3 dark:fill-bb-light" @click="emit('openModal')" />
      </button>
      <button>
        <IconComment @click="toggleComments" class="cursor-pointer mb-5 w-6 h-6 dark:fill-bb-light" v-if="comments.length > 0" />
        <span
          class="absolute top-[-10px] right-[-14px] px-[6px] pb-[0px] pt-[1px] text-[0.7rem] font-mono rounded-full border dark:text-bb-light border-bb-charcoal dark:border-bb-light bg-bb-white dark:bg-bb-charcoal"
          >{{ comments.length }}</span
        >
      </button>
    </div>
    <transition name="expand">
      <div v-show="commentsOpen" class="" ref="com">
        <article class="mb-5" v-for="comment in comments" :key="comment.id">
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
import { IComment } from "@/types";
import { PropType } from "vue";

import "@/assets/scss/_emoji-picker.scss";

const { formatDate } = useHelper();
const com = ref<HTMLDivElement>();
const commentsOpen = ref<boolean>(true);
const emit = defineEmits(["openModal"]);

const props = defineProps({
  comments: {
    type: Object as PropType<IComment[]>,
    required: true,
  },
});

let height = ref();

function toggleComments() {
  commentsOpen.value = !commentsOpen.value;
}

onMounted(() => {
  height.value = `${com?.value?.getBoundingClientRect().height}px`;
  commentsOpen.value = false;
});
</script>

<style lang="scss" scoped>
textarea {
  @apply rounded-md pt-2;
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
