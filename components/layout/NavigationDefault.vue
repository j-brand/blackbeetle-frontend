<template>
  <header class="bg-bb-lighter dark:bg-bb-charcoal-dark">
    <div class="lg:hidden z-50 absolute top-0 right-0">
      <button @click="toggleNav()" :class="navOpen ? 'is-active' : ''" class="hamburger block hamburger--spin" type="button" aria-label="Menü">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <ClientOnly>
      <ThemeSwitch class="left-0 top-4 lg:top-5 absolute z-[100] ml-4" />
    </ClientOnly>
    <div :class="navOpen ? 'nav-open' : ''" class="nav-mobile w-full relative flex flex-col justify-between items-center h-14 z-30 bg-bb-lighter dark:bg-bb-charcoal-dark">
      <nav>
        <NuxtLink @click.native="closeNav" to="/" exact class="nav-item nest">Nest</NuxtLink>
        <NuxtLink @click.native="closeNav" to="/about" class="nav-item">Über</NuxtLink>
        <NuxtLink @click.native="closeNav" to="/blog" class="nav-item">Geschichten</NuxtLink>
        <NuxtLink @click.native="closeNav" to="/gallery" class="nav-item">Galerie</NuxtLink>
      </nav>
      <div id="logo-wrapper">
        <NuxtLink to="/" alt="home" id="bb-logo-link" class="mx-auto z-10">
          <client-only>
            <img v-if="colorMode.value == 'light'" class="mt-6" src="/img/bb-logo.png" height="70" width="70" alt="Blackbeetle Logo" />
            <img v-if="colorMode.value == 'dark'" class="mt-6" src="/img/bb-logo_light.png" height="70" width="70" alt="Blackbeetle Logo" />
          </client-only>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navOpen = useState("navOpen", () => false);
const colorMode = useColorMode();

function toggleNav() {
  navOpen.value = !navOpen.value;

  if (navOpen.value == true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
}

function closeNav() {
  navOpen.value = false;
  document.body.style.overflowY = "scroll";
}
</script>
