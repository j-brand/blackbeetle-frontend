<template>
  <header class="sticky top-0 z-30 backdrop-blur-md" style="background:color-mix(in oklab, var(--color-bg) 80%, transparent); border-bottom:1px solid var(--color-line);">
    <div class="mx-auto max-w-[1200px] px-6 lg:px-12 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" aria-label="Startseite" class="flex items-center gap-3">
          <ClientOnly>
            <img
              class="h-8 w-8"
              :src="colorMode.value === 'dark' ? '/img/bb-logo_light.png' : '/img/bb-logo.png'"
              alt="Blackbeetle Logo"
            />
          </ClientOnly>
          <div class="leading-tight">
            <div class="font-display font-bold tracking-tight text-[15px]" style="color:var(--color-fg)">Blackbeetle</div>
          </div>
        </NuxtLink>
      </div>

      <nav class="hidden md:flex items-center gap-1 ml-3">
        <NuxtLink to="/" exact class="bb-nav-link" active-class="bb-nav-active">Start</NuxtLink>
        <NuxtLink to="/about" class="bb-nav-link" active-class="bb-nav-active">Über</NuxtLink>
        <NuxtLink to="/blog" class="bb-nav-link" active-class="bb-nav-active">Geschichten</NuxtLink>
        <NuxtLink to="/gallery" class="bb-nav-link" active-class="bb-nav-active">Galerie</NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <ClientOnly>
          <div class="hidden md:flex items-center gap-2">
            <span class="font-mono text-[11px]" style="color:var(--color-fg-subtle)">light</span>
            <button @click="toggleDarkMode" aria-label="Farbmodus wechseln"
              class="chamfer-quad relative h-8 w-[58px] transition-colors"
              style="--c:6px; background:var(--color-line-strong);">
              <span class="chamfer-quad absolute top-1 left-1 size-6 grid place-items-center transition-transform duration-300"
                :style="`--c:5px; background:var(--color-card); transform:${colorMode.value === 'dark' ? 'translateX(26px)' : 'translateX(0)'}`">
                <span class="font-mono text-[11px]" style="color:var(--color-fg)">{{ colorMode.value === 'dark' ? '☾' : '☀' }}</span>
              </span>
            </button>
            <span class="font-mono text-[11px]" style="color:var(--color-fg-subtle)">dark</span>
          </div>
        </ClientOnly>

        <button @click="toggleNav" aria-label="Menü" :aria-expanded="navOpen"
          class="md:hidden chamfer-quad size-9 grid place-items-center"
          :style="navOpen
            ? '--c:6px; background:var(--color-primary); color:var(--color-primary-fg)'
            : '--c:6px; background:var(--color-sunken); color:var(--color-fg)'">
          <span v-if="!navOpen" class="grid place-items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </span>
          <span v-else class="text-base leading-none">✕</span>
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <div v-if="navOpen" class="md:hidden absolute inset-x-0 top-16 z-40 border-t"
        style="border-color:var(--color-line); background:var(--color-card);">
        <nav class="p-3 flex flex-col gap-1">
          <NuxtLink @click="closeNav" to="/" exact
            class="bb-drawer-link" active-class="bb-drawer-active">
            Start
          </NuxtLink>
          <NuxtLink @click="closeNav" to="/about"
            class="bb-drawer-link" active-class="bb-drawer-active">
            Über
          </NuxtLink>
          <NuxtLink @click="closeNav" to="/blog"
            class="bb-drawer-link" active-class="bb-drawer-active">
            Geschichten
          </NuxtLink>
          <NuxtLink @click="closeNav" to="/gallery"
            class="bb-drawer-link" active-class="bb-drawer-active">
            Galerie
          </NuxtLink>
          <ClientOnly>
            <div class="flex items-center gap-2 px-3 py-2 mt-1">
              <span class="font-mono text-[11px]" style="color:var(--color-fg-subtle)">light</span>
              <button @click="toggleDarkMode" aria-label="Farbmodus wechseln"
                class="chamfer-quad relative h-8 w-[58px] transition-colors"
                style="--c:6px; background:var(--color-line-strong);">
                <span class="chamfer-quad absolute top-1 left-1 size-6 grid place-items-center transition-transform duration-300"
                  :style="`--c:5px; background:var(--color-card); transform:${colorMode.value === 'dark' ? 'translateX(26px)' : 'translateX(0)'}`">
                  <span class="font-mono text-[11px]" style="color:var(--color-fg)">{{ colorMode.value === 'dark' ? '☾' : '☀' }}</span>
                </span>
              </button>
              <span class="font-mono text-[11px]" style="color:var(--color-fg-subtle)">dark</span>
            </div>
          </ClientOnly>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const navOpen = useState("navOpen", () => false);
const colorMode = useColorMode();

function toggleDarkMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

function toggleNav() {
  navOpen.value = !navOpen.value;
  if (navOpen.value) {
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
