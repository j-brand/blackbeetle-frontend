export default defineNuxtConfig({
  compatibilityDate: "2025-01-22",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
  ],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      backendUrl: '',
      lgLicenseKey: '',
    },
  },
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  sourcemap: {
    server: false,
    client: false,
  },
  vite: {
    server: {
      allowedHosts: ['bb-frontend.blacknectar.de'],
      hmr: {
        protocol: 'wss',
        host: 'bb-frontend.blacknectar.de',
      },
    },
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    typedPages: true,
  },
  image: {
    quality: 80,
    format: ["webp", "avif"],
  },
});
