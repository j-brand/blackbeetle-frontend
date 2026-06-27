# BlackBeetle Frontend — Accessibility, DSGVO & SEO Audit

**Date:** 2026-03-15  
**Scope:** WCAG 2.1 AA compliance, DSGVO (GDPR) readiness, SEO/social preview, bot & crawler blocking  
**Framework:** Nuxt 4.2 / Vue 3.5 / Tailwind CSS 4.1 / TypeScript 5.7

---

## Summary

| Category | Remaining |
|----------|-----------|
| Accessibility (WCAG) | 10 |
| DSGVO | 1 |
| SEO / Social Previews | 2 |
| Bot & Crawler Blocking | 0 ✅ |

---

## 1. Accessibility — WCAG 2.1 AA

### High

#### A-09: Video element has no title/label

| Field | Value |
|-------|-------|
| **File** | `app/components/post/Video.vue` |
| **WCAG** | 1.1.1 Non-text Content, 4.1.2 Name/Role/Value |

**Current:** `<video controls>` has no `title` or `aria-label` attribute.

**Fix:** Add `:title` or `:aria-label` with the video description.

---

#### A-10: Gallery image links have no accessible name

| Field | Value |
|-------|-------|
| **File** | `app/pages/gallery/[slug].vue` |
| **WCAG** | 2.4.4 Link Purpose, 1.1.1 Non-text Content |

**Current:** `<a>` tags wrapping gallery images have no text content or `aria-label`. Screen readers announce them as "link" with the URL.

**Fix:** Add `:aria-label` with the image name/description.

---

### Medium

#### A-14: Image captions not associated with images

| Field | Value |
|-------|-------|
| **File** | `app/components/post/Image.vue` |
| **WCAG** | 1.3.1 Info and Relationships |

**Current:** Hidden `<span :id="'caption_' + index">` exists but is not linked to the image via `aria-describedby`.

**Fix:** Add `:aria-describedby="'caption_' + index"` to the `<img>`.

---

#### A-15: SVG in Alice.vue has semantic text without proper role

| Field | Value |
|-------|-------|
| **File** | `app/components/Alice.vue` |
| **WCAG** | 1.1.1 Non-text Content |

**Current:** SVG contains `<textPath>` elements with readable German text but no `role="img"` or `aria-label` on the SVG.

**Fix:** Add `role="img"` and `aria-label` summarizing the content to the SVG element.

---

#### A-16: Map container has no accessible description

| Field | Value |
|-------|-------|
| **File** | `app/components/map/MapContainer.vue` |
| **WCAG** | 1.1.1 Non-text Content |

**Current:** Map container has no `aria-label` or fallback text for screen reader users.

**Fix:** Add `aria-label="Interaktive Karte"` and consider providing a text alternative.

---

#### A-17: Textarea maxlength with no character count feedback

| Field | Value |
|-------|-------|
| **File** | `app/components/ui/Textarea.vue` |
| **WCAG** | 3.3.2 Labels or Instructions |

**Current:** `maxlength` attribute is present but users get no feedback about remaining characters.

**Fix:** Add an `aria-live` character counter below the textarea.

---

### Low

#### A-19: Identical alt text on two different Alice images

| File | `app/components/Alice.vue` |
|------|------|

Both `img_center` (Mandala) and `alice-image` (flamingo SVG) share the same alt text. Should be distinct.

---

#### A-20: Sort order toggle button label is vague

| File | `app/pages/blog/[slug].vue` |
|------|------|

`aria-label="reverse post order"` doesn't indicate current state. Should dynamically indicate "ascending" or "descending".

---

#### A-21: Icon-only close button may need larger touch target

| File | `app/components/modal/PostComment.vue` |
|------|------|

Close button (`<button>`) with only an icon is small. WCAG 2.5.8 recommends minimum 24×24px touch targets.

---

#### A-22: Pagination should use `<nav>` with unique `aria-label`

| File | `app/components/common/Pagination.vue` |
|------|------|

`aria-label="Seitennavigation"` is generic. If multiple paginators exist on a page, labels should be unique (e.g., "Seitennavigation Beiträge").

---

## 2. DSGVO (GDPR) Compliance

### High

#### D-03: Privacy page references Google Web Fonts — no longer used

| Field | Value |
|-------|-------|
| **File** | `app/pages/privacy.vue` |
| **DSGVO** | Art. 13 — Accuracy of Information |

**Current:** Privacy page documents Google Web Fonts usage and references the invalidated EU-US Privacy Shield framework. However, the actual codebase uses self-hosted fonts from `app/assets/fonts/`.

**Fix:** Remove the Google Web Fonts section from the privacy page — it's misleading. Document self-hosted fonts instead.

---

## 3. SEO / Social Previews

### Medium

#### S-05: No canonical URL meta tag

| Field | Value |
|-------|-------|
| **Files** | All pages |

**Current:** No `<link rel="canonical">` on any page. Without canonicals, if pages are accidentally accessible via multiple URLs, duplicate content issues arise.

**Fix:** Add `<link rel="canonical">` in `default.vue` using `useHead`. Even for non-indexed sites, canonicals help when links are shared.

---

### Low

#### S-06: No structured data (JSON-LD)

Not strictly needed for a personal blog, but would improve link previews in some messaging apps. Optional.


