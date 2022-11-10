<template>
  <footer class="absolute bottom-0 left-0 right-0">
    <div class="bg-bb-charcoal dark:bg-[#4d4d4d] opacity-75 w-full py-2"></div>
    <div class="bg-bb-charcoal dark:bg-bb-charcoal-darker w-full text-bb-lighter py-1">
      <div class="container flex items-center justify-between flex-col md:flex-row py-3 px-5 mx-auto">
        <div class="flex flex-row">
          <div class="flex flex-col items-center md:items-start py-1">
            <span class="text-base font-sans-secondary h-7 leading-7">© 2022 BLACKBEETLE</span>
            <span class="h-7 leading-7"
              >Made with &#128150; and interest by
              <span class="text-bb-red h-7  leading-7">Johannes Brand</span>
            </span> 
          </div>
        </div>

        <div class="flex flex-row items-center mt-2 mb-3 md:mb-0">
          <NuxtLink to="/privacy" class="md:ml-4 opacity-70 hover:opacity-100 decoration-bb-lighter hover:underline">Datenschutzerklärung</NuxtLink>
          <NuxtLink to="/imprint" class="ml-4 opacity-70 hover:opacity-100 decoration-bb-lighter hover:underline">Impressum</NuxtLink>
        </div>
        <div class="flex flex-row gap-3">
          <NuxtLink to="mailto:contact@blackbeetle.de" class="opacity-70 hover:opacity-100" aria-label="schreib mir eine Nachricht"><IconMail :fill="$tailwind.colors['bb-lighter']" /></NuxtLink>
          <NuxtLink to="https://github.com/j-brand" target="_blank" class="opacity-70 hover:opacity-100" aria-label="Github Profil"><IconGithub :fill="$tailwind.colors['bb-lighter']" /></NuxtLink>
          <NuxtLink to="https://www.linkedin.com/in/j-brand-a82a46210/" target="_blank" class="opacity-70 hover:opacity-100" aria-label="LinkedIn Profil"><IconLinkedIn :fill="$tailwind.colors['bb-lighter']" /></NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { $tailwind } = useNuxtApp();
</script>
