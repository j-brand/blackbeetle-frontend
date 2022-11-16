export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
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
      lgLicenseKey: "",
    },
  },
  build: {
    transpile: ["@googlemaps/js-api-loader", "lazysizes"],
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
