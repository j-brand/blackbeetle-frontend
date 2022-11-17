<template>
  <main class="relative h-full min-h-screen overflow-hidden">
    <Head>
      <Meta name="description" content="Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." />
      <Link v-if="preferDark" rel="icon" type="image/png" href="/img/fav/favicon-light.ico" />
      <Link v-if="!preferDark" rel="icon" type="image/png" href="/img/fav/favicon-dark.ico" />
    </Head>
    <LayoutNavigationDefault />
    <div class="pattern-bg absolute w-full h-full"></div>

    <div class="pt-32 pb-48 px-3 md:pt-36 lg:px-0">
      <slot />
    </div>
    <LayoutFooterDefault />
    <transition name="fade">
      <CookieNotice v-if="!cookieAccept" />
    </transition>
  </main>
</template>

<script setup lang="ts">
const cookieAccept = useCookie("cAccept");
const preferDark = ref(false);

if (process.client) {
  preferDark.value = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Blackbeetle - ${titleChunk}` : "Blackbeetle";
  },
  htmlAttrs: {
    lang: "de",
  },
});
</script>
