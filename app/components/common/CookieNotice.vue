<template>
  <div v-if="visible" role="alertdialog" aria-modal="true" aria-labelledby="cookie-dialog-title" class="z-50 fixed top-0 left-0 h-full w-full flex justify-center items-center">
    <div class="fixed top-0 w-full h-full bg-bg blur-md opacity-55" aria-hidden="true"></div>
    <div class="cut-frame chamfer-lg lift max-w-screen-sm md:mx-auto mx-6 relative" style="--bd: var(--color-line)">
      <div class="cut-inner chamfer-lg p-12" style="--sf: var(--color-card)">
        <h2 id="cookie-dialog-title" class="font-display font-bold mt-3 mb-1 text-fg">Cookiehinweis</h2>
        <p class="text-fg-muted text-sm">
          Diese Seite verwendet ausschließlich technisch notwendige Cookies, um die korrekte Funktionsweise der Seite zu garantieren. Details dazu findest du in meiner
          <NuxtLink to="/privacy" class="underline hover:text-accent">Datenschutzerklärung</NuxtLink>.
        </p>
        <div class="flex mt-6">
          <UiButton variant="primary" @click="accept">Akzeptieren</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(true);
const COOKIE_MAX_AGE_6_MONTHS = 180 * 24 * 60 * 60;
const cookieAccept = useCookie("cAccept", { maxAge: COOKIE_MAX_AGE_6_MONTHS });

useBodyOverflow(visible);

function accept() {
  cookieAccept.value = "accepted";
  visible.value = false;
}
</script>
