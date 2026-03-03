# Backend Changes Required

> **Purpose**: This document lists changes needed in the Laravel backend to fully support the Blackbeetle frontend.  
> **Last Updated**: January 25, 2026  
> **Status**: ✅ All critical issues resolved

---

## Summary

| Change | Priority | Status |
|--------|----------|--------|
| ~~Add `images_count` to AlbumResource~~ | High | ✅ Done |
| ~~Add single option endpoint~~ | Medium | ✅ Done |
| ~~Rename `gallery` to `images`~~ | Low | ✅ Done (uses `images`) |
| ~~Add post sorting parameter~~ | Medium | ✅ Done |

---

## Resolved Items

### ✅ 1. `images_count` in AlbumResource

The API now includes `images_count` in the album response.

### ✅ 2. Single Option Endpoint

The API now provides:
```
GET /api/v1/options/{name}
```

Example:
```
GET /api/v1/options/my_location
```

### ✅ 3. Albums Use `images` Field

AlbumResource now returns `images` instead of `gallery`:
```json
{
  "data": {
    "images": [...]
  }
}
```

### ✅ 4. Option `value` Field

Options now return `value` directly as the parsed type (not JSON string):
- For `my_location`: `value` is an object with `{ position, info }`
- Frontend updated to handle mixed types via generic `IOption<T>`

---

## ✅ Post Sorting Parameter

The backend now supports the `order` parameter on all story endpoints:

```
GET /api/v1/stories/{slug}?order=desc
GET /api/v1/stories/id/{id}?order=desc
GET /api/v1/stories/{slug}/posts?order=desc
```

**Frontend Usage** ([pages/blog/[slug].vue](../../pages/blog/[slug].vue)):
```typescript
apiService.getStoryPosts<IPost>(slug, { 
  order: orderCookie.value || 'asc',
  order_by: 'date'
})
```

**Behavior**:
- `order=asc` — Posts sorted ascending (default)
- `order=desc` — Posts sorted descending
- Can be combined with `order_by` parameter

---

## API Reference (Current)

### Stories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/stories` | List all stories (paginated) |
| GET | `/api/v1/stories/{slug}` | Get story by slug |
| GET | `/api/v1/stories/id/{id}` | Get story by ID |
| GET | `/api/v1/stories/{slug}/posts` | Get story posts (paginated) |

**Query Parameters** (for story detail and posts):
- `order` — Sort order: `asc` or `desc`
- `order_by` — Sort field (e.g., `date`, `position`)
- `page` — Page number for pagination
- `per_page` — Results per page

### Albums
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/albums` | List all albums (paginated) |
| GET | `/api/v1/albums/{slug}` | Get album by slug |

### Options
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/options` | List all public options |
| GET | `/api/v1/options/{name}` | Get single option by name |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/comments` | Create a new comment |

---

## Media Handling

All media uses the Spatie Media Library `MediaResource`:

```json
{
  "id": 1,
  "name": "image.jpg",
  "file_name": "image.jpg",
  "mime_type": "image/jpeg",
  "urls": {
    "original": "https://...",
    "thumb": "https://...",
    "preview": "https://..."
  }
}
```

Frontend helper functions in [composables/useHelpers.ts](../../composables/useHelpers.ts):
- `getMediaUrl(media, size)` — Get URL for specific size
- `getMediaObj(media, size)` — Get URL and file_name
