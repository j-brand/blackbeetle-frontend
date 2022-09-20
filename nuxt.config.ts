export default defineNuxtConfig({
  target: "static",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/image-edge"],
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
    transpile: ["@googlemaps/js-api-loader"],
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
