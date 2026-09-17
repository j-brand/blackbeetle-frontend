// Optionaler Reverse-Proxy-Host fuer den Dev-Server; leer = rein lokal ueber localhost.
const devHost = process.env.NUXT_DEV_HOST;

// Absolute API-Origin, falls die API NICHT ueber dieselbe Origin laeuft. Leer
// heisst: relative /api/v1/... auf der eigenen Origin, dann deckt 'self' alles ab.
const devApiOrigin = process.env.NUXT_PUBLIC_API_BASE || "";
const devCspOrigins = devApiOrigin ? [devApiOrigin] : [];

// Serverseitige API-Adresse; dient auch dem Dev-Proxy weiter unten.
const internalApi = process.env.NUXT_API_BASE_INTERNAL || "";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-22",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "nuxt-security",
  ],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    // Nur serverseitig: laeuft der Dev-Server im Container, zeigt localhost
    // dort auf den Container selbst und nicht auf das Backend.
    apiBaseInternal: '',
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
    server: devHost
      ? {
          allowedHosts: [devHost],
          hmr: {
            protocol: 'wss',
            host: devHost,
            clientPort: 443,
          },
        }
      : {},
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
    // Ueber die Domain routet Caddy /api und /storage ans Backend. Ohne Caddy
    // davor (http://localhost:3021) uebernimmt das dieser Proxy, damit beide
    // Zugangswege dieselben relativen URLs benutzen koennen.
    devProxy: internalApi
      ? {
          "/api": { target: `${internalApi}/api`, changeOrigin: true },
          "/storage": { target: `${internalApi}/storage`, changeOrigin: true },
        }
      : {},
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
  // Im Dev-Modus liefert das lokale Backend API, Bilder und Videos ueber http,
  // was die Produktions-CSP ('self' + https:) sonst blockiert. Die Listen
  // werden an die Basis-Direktiven oben angehaengt, nicht ersetzt.
  $development: {
    security: {
      headers: {
        contentSecurityPolicy: {
          "connect-src": devCspOrigins,
          "img-src": devCspOrigins,
          "media-src": ["'self'", ...devCspOrigins],
        },
      },
    },
  },
});
