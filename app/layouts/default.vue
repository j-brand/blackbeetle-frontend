<template>
  <div class="min-h-screen flex flex-col" style="background:var(--color-bg); color:var(--color-fg);">
    <a href="#main-content" class="skip-to-content">Zum Inhalt springen</a>
    <LayoutNavigationDefault />

    <main id="main-content" class="flex-1 mx-auto max-w-none px-6 lg:px-12 pt-12 pb-48">
      <slot />
    </main>
    <LayoutFooterDefault />
    <transition name="fade">
      <CommonCookieNotice v-if="!cookieAccept" />
    </transition>
  </div>
</template>

<script setup lang="ts">
const cookieAccept = useCookie("cAccept");
const preferDark = ref(false);

if (import.meta.client) {
  preferDark.value = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Blackbeetle - ${titleChunk}` : "Blackbeetle";
  },
  htmlAttrs: {
    lang: "de",
  },
  meta: [
    { name: "description", content: "Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." },
  ],
  link: computed(() => [
    {
      rel: "icon",
      type: "image/png",
      href: preferDark.value ? "/img/fav/favicon-light.ico" : "/img/fav/favicon-dark.ico",
    },
  ]),
});
</script>
