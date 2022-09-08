<template>
  <div class="z-50 fixed top-0 left-0 h-full w-full flex justify-center items-center">
    <div @click="$emit('close')" class="fixed top-0 w-full h-full bg-bb-charcoal  blur-md opacity-40"></div>
    <div class="bg-bb-charcoal text-bb-lighter p-10 max-w-screen-md rounded-lg dark:border dark:border-bb-light md:mx-auto mx-5 relative">
      <client-only>
        <h4 class="font-bold mt-3 mb-1">Schreib uns gerne einen Kommentar.</h4>

        <div class="text-sm">
          <LayoutTextInput label="Name" v-model="message.name" />
        </div>

        <div class="flex hidden">
          <label for="subject">
            Subject
            <input type="text" id="subject" v-model="bot" class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2" placeholder="Name" />
          </label>
        </div>

        <div class="relative text-sm">
          <LayoutTextarea label="Nachricht" v-model="message.content" />
          <div class="absolute bottom-12 right-10">
            <button @click="toggleEmojiPicker" class="cursor-pointer absolute" type="button">
              <IconEmoji />
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
        <button
          class="px-4 py-2 mt-10 md:mt-0 border w-full border-bb-lighter border-solid rounded-lg hover:border-bb-charcoal hover:text-bb-charcoal hover:bg-bb-lighter"
          type="submit"
          value="Submit"
          @click.prevent="sendComment()"
        >
          abschicken
        </button>
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

const { $storyRepository, $tailwind } = useNuxtApp();

const content = ref("");
const name = ref("");
const bot = ref(null);

const message = ref({ name: "", nameErr: "", content: "", contentErr: "" });
const emit = defineEmits(["new","close"]);

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
  message.value.content += emoji.i;
}

async function sendComment() {
  if (bot.value != null) {
    return;
  } else {
    const payload = {
      post_id: props.post_id,
      name: message.value.name,
      content: message.value.content,
    };
    const res = await apiService
      .post<IComment>("/comment", payload)
      .then((comment) => {
        emit("new", comment);
      })
      .catch((err) => {
        console.log(err);
/*         Object.entries(err.data).map((item) => {
          message.value[`${item[0]}Err`] = ` - ${item[1][0]}`;
        }); */
        //console.log(message.value);
      });
  }
}
</script>
