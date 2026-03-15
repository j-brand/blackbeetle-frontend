<template>
  <div
    ref="dialogRef"
    role="dialog"
    aria-modal="true"
    aria-labelledby="comment-dialog-title"
    class="z-50 fixed top-0 left-0 h-full w-full flex justify-center items-center"
    @keydown.escape="$emit('close')"
    @keydown="trapFocus"
  >
    <div @click="$emit('close')" class="fixed top-0 w-full h-full bg-bb-charcoal blur-md opacity-40" aria-hidden="true"></div>
    <div class="bg-bb-charcoal p-10 max-w-screen-md rounded-lg dark:border dark:border-bb-light md:mx-auto mx-5 relative">
      <client-only>
        <h4 id="comment-dialog-title" class="font-bold mt-3 mb-1 text-bb-light">Schreib uns gerne einen Kommentar.</h4>
        <form @submit.prevent="sendComment" novalidate>
          <div class="text-sm">
            <UiTextInput class="text-bb-light" label="Name" type="text" v-model="fields.name" />
          </div>

          <div class="flex hidden">
            <label for="subject">
              Subject
              <input type="text" id="subject" v-model="bot" class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2" placeholder="Name" />
            </label>
          </div>
          <div class="relative text-sm">
            <UiTextarea class="text-bb-light" label="Nachricht" v-model="fields.content" />
            <div class="absolute bottom-12 right-10" ref="picker">
              <button @click="toggleEmojiPicker" class="cursor-pointer absolute" type="button" aria-label="Emoji auswählen">
                <IconEmoji class="bb-icon" aria-hidden="true" />
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
          <div class="mb-3">
            <UiCheckbox v-model="privacyAccepted" label="Datenschutz" :required="true" classes="text-bb-light text-sm">
              <span class="text-bb-light text-sm">Ich habe die <NuxtLink to="/privacy" class="underline hover:text-bb-red" target="_blank">Datenschutzerklärung</NuxtLink> gelesen und stimme der Verarbeitung meiner Daten zu.</span>
            </UiCheckbox>
          </div>
          <UiButton type="submit" classes="btn-dark" :loading="isLoading" :disabled="isDisabled || !privacyAccepted">abschicken</UiButton>
        </form>
      </client-only>
      <button @click="$emit('close', true)" class="top-4 right-4 absolute text-bb-lighter" aria-label="Dialog schließen"><IconClose fill="currentColor" aria-hidden="true" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from "@/types";

import EmojiPicker from "vue3-emoji-picker";
import { apiService } from "@/lib/api.service";
import { toast } from "vue-sonner";
import "@/assets/css/emoji-picker.css";

const showEmojiPicker = ref<boolean>(false);

const props = defineProps<{
  post_id?: number;
}>();

const bot = ref("");
const isLoading = ref(false);
const lastSubmitTime = ref(0);
const SUBMIT_COOLDOWN_MS = 30_000;
const privacyAccepted = ref(false);
const fields = reactive({ name: "", content: "" });
const picker = ref();
const dialogRef = ref<HTMLElement>();
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
  nextTick(() => {
    const firstInput = dialogRef.value?.querySelector<HTMLElement>('input:not([type="hidden"]):not([type="checkbox"]), textarea');
    firstInput?.focus();
  });
});

onBeforeUnmount(() => {
  document.body.style.overflowY = "scroll";
});

function trapFocus(event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const focusable = dialogRef.value?.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input:not([type="hidden"]), textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable?.length) return;
  const focusableArray = Array.from(focusable);
  const first = focusableArray.at(0);
  const last = focusableArray.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}

interface EmojiData {
  i: string;
  n: string[];
  r: string;
  u: string;
}

function onSelectEmoji(emoji: EmojiData) {
  fields.content += emoji.i;
}

interface CommentResponse {
  message: string;
  data: IComment;
}

async function sendComment() {
  if (bot.value !== "") {
    return;
  }

  const now = Date.now();
  if (now - lastSubmitTime.value < SUBMIT_COOLDOWN_MS) {
    toast.error("Bitte warte einen Moment, bevor du erneut einen Kommentar sendest.");
    return;
  }

  isLoading.value = true;
    const payload = {
      post_id: props.post_id,
      name: fields.name,
      content: fields.content,
    };
    await apiService
      .post<CommentResponse>("/comments", payload)
      .then((response) => {
        lastSubmitTime.value = Date.now();
        emit("new", response.data);
        isLoading.value = false;
        emit("close");
      })
      .catch(() => {
        isLoading.value = false;
        toast.error("Der Kommentar konnte nicht gesendet werden. Bitte versuche es sp\u00e4ter erneut.");
      });
}
</script>
