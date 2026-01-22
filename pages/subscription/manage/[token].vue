<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center flex-col px-10">
    <div class="max-w-md">
      <h1 class="text-xl font-bold uppercase">Benachrichtigungen</h1>
      <p class="my-5 block text-xl">Hier kannst du einstellen, ob und welche Benachrichtigungen du erhalten möchtest.</p>
      <div v-if="subscriptions" class="grid grid-cols-2 gap-4">
        <template v-for="sub in subscriptions" :key="sub">
          <div>
            <p class="text-xl">{{ sub.title }}</p>
          </div>
          <div>
            <LayoutCheckbox classes="mt-1" :label="sub.id.toString()" v-model="sub.is_sub" @change="updateSubscription"></LayoutCheckbox>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { apiService } from "~~/lib/api.service";

interface BBSub {
  title: string;
  id: number;
  is_sub: boolean;
}

const route = useRoute();
const { data: subscriptions } = await useAsyncData("album", () => apiService.get<BBSub[]>(`/subscriptions/${getToken()}`));

function getToken() {
  return 'token' in route.params ? String(route.params.token) : '';
}

async function updateSubscription(change: Event) {
  const target = change.target as HTMLInputElement;
  const payload = { option: `S${target.id}`, value: target.checked, token: getToken() };
  await apiService
    .post<{ message: string }>("/subscription", payload)
    .then((response) => {
      toast.success(response.message);
    })
    .catch(() => {
      toast.error("Leider ist etwas schief gelaufen.");
    });
}
</script>
