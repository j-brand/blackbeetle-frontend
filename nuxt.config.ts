export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["@/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: { overrideBrowserslist: ["last 3 versions", "> 1%"] },
    },
  },
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
});
