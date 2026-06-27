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
  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Hanken Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600] },
    ],
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
      meta: [
        { name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
        { property: "og:site_name", content: "Blackbeetle" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "de_DE" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/**": {
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
          "X-XSS-Protection": "1; mode=block",
          "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; frame-src https://www.youtube-nocookie.com; connect-src 'self' https:;",
          "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
      },
    },
  },
  experimental: {
    typedPages: true,
  },
  image: {
    quality: 80,
    format: ["webp", "avif"],
  },
});
