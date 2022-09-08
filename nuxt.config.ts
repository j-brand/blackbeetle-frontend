import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: "static",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/image-edge"],
/*   build: {
    transpile: ["lightgallery"],
  }, */
  css: ["@/assets/scss/main.scss"],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    publicUrl: "",
    public: {
      apiBase: "",
      backendUrl: "",
      googleApiKey: "",
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
  image: {
    //domains: [process.env.NUXT_PUBLIC_URL],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
