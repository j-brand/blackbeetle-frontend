<template>
  <main class="relative h-full min-h-screen overflow-hidden">
    <a href="#main-content" class="skip-to-content">Zum Inhalt springen</a>
    <LayoutNavigationDefault />
    <div class="pattern-bg absolute w-full h-full"></div>

    <div id="main-content" class="pt-32 pb-48 px-3 md:pt-36 lg:px-0">
      <slot />
    </div>
    <LayoutFooterDefault />
    <transition name="fade">
      <CommonCookieNotice v-if="!cookieAccept" />
    </transition>
  </main>
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
