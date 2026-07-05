<template>
  <div class="min-h-screen flex flex-col relative isolate" style="background:var(--color-bg); color:var(--color-fg);">
    <CrawlingBeetles :enabled="beetlesEnabled" />
    <a href="#main-content" class="skip-to-content">Zum Inhalt springen</a>
    <LayoutNavigationDefault />

    <main id="main-content" class="flex-1 w-full max-w-none px-6 lg:px-12 pt-12 pb-48">
      <slot />
    </main>
    <LayoutFooterDefault />
    <CommonCookieNotice v-if="!cookieAccept" />
  </div>
</template>

<script setup lang="ts">
const cookieAccept = useCookie("cAccept");
const preferDark = ref(false);
const route = useRoute();

// Krabbelnde Käfer: standardmäßig auf allen Seiten aktiv.
// Pro Seite abschaltbar mit definePageMeta({ beetles: false }).
const beetlesEnabled = computed(() => route.meta.beetles !== false);

if (import.meta.client) {
  preferDark.value = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

const requestUrl = useRequestURL();
const canonicalUrl = computed(() => `${requestUrl.origin}${route.path}`);

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
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ]),
});
</script>
