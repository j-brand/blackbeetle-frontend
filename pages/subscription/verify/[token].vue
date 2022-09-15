<template>
  <div class="w-full h-full min-h-screen flex justify-center flex-col items-center px-10">
    <p class="max-w-lg text-xl">{{ message }}</p>
    <NuxtLink to="/" exact class="mt-10 uppercase font-medium underline"><p>zurück zur Startseite</p></NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { apiService } from "~~/lib/api.service";

const message = ref("");
const route = useRoute();

onMounted(() => {
  verify();
});

function getToken() {
  const token = route.params.token.toString();
  return token;
}

async function verify() {
  const payload = { token: getToken() };
  const res = await apiService
    .post<any>("/verify-email", payload)
    .then((response) => {
      message.value = `Super ${response.message}! Deine E-Mail-Adresse wurde verifiziert. Ab jetzt wirst du benachrichtigt, sobald es etwas Neues gibt.`;
    })
    .catch((err) => {
      message.value = err.data;
    });
}
</script>
