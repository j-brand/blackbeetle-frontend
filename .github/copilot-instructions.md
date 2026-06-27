# GitHub Copilot Instructions

## Project Overview

**BlackBeetle Frontend** - A personal blog/gallery web application built with modern web technologies.

## Best Practices

### General Guidelines
- Follow **clean code** principles: meaningful names, small functions, single responsibility
- Use **TypeScript** strictly - always define types, avoid `any`
- Use `import type` for type-only imports to improve tree-shaking
- Prefer **composition API** with `<script setup>` syntax in Vue components
- Use **CSS variables** from the theme (e.g., `var(--color-bb-*)`) instead of hardcoded colors
- Always use **semantic HTML** elements
- Follow **mobile-first** responsive design patterns
- Keep accessibility (a11y) in mind - use proper ARIA attributes when needed

### Vue/Nuxt Specific
- Use Nuxt auto-imports for composables, components, and utilities
- Prefer `useFetch` or `useAsyncData` for data fetching
- Use `$fetch` for client-side API calls (not axios)
- Define page metadata using `definePageMeta`
- `@/` and `~/` aliases resolve to the `app/` directory; use `~~/` for project root
- Component names should be PascalCase
- Use scoped styles with `<style scoped>` when possible
- Use `import.meta.client` / `import.meta.server` instead of `process.client` / `process.server`

### Tailwind CSS v4
- Theme is defined in `app/assets/css/main.css` using `@theme` directive
- Use CSS variables: `var(--color-bb-white)`, `var(--color-bb-charcoal)`, etc.
- Custom utilities use `@utility` directive (not `@layer components`)
- For `@apply` in Vue `<style>` blocks, add `@reference "@/assets/css/main.css";`
- Use standard CSS media queries: `@media (width >= 1024px)` instead of `@screen`
- Prefer Tailwind utility classes over custom CSS when possible

### TypeScript
- Define interfaces in `app/types/index.ts`
- Use `import type { ... }` for type imports
- Avoid using `PropType` from Vue - prefer type inference from `defineProps`
- Use strict null checks

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Nuxt | 4.2.2+ | Full-stack Vue framework |
| Vue | 3.5+ | Frontend framework |
| TypeScript | 5.7+ | Type safety |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.1+ | Utility-first CSS framework |
| @nuxtjs/tailwindcss | 7.0+ | Nuxt module for Tailwind |
| @nuxtjs/color-mode | 4.0+ | Dark/light mode support |

### UI Components & Libraries
| Technology | Version | Purpose |
|------------|---------|---------|
| Swiper | 12.0+ | Touch slider/carousel |
| LightGallery | 2.8+ | Image gallery lightbox |
| vue3-emoji-picker | 1.1+ | Emoji picker component |
| vue-sonner | 2.0+ | Toast notifications |

### Maps
| Technology | Version | Purpose |
|------------|---------|---------|
| Leaflet | 1.9+ | Interactive maps |
| @vue-leaflet/vue-leaflet | 0.10+ | Vue 3 Leaflet wrapper |

### Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| GSAP | 3.12+ | Animation library |
| Anime.js | 4.3+ | Animation library |

### Development
| Technology | Purpose |
|------------|---------|
| NixOS Flake + devenv | Development environment |
| direnv | Auto-load dev environment |
| Node.js 22 | JavaScript runtime |

## Project Structure

```
├── app/
│   ├── app.vue            # Root app component
│   ├── assets/
│   │   ├── css/           # Tailwind CSS v4 stylesheets
│   │   │   ├── main.css   # Entry point with @theme
│   │   │   └── *.css      # Feature-specific styles
│   │   └── fonts/         # Custom web fonts
│   ├── components/
│   │   ├── common/        # Shared components (Loader, Pagination, etc.)
│   │   ├── icon/          # SVG icon components
│   │   ├── layout/        # Layout components (Navigation, Footer, LazyImage)
│   │   ├── map/           # Map components
│   │   ├── modal/         # Modal dialog components
│   │   ├── post/          # Blog post components
│   │   ├── ui/            # UI primitives (Button, Input, Checkbox, Textarea)
│   │   └── *.vue          # Feature components
│   ├── composables/       # Vue composables
│   ├── layouts/           # Nuxt layouts
│   ├── lib/               # Utility libraries (API service)
│   ├── middleware/         # Route middleware
│   ├── pages/             # File-based routing
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── tests/                 # Unit tests
```

## MCP (Model Context Protocol) Servers

The following MCP servers are available for this project:

### Nuxt MCP Server
- **Tools**: `list-documentation-pages`, `get-documentation-page`, `list-modules`, `get-module`, `list-blog-posts`, `get-blog-post`, `list-deploy-providers`, `get-deploy-provider`
- **Use for**: Nuxt documentation, module discovery, deployment guides
- **Example**: Finding Nuxt 4 migration guides, checking module compatibility, discovering available modules

### Tailwind CSS MCP Server
- **Tools**: `fetch_tailwindcss_documentation`, `search_tailwindcss_documentation`, `search_tailwindcss_code`
- **Use for**: Tailwind CSS v4 documentation and best practices
- **Example**: Understanding new v4 syntax, utility classes, theme configuration, custom directives

### Vue.js MCP Server
- **Tools**: `fetch_core_documentation`, `search_core_documentation`, `search_core_code`
- **Use for**: Vue 3 core documentation, composition API, reactivity system
- **Example**: Understanding Vue 3 reactivity, composables patterns, component lifecycle

### TypeScript MCP Server
- **Tools**: `fetch_typescript_documentation`, `search_typescript_documentation`, `search_typescript_code`
- **Use for**: TypeScript language features, type system, compiler options
- **Example**: Advanced type patterns, generic types, utility types, tsconfig configuration

### ESLint MCP Server
- **Tools**: `lint-files`
- **Use for**: Running ESLint checks on files
- **Example**: Validating code quality, checking for linting errors before commits

## API Integration

The backend API is a Laravel application. API calls should use:

```typescript
// Using the API service
import { apiService } from "@/lib/api.service";

const { data } = await useAsyncData("key", () => 
  apiService.get<IType>("/endpoint")
);
```

## Environment Variables

Configure in `.env` files (not tracked in git):
- `NUXT_PUBLIC_API_BASE` - API base URL
- `NUXT_PUBLIC_BACKEND_URL` - Backend URL for assets
- `NUXT_PUBLIC_LG_LICENSE_KEY` - LightGallery license key

## Common Patterns

### Data Fetching
```typescript
const { data, pending, error } = await useAsyncData("key", () =>
  apiService.get<IType>("/endpoint")
);
```

### Form Validation
```typescript
import { useFormValidation } from "@/composables/useFormValidation";
const { validate, errors } = useFormValidation();
```

### Theme Colors
```css
/* Use CSS variables from @theme */
background-color: var(--color-bb-white);
color: var(--color-bb-charcoal);

/* Or Tailwind classes */
@apply bg-bb-white text-bb-charcoal;
```

### Dark Mode
```css
/* CSS approach */
.dark .element { ... }

/* Tailwind approach */
@apply dark:bg-bb-charcoal dark:text-bb-light;
```

## Null Safety

API responses may contain null/undefined fields. Always guard against null data:

```typescript
// BAD - crashes when media is null
function getMediaUrl(media: IMedia): string {
  return media.urls.original;
}

// GOOD - null-safe with fallback
function getMediaUrl(media: IMedia | null | undefined): string {
  if (!media?.urls) return "";
  return media.urls.original;
}
```

Common fields that may be null from the API:
- `resource.title_image` — albums/stories may have no title image
- `post.images` / `post.videos` — posts may have no media
- `album.description` / `story.description` — descriptions are nullable
- `post.title` / `post.date` — post metadata is nullable

## Testing

### Guidelines
- **All composables and utilities must have tests** — target ≥95% coverage
- **Test null/undefined edge cases** — API data may be incomplete
- **Use Vitest** with `@nuxt/test-utils` for the Nuxt environment
- **Mock only at boundaries** — mock `$fetch`, not internal functions
- **German locale** — validation messages are in German, match exact strings
- **Run tests before committing** — `npm run test:run`

### Commands
```bash
npm test              # Watch mode
npm run test:run      # Run once
npm run test:coverage # Coverage report
```

### Test File Structure
```
tests/
├── composables/          # One test file per composable
│   ├── useButtonState.test.ts
│   ├── useDetectOutsideClick.test.ts
│   ├── useFormValidation.test.ts
│   ├── useHelpers.test.ts
│   └── useValidators.test.ts
└── lib/
    └── api.service.test.ts
```

### Writing API Service Tests
```typescript
const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);
import { apiService } from "~/lib/api.service";

// apiBase is empty in test env, so URLs start with /api/v1
expect(mockFetch).toHaveBeenCalledWith("/api/v1/stories");
```
