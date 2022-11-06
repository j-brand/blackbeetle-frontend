<template>
  <div v-show="hide" class="w-full h-4/5 fixed bottom-0 gradient z-50">
    <div class="mx-auto max-w-screen-md flex flex-col justify-end h-full pb-10 px-5">
      <h2 class="text-lg text-bb-light underline">Cookiehinweis</h2>
      <span class="text-bb-light"
        >Diese Seite verwendet Cookies, um Ihnen (dem Benutzer) ein besseres Nutzererlebnis bieten zu können, bzw. die korrekte Funktionsweise der Seite zu garantieren. Welche Informationen in diesen
        Cookies gespeichert werden und was es überhaupt mit diesen "Cookies" auf sich hat, können Sie in meiner
        <NuxtLink to="/privacy" class="underline hover:text-bb-red">Datenschutzerklärung</NuxtLink> nachlesen.</span>
      <button v-on:click="accept()" class="border bg-bb-charcoal border-bb-light text-bb-light block transition duration-300 ease-in-out hover:bg-bb-light hover:text-bb-charcoal w-max py-1 px-3 mt-2">
        alles klar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const hide = ref(true);
const cookieAccept = useCookie("cAccept");

function accept() {
  cookieAccept.value = "true";
  hide.value = false;
}
</script>

<style lang="scss" scoped>
.gradient {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4), rgba(26, 26, 26, 0.8), #1a1a1a);
}
</style>
