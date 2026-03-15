<template>
  <div v-show="visible" role="alertdialog" aria-label="Cookiehinweis" class="w-full h-4/5 fixed bottom-0 gradient z-50">
    <div class="mx-auto max-w-screen-md flex flex-col justify-end h-full pb-10 px-5">
      <h2 class="text-lg text-bb-light underline">Cookiehinweis</h2>
      <span class="text-bb-light"
        >Diese Seite verwendet Cookies, um Ihnen (dem Benutzer) ein besseres Nutzererlebnis bieten zu können, bzw. die korrekte Funktionsweise der Seite zu garantieren. Welche Informationen in diesen
        Cookies gespeichert werden und was es überhaupt mit diesen "Cookies" auf sich hat, können Sie in meiner
        <NuxtLink to="/privacy" class="underline hover:text-bb-red">Datenschutzerklärung</NuxtLink> nachlesen.</span
      >
      <div class="flex gap-3 mt-2">
        <button @click="accept()" class="border bg-bb-charcoal border-bb-light text-bb-light block transition duration-300 ease-in-out hover:bg-bb-light hover:text-bb-charcoal w-max py-1 px-3">
          Akzeptieren
        </button>
        <button @click="reject()" class="border border-bb-light text-bb-light block transition duration-300 ease-in-out hover:bg-bb-light hover:text-bb-charcoal w-max py-1 px-3">
          Nur notwendige
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(true);
const COOKIE_MAX_AGE_6_MONTHS = 180 * 24 * 60 * 60;
const cookieAccept = useCookie("cAccept", { maxAge: COOKIE_MAX_AGE_6_MONTHS });

function accept() {
  cookieAccept.value = "accepted";
  visible.value = false;
}

function reject() {
  cookieAccept.value = "rejected";
  visible.value = false;
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4), rgba(26, 26, 26, 0.8), #1a1a1a);
}
</style>
