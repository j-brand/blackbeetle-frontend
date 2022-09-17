export default defineNuxtConfig({
  target: "static",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/image-edge"],
  css: ["@/assets/scss/main.scss", "vue-toastification/src/scss/index.scss"],
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
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
