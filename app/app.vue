<template>
  <!-- Ausserhalb von NuxtLayout: dessen Wurzel-Div hat `isolate` und wuerde den
       Balken sonst in seinen eigenen Stacking-Context sperren. -->
  <NuxtLoadingIndicator
    :height="3"
    color="linear-gradient(to right, var(--color-accent), var(--color-secondary))"
    error-color="var(--color-secondary)"
  />
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="top-right" richColors />
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>
