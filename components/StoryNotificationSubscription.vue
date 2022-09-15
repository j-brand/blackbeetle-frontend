<template>
  <div class="z-50 flex justify-center items-center">
    <div class="absolute w-full h-full bg-bb-charcoal blur-md opacity-40"></div>
    <div class="bg-bb-charcoal text-bb-light p-10 rounded-lg max-w-[400px] md:mx-auto mx-5 relative dark:border dark:border-bb-light">
      <h3 class="font-bold text-2xl mb-4">Werde benachrichtigt</h3>
      <div class="leading-5">
        <p>
          Wenn du hier deinen Namen und E-Mail Adresse einträgst, schicken wir dir eine Nachricht, sobald ein neuer Beitrag erscheint.
          <br /><br />
        </p>
        <form @submit.prevent="sendSubscription" novalidate>
          <div class="flex flex-col md:gap-4">
            <LayoutTextInput label="Name" type="text" v-model="fields.name" />

            <LayoutTextInput label="E-Mail-Adresse" type="email" v-model="fields.email" />
          </div>
          <div class="pt-5 mb-5 relative">
            <LayoutCheckbox label="checkbox" v-model="fields.checkbox" :required="true"
              ><span> Ja, Ich habe die <NuxtLink to="/privacy" class="text-bb-red underline">Hinweise</NuxtLink> zum Datenschutz gelesen und bin damit einverstanden. </span></LayoutCheckbox
            >
          </div>
          <br />

          <LayoutButton type="submit" classes="mt-4 w-full md:w-auto" :loading="isLoading" :disabled="isDisabled">senden</LayoutButton>
        </form>
      </div>
      <button @click="$emit('close', true)" class="top-4 right-4 absolute"><IconClose :fill="$tailwind.colors['bb-light']" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";

const props = defineProps({
  storyID: { type: Number },
});

const emit = defineEmits(["close"]);

const bot = ref(null);
const isLoading = ref(false);
const fields = reactive({ name: "", email: "", checkbox: false });

const { errors } = useFormValidation();
const { isDisabled } = useButtonState(fields, errors);

async function sendSubscription() {
  if (bot.value != null) {
    return;
  }

  isLoading.value = true;
  const payload = {
    name: fields.name,
    email: fields.email,
    option: "S" + props.storyID,
  };
  const res = await apiService
    .post<any>("/newsletter", payload)
    .then(() => {
      isLoading.value = false;
      emit("close");
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  document.body.style.overflowY = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflowY = "scroll";
});
</script>
