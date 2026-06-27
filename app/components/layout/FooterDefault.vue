<template>
  <footer class="border-t" style="border-color:var(--color-line);">
    <div class="mx-auto max-w-[1200px] px-6 lg:px-12 py-12 flex items-center justify-between flex-wrap gap-4">
      <div class="flex flex-col gap-1">
        <span class="font-mono text-[11px] tracking-wide uppercase" style="color:var(--color-fg-subtle)">&copy; {{ currentYear }} Black Beetle</span>
        <span class="text-sm" style="color:var(--color-fg-muted)">
          Made with 💚 by
          <span style="color:var(--color-accent)">Johannes Brand</span>
        </span>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink to="/privacy" class="text-sm hover:underline" style="color:var(--color-fg-muted)">Datenschutz</NuxtLink>
        <NuxtLink to="/imprint" class="text-sm hover:underline" style="color:var(--color-fg-muted)">Impressum</NuxtLink>
      </div>

      <div class="flex items-center gap-3">
        <a href="mailto:contact@blackbeetle.de" class="opacity-70 hover:opacity-100" style="color:var(--color-fg-muted)" aria-label="E-Mail senden"><IconMail fill="currentColor" /></a>
        <a href="https://github.com/j-brand" target="_blank" rel="noopener noreferrer" class="opacity-70 hover:opacity-100" style="color:var(--color-fg-muted)" aria-label="Github Profil"><IconGithub fill="currentColor" /></a>
        <a href="https://www.linkedin.com/in/j-brand-a82a46210/" target="_blank" rel="noopener noreferrer" class="opacity-70 hover:opacity-100" style="color:var(--color-fg-muted)" aria-label="LinkedIn Profil"><IconLinkedIn fill="currentColor" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
