<template>
  <div v-show="visible" role="alertdialog" aria-label="Cookiehinweis" class="w-full h-4/5 fixed bottom-0 gradient z-50">
    <div class="mx-auto max-w-screen-md flex flex-col justify-end h-full pb-12 px-6">
      <h2 class="text-lg text-primary-fg underline">Cookiehinweis</h2>
      <span class="text-primary-fg"
        >Diese Seite verwendet Cookies, um Ihnen (dem Benutzer) ein besseres Nutzererlebnis bieten zu können, bzw. die korrekte Funktionsweise der Seite zu garantieren. Welche Informationen in diesen
        Cookies gespeichert werden und was es überhaupt mit diesen "Cookies" auf sich hat, können Sie in meiner
        <NuxtLink to="/privacy" class="underline hover:text-accent">Datenschutzerklärung</NuxtLink> nachlesen.</span
      >
      <div class="flex gap-3 mt-2">
        <button @click="accept()" class="chamfer-quad px-3 py-1 text-sm font-semibold transition duration-300 ease-in-out bg-primary text-primary-fg hover:bg-accent hover:text-[#232118]" style="--c: 7px">
          Akzeptieren
        </button>
        <button @click="reject()" class="chamfer-quad px-3 py-1 text-sm font-semibold transition duration-300 ease-in-out bg-transparent text-primary-fg hover:bg-accent hover:text-[#232118]" style="--c: 7px; box-shadow: inset 0 0 0 1px var(--color-line-strong)">
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
  background: linear-gradient(transparent, color-mix(in oklab, var(--color-bg) 40%, transparent), color-mix(in oklab, var(--color-bg) 80%, transparent), var(--color-primary));
}
</style>
