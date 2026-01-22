<template>
  <div class="w-full h-full min-h-screen flex justify-center flex-col items-center px-10">
    <div class="max-w-lg text-xl">
      <h1 class="font-bold text-xl uppercase mb-3">E-Mail erneut senden</h1>
      <p>
        Trag hier deine E-Mail-Adresse ein und drücke auf "abschicken". Wir senden dir eine neue Verifikations-E-Mail an deine angegebene Adresse, sofern wir dich in unserer Datenbank finden können.
      </p>
      <form @submit.prevent="onSubmit" novalidate>
        <div class="mt-3">
          <LayoutTextInput label="E-Mail-Adresse" type="email" v-model="fields.email" />
        </div>
        <LayoutButton type="submit" classes="btn-light mt-3" :loading="isLoading" :disabled="isDisabled"> abschicken </LayoutButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { apiService } from "~~/lib/api.service";

const fields = reactive({ email: "" });

const { errors } = useFormValidation();
const { isDisabled } = useButtonState(fields, errors);

const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;
  const payload = { email: fields.email };
  fields.email = "";

  await apiService
    .post<{ message: string }>("/resend-verification", payload)
    .then((response) => {
      fields.email = "";
      toast.success(response.message);
      isLoading.value = false;
    })
    .catch((err) => {
      console.error(err);
      isLoading.value = false;
    });
}
</script>
