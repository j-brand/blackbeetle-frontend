# Testing Guide

> **Last Updated**: March 14, 2026  
> **Test Framework**: Vitest 4.x with `@nuxt/test-utils`  
> **DOM Environment**: happy-dom

---

## Quick Start

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run a single test file
npx vitest run tests/composables/useHelpers.test.ts
```

---

## Project Structure

```
tests/
├── composables/
│   ├── useButtonState.test.ts       # Button disabled state logic
│   ├── useDetectOutsideClick.test.ts # Click-outside detection
│   ├── useFormValidation.test.ts    # Form validation orchestrator
│   ├── useHelpers.test.ts           # Utility functions (slugify, dates, media)
│   └── useValidators.test.ts        # Individual field validators
└── lib/
    └── api.service.test.ts          # API service (all endpoints)
```

---

## Coverage

Coverage is configured for `v8` provider with these targets:

| Directory | Coverage Target |
|-----------|----------------|
| `app/composables/**` | ✅ Covered (~96%) |
| `app/lib/**` | ✅ Covered (100%) |
| `app/components/**` | ⬜ Not yet covered |

Run `npm run test:coverage` to generate an HTML report in `coverage/`.

---

## Test Configuration

Configuration lives in [`vitest.config.ts`](../vitest.config.ts):

```typescript
environment: "nuxt"           // Uses @nuxt/test-utils Nuxt environment
domEnvironment: "happy-dom"   // Fast DOM implementation
include: ["tests/**/*.{test,spec}.{js,ts}"]
```

### Nuxt Test Environment

Tests run in a full Nuxt environment which means:
- **Auto-imports work**: `computed`, `reactive`, `ref`, `onMounted`, etc. are available
- **`useRuntimeConfig()`** returns the Nuxt config (apiBase is empty in tests)
- **`$fetch`** can be mocked globally with `vi.stubGlobal("$fetch", mockFn)`
- Color-mode plugin may emit warnings (harmless, can be ignored)

---

## Writing Tests

### Composable Tests

Composables are plain functions - import and test directly:

```typescript
import { describe, it, expect } from "vitest";
import { useHelper } from "~/composables/useHelpers";

describe("useHelper", () => {
  const { slugify } = useHelper();

  it("should slugify text", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
});
```

### API Service Tests

Mock `$fetch` globally before importing the service:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);

import { apiService } from "~/lib/api.service";

describe("apiService", () => {
  beforeEach(() => mockFetch.mockReset());

  it("should fetch stories", async () => {
    mockFetch.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const result = await apiService.get("/stories");
    expect(mockFetch).toHaveBeenCalledWith("/api/v1/stories");
    expect(result).toEqual([{ id: 1 }]);
  });
});
```

### Testing with Null/Undefined Data

The API may return incomplete data. Always test null safety:

```typescript
it("should handle null media gracefully", () => {
  expect(getBestMediaUrl(null, "large")).toBe("");
});
```

---

## Testing Guidelines

1. **Test behavior, not implementation** — test what functions return, not internal steps
2. **Test edge cases** — null, undefined, empty strings, boundary values
3. **German locale** — validation messages are in German, test exact strings
4. **Mock at boundaries** — only mock `$fetch` and external APIs, not internal functions
5. **Isolate tests** — use `beforeEach` to reset mocks between tests
6. **Descriptive names** — test names should read like specifications

---

## Known Issues

- **Color-mode warnings**: The `@nuxtjs/color-mode` plugin emits errors during test initialization. These are harmless and don't affect test results.
- **`<Suspense>` warning**: Vue's experimental Suspense feature warning appears in stdout. This is expected in Nuxt 4 environments.
