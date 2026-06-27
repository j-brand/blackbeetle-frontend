# BlackBeetle Frontend — Security & Best Practices Audit

**Date:** 2026-03-14  
**Last Updated:** 2026-03-16  
**Scope:** Full codebase — configuration, components, pages, composables, API layer, CSS, tests  
**Framework:** Nuxt 4.2 / Vue 3.5 / Tailwind CSS 4.1 / TypeScript 5.7

---

## Summary

| Severity | Open |
|----------|------|
| 🟠 High | 0 |
| 🟡 Medium | 3 |
| 🔵 Low | 3 |
| ℹ️ Info | 4 |

---

## 1. High — Security & Reliability

_All high-severity issues resolved._

- ~~H-03: CSRF on POST requests~~ — **Resolved.** The only POST endpoint is public comment submission (no auth sessions). CSRF tokens require sessions which don't exist here. Client-side rate limiting (30s cooldown) added. Honeypot bot protection already in place. Server-side rate limiting recommended for Laravel backend.

---

## 2. Medium — Best Practice Violations

### M-01: Direct DOM manipulation instead of Vue reactivity

| Field | Value |
|-------|-------|
| **Files** | `app/components/layout/NavigationDefault.vue`, `app/pages/poem.vue` |
| **Category** | Best Practice |

**Description:** Direct `document.body.style.overflowY` manipulation and `document.getElementById()` calls bypass Vue's reactivity model.

**Fix:** Use a composable (e.g., `useBodyOverflow()`) or `<Teleport>` for DOM manipulation outside the app root.

---

### M-14: `!important` overuse in LightGallery CSS

| Field | Value |
|-------|-------|
| **File** | `app/assets/css/light-gallery.css` |
| **Category** | Maintainability |

**Description:** Five `!important` flags used to override library styles. This creates specificity wars and makes future changes difficult.

**Fix:** Use higher-specificity selectors or wrapper classes instead.

---

### M-15: Hardcoded colors in CSS instead of theme variables

| Field | Value |
|-------|-------|
| **Files** | `app/assets/css/pattern-bg.css`, `app/assets/css/custom.css` (anaglyph effect) |
| **Category** | Maintainability — Theme Consistency |

**Description:** 20+ hardcoded hex/RGB colors in the pattern background and anaglyph text effect not using the project's CSS variable system.

**Fix:** Extract to `--color-bb-*` variables in the `@theme` block of `main.css`.

---

## 3. Low — Code Quality & Maintainability

### L-03: Hardcoded "Berlin" label

| File | `app/components/MapCircle.vue` |
|------|------|
| **Category** | Maintainability |

Returns hardcoded `info: "Berlin"` as the map marker label. API does not provide a location name field, so this is a known limitation.

**Fix:** Accept as prop or add a `label` field to the API response.

---

### L-04: Hardcoded font-family in Alice SVG text

| File | `app/components/Alice.vue` |
|------|------|
| **Category** | Maintainability |

`font-family: "Helvetica Neue", Arial` in the SVG text style. Should reference a CSS variable for consistency.

---

### L-12: `eslint-disable` for `no-explicit-any`

| Files | `app/components/post/Image.vue`, `app/components/map/MapBounds.vue` |
|-------|------|
| **Category** | Type Safety |

ESLint `any` suppression should be replaced with proper types (Leaflet types).

**Fix:** Add `@types/leaflet` and use proper Leaflet type definitions.

---

## 4. Info — Suggestions

### I-01: Consider `nuxt-security` module
The `nuxt-security` module provides CSP, rate limiting, CORS handling, and security headers out of the box. Highly recommended for production.

- ~~I-02: No rate limiting on comment submission~~ — **Resolved.** Added 30-second client-side cooldown in `PostComment.vue`. Server-side rate limiting (e.g., max 5/min per IP) recommended for Laravel backend.

- ~~I-03: LightGallery license key in public runtime config~~ — **Resolved.** This is a per-domain license key, not a secret. LightGallery uses an honor-based licensing model; exposing it in the client bundle is expected and acceptable.

### I-04: Consider i18n for German strings
Hardcoded German strings in validators and components would benefit from an i18n library if multi-language support is ever needed.

### I-05: Vite `allowedHosts` contains specific domain
`allowedHosts: ['bb-frontend.blacknectar.de']` in dev config — ensure this domain is controlled. In dev, this prevents HMR hijacking.

### I-06: No structured error logging
No error tracking service (Sentry, LogRocket, etc.) is configured. Production errors go unmonitored.

- ~~I-07: Icon component `fill` prop lacks default~~ — **Resolved.** Added `withDefaults(defineProps<{ fill?: string }>(), { fill: "currentColor" })` to all 10 icon components.

### I-08: Color palette in CircleAnimation.vue
Hardcoded color arrays (`["#fff1f2", "#ffe4e6", ...]`) should be extracted to a constants file.

---

## 5. Test Coverage Gaps

### Resolved Test Gaps (29 new tests added)

All previously missing composable and API service test scenarios have been covered:

- ✅ `api.service` — Network errors for all GET methods, null/undefined data, malformed error responses (9 tests)
- ✅ `useFormValidation` — XSS payloads, event handler injection, whitespace-only input (5 tests)
- ✅ `useHelpers` — Unicode/emoji in `getExcerpt`, media edge cases (5 tests)
- ✅ `useValidators` — Unicode email edge cases, `isEmpty` edge cases (8 tests)
- ✅ `useDetectOutsideClick` — `ref(null)` handling, element becoming null after mount (2 tests)

**Known limitation:** The email regex in `isEmail` accepts Unicode/emoji characters in the local part. This is documented in tests as expected behavior (not a security issue — server-side validation is the final gate).

**Total tests: 135 passing, 0 failures.**

### Untested Areas

| Area | Notes |
|------|-------|
| Components | No component tests exist |
| Pages | No page/route tests |
| Middleware | No middleware tests |
| Error boundaries | No tests for error states |
| SSR behavior | No SSR-specific tests |

---

## 6. Configuration

### Security Configuration Status

| Area | Status |
|------|--------|
| CSRF protection | ✅ N/A — no auth sessions; public endpoint with honeypot + rate limiting |
| Client-side rate limiting | ✅ 30s cooldown on comment submission |
| Server-side rate limiting | ⚠️ Recommended for Laravel backend (e.g., max 5/min per IP) |
| Subresource Integrity (SRI) | ✅ N/A — Nuxt bundles all assets with content-hashed filenames; no CDN-loaded third-party scripts |
| Error monitoring (Sentry) | ❌ Not configured |
