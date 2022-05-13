import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/scss/main.scss"],
  buildModules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    publicUrl: "",
    public: {
      apiBase: "", // Or a default value
      backendUrl: "",
      googleApiKey: "",
    },
  }
});
