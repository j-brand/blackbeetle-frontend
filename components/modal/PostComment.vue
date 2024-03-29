<template>
  <div class="z-50 fixed top-0 left-0 h-full w-full flex justify-center items-center">
    <div @click="$emit('close')" class="fixed top-0 w-full h-full bg-bb-charcoal blur-md opacity-40"></div>
    <div class="bg-bb-charcoal p-10 max-w-screen-md rounded-lg dark:border dark:border-bb-light md:mx-auto mx-5 relative">
      <client-only>
        <h4 class="font-bold mt-3 mb-1 text-bb-light">Schreib uns gerne einen Kommentar.</h4>
        <form @submit.prevent="sendComment" novalidate>
          <div class="text-sm">
            <LayoutTextInput class="text-bb-light" label="Name" type="text" v-model="fields.name" />
          </div>

          <div class="flex hidden">
            <label for="subject">
              Subject
              <input type="text" id="subject" v-model="bot" class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2" placeholder="Name" />
            </label>
          </div>
          <div class="relative text-sm">
            <LayoutTextarea class="text-bb-light" label="Nachricht" v-model="fields.content" />
            <div class="absolute bottom-12 right-10" ref="picker">
              <button @click="toggleEmojiPicker" class="cursor-pointer absolute" type="button">
                <IconEmoji class="bb-icon" />
              </button>
              <EmojiPicker
                class="absolute transform translate-x-[-290px] lg:translate-x-8 z-50"
                v-if="showEmojiPicker"
                :native="true"
                :hide-search="true"
                :disable-skin-tones="true"
                @select="onSelectEmoji"
              />
            </div>
          </div>
          <LayoutButton type="submit" classes="btn-dark" :loading="isLoading" :disabled="isDisabled">abschicken</LayoutButton>
        </form>
      </client-only>
      <button @click="$emit('close', true)" class="top-4 right-4 absolute"><IconClose :fill="$tailwind.colors['bb-lighter']" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IComment } from "@/types";

import EmojiPicker from "vue3-emoji-picker";
import { apiService } from "~~/lib/api.service";
import "@/assets/scss/_emoji-picker.scss";

const showEmojiPicker = ref<boolean>(false);

const props = defineProps({
  post_id: { type: Number },
});

const { $tailwind } = useNuxtApp();

const bot = ref(null);
const isLoading = ref(false);
const fields = reactive({ name: "", content: "" });
const picker = ref();
const { errors } = useFormValidation();
const { isDisabled } = useButtonState(fields, errors);

useDetectOutsideClick(picker, () => {
  if (showEmojiPicker.value) {
    showEmojiPicker.value = false;
  }
});

//const message = ref({ name: "", content: "" });
const emit = defineEmits(["new", "close"]);

onMounted(() => {
  document.body.style.overflowY = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflowY = "scroll";
});

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}

function onSelectEmoji(emoji) {
  fields.content += emoji.i;
}

async function sendComment() {
  if (bot.value != null) {
    return;
  } else {
    isLoading.value = true;
    const payload = {
      post_id: props.post_id,
      name: fields.name,
      content: fields.content,
    };
    const res = await apiService
      .post<IComment>("/comment", payload)
      .then((comment) => {
        emit("new", comment);
        isLoading.value = false;
        emit("close");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
