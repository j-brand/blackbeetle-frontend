<template>
  <div class="z-50 flex justify-center items-center">
    <div class="absolute w-full h-full bg-bb-charcoal blur-md opacity-40"></div>
    <div class="bg-bb-charcoal text-bb-lighter p-10 max-w-screen-md rounded-lg md:mx-auto mx-5 relative">
      <h3 class="font-bold text-2xl mb-4">Werde benachrichtigt</h3>
      <div class="text-xl leading-5">
        Wenn du hier deinen Namen und E-Mail Adresse einträgst, schicken wir dir eine Nachricht, sobald ein neuer Beitrag erscheint.
        <br />
        <small v-if="message != ''" class="text-bb-red"><br />{{ message }}</small>
        <div class="flex flex-col md:flex-row md:gap-4">
          <input
            class="bg-bb-charcoal border border-bb-lighter border-solid rounded-lg text-xl text-bb-lighter py-1 px-3 mt-6 w-full flex-1"
            type="fname"
            v-model="name"
            name="name"
            placeholder="Name"
            required
          />
          <input
            class="bg-bb-charcoal border border-bb-lighter border-solid rounded-lg text-xl text-bb-lighter py-1 px-3 mt-6 w-full flex-3"
            type="email"
            v-model="email"
            name="email"
            placeholder="E-Mail-Adresse"
            required
          />
        </div>
        <div class="pt-5 relative">
          <input ref="check" type="checkbox" name="privacy" id="privacy" required />
          <label for="privacy"
            ><span> Ja, Ich habe die <NuxtLink to="/privacy" class="text-bb-red underline">Hinweise</NuxtLink> zum Datenschutz gelesen und bin damit einverstanden. </span>
          </label>
        </div>
        <br />

        <button
          class="px-4 py-2 mt-10 md:mt-0 border border-bb-lighter border-solid rounded-lg hover:border-bb-charcoal hover:text-bb-charcoal hover:bg-bb-lighter"
          type="submit"
          value="Submit"
          @click.prevent="subscribe()"
        >
          senden
        </button>
      </div>
      <button @click="$emit('close', true)" class="top-4 right-4 absolute"><IconClose :fill="$tailwind.colors['bb-lighter']" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const props = defineProps({
  storyID: { type: Number },
});

const { $storyRepository, $tailwind } = useNuxtApp();

const message = ref("");
const email = ref(null);
const name = ref(null);
const check = ref(null);
async function subscribe() {
  const payload = { story_id: props.storyID, email: email?.value, name: name.value };

  if (!payload.email || payload.email == "") {
    message.value = "Ich brauche eine E-Mail-Adresse um dich zu benachrichtigen.";
    return;
  }
  if (!payload.name) {
    message.value = "Ich brauche deinen Namen um dich zu benachrichtigen.";
    return;
  }

  if (check.value.checked == false) {
    message.value = "Bitte stimme den Datenschutzbedingungen zu.";
    return;
  }

  await $storyRepository.subscribe(payload).then((response) => {
    if (response.data == true) {
      emit("close", true);
    } else {
      message.value = message.value = response.data.message;
    }
  });
}

onMounted(() => {
  document.body.style.overflowY = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflowY = "scroll";
});
</script>
