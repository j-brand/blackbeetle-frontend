export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["@/assets/scss/main.scss"],
  // Korrekte Nitro-Konfiguration für Nuxt 3
  nitro: {
    // Host-Konfiguration für Plesk
    experimental: {
      wasm: true,
    },
    minify: true,
    compressPublicAssets: true,
  },

  // Server-Konfiguration (statt nitro.port)
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: process.env.HOST || "0.0.0.0",
  },
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
