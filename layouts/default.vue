<template>
  <div>
    <Head>
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta charset="UTF-8" />
      <Link v-if="preferDark" rel="icon" type="image/png" href="/img/fav/favicon-light.ico" />
      <Link v-if="!preferDark" rel="icon" type="image/png" href="/img/fav/favicon-dark.ico" />
    </Head>
    <LayoutNavigationDefault />
    <slot />
    <LayoutFooterDefault />
    <transition name="fade">
      <CookieNotice v-if="!cookieAccept" />
    </transition>
  </div>
</template>

<script setup lang="ts">
const cookieAccept = useCookie("cAccept");
const colorMode = useColorMode();
const preferDark = ref(false);

if (process.client) {
  preferDark.value = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

useHead({
  titleTemplate: "Blackbeetle - %s",
});
</script>
