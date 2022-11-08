<template>
  <main class="relative h-full min-h-screen">
    <Head>
      <Meta name="description" content="Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." />
      <Link v-if="preferDark" rel="icon" type="image/png" href="/img/fav/favicon-light.ico" />
      <Link v-if="!preferDark" rel="icon" type="image/png" href="/img/fav/favicon-dark.ico" />
    </Head>
    <LayoutNavigationDefault />
    <div class="pattern-bg absolute w-full h-full"></div>

    <slot/>
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
  htmlAttrs: {
    lang: 'de',
  },
  titleTemplate: "Blackbeetle - %s",
});
</script>
