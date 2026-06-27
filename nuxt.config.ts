export default defineNuxtConfig({
  compatibilityDate: "2025-01-22",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/eslint",
    "nuxt-security",
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
      meta: [
        { name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
        { property: "og:site_name", content: "Blackbeetle" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "de_DE" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "preload", href: "/fonts/hanken-grotesk/hanken-grotesk-latin.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
        { rel: "preload", href: "/fonts/space-grotesk/space-grotesk-latin.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://a.basemaps.cartocdn.com" },
        { rel: "dns-prefetch", href: "https://b.basemaps.cartocdn.com" },
        { rel: "dns-prefetch", href: "https://c.basemaps.cartocdn.com" },
      ],
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'nonce-{{nonce}}'", "'strict-dynamic'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'", "data:"],
        "frame-src": ["https://www.youtube-nocookie.com"],
        "connect-src": ["'self'", "https:"],
        "object-src": ["'none'"],
        "base-uri": ["'none'"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'self'"],
        "script-src-attr": ["'none'"],
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
      xFrameOptions: "DENY",
      referrerPolicy: "strict-origin-when-cross-origin",
      crossOriginEmbedderPolicy: "unsafe-none",
    },
    corsHandler: {
      origin: "https://api.blackbeetle.de",
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/**": {
        headers: {
          "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
      },
      "/_nuxt/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
      "/fonts/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
      "/img/**": {
        headers: {
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
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
