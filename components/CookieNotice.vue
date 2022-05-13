<template>
  <div v-show="hide" class="w-full h-2/5 fixed bottom-0 gradient z-50">
    <div class="mx-auto max-w-screen-md flex flex-col justify-end h-full pb-10">
      <h2 class="text-lg text-bb-light underline">Cookiehinweis</h2>
      <span class="text-bb-light"
        >Diese Seite verwendet Cookies, um Ihnen (dem Benutzer) ein besseres Nutzererlebnis bieten zu können, bzw. die korrekte Funktionsweise der Seite zu garantieren. Welche Informationen in diesen
        Cookies gespeichert werden und was es überhaupt mit diesen "Cookies" auf sich hat, können Sie in meiner
        <router-link to="/privacy-policy" class="underline hover:text-bb-red">Datenschutzerklärung</router-link> nachlesen.</span
      >
      <button v-on:click="accept()" class="border border-bb-light text-bb-light block transition duration-300 ease-in-out hover:bg-bb-light hover:text-bb-charcole w-max py-1 px-3 mt-2">
        alles klar
      </button>
    </div>
  </div>
</template>

<script setup>
const { setCookie } = helpers();
const hide = ref(true);

function accept() {
  setCookie("cAccept", "true", 265);
  hide.value = false;
}
</script>

<style lang="scss" scoped>
.gradient {
  background: linear-gradient(0deg, rgba(55, 55, 55, 1) 0%, rgba(55, 55, 55, 1) 50%, rgba(55, 55, 55, 0.65) 60%, rgba(55, 55, 55, 0) 70%);
}
</style>
