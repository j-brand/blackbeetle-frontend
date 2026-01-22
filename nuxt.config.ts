export default defineNuxtConfig({
  compatibilityDate: "2025-01-22",
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    publicUrl: "",
    public: {
      apiBase: "",
      backendUrl: "",
      lgLicenseKey: "",
    },
  },
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  sourcemap: {
    server: false,
    client: false,
  },
});
