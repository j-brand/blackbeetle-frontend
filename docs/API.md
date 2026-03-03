# BlackBeetle API Documentation

> **Purpose**: This document describes all API endpoints used by the BlackBeetle frontend application.  
> **Backend Framework**: Laravel  
> **API Version**: v1  
> **Base URL**: `/api/v1`  
> **Last Updated**: January 25, 2026

---

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [API Response Format](#api-response-format)
3. [API Endpoints Overview](#api-endpoints-overview)
4. [Stories](#stories)
5. [Posts](#posts)
6. [Albums](#albums)
7. [Comments](#comments)
8. [Options](#options)
9. [Data Structures](#data-structures)
10. [Static Assets](#static-assets)

---

## Environment Configuration

The frontend requires the following environment variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NUXT_PUBLIC_API_BASE` | ✅ | Base URL for API (without `/api/v1`) | `https://api.blackbeetle.io` |
| `NUXT_PUBLIC_BACKEND_URL` | ✅ | Base URL for static assets | `https://api.blackbeetle.io` |
| `NUXT_PUBLIC_LG_LICENSE_KEY` | ❌ | LightGallery license key | `xxxxxxxx-xxxx-xxxx` |

### Example `.env` file

```bash
NUXT_PUBLIC_API_BASE=https://api.blackbeetle.io
NUXT_PUBLIC_BACKEND_URL=https://api.blackbeetle.io
NUXT_PUBLIC_LG_LICENSE_KEY=your-license-key
```

---

## API Response Format

### Single Resource

```json
{
  "data": { ... }
}
```

### Paginated Collection

```json
{
  "data": [ ... ],
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "path": "...",
    "per_page": 15,
    "to": 15,
    "total": 75
  }
}
```

---

## API Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/stories` | None | List all stories (paginated) |
| `GET` | `/api/v1/stories/{slug}` | None | Get single story by slug |
| `GET` | `/api/v1/stories/id/{id}` | None | Get single story by ID |
| `GET` | `/api/v1/stories/{slug}/posts` | None | Get story posts (paginated) |
| `GET` | `/api/v1/albums` | None | List all albums (paginated) |
| `GET` | `/api/v1/albums/{slug}` | None | Get single album with gallery |
| `GET` | `/api/v1/options` | None | List all public options |
| `GET` | `/api/v1/options/{name}` | None | Get single option by name |
| `POST` | `/api/v1/comments` | None | Create a comment (rate limited) |

---

## Stories

### GET `/api/v1/stories`

List all published stories.

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 15 | Items per page |

**Response:** Paginated `StoryResource[]`

```json
{
  "data": [
    {
      "id": 1,
      "title": "My Journey",
      "slug": "my-journey",
      "description": "A travel story...",
      "title_image": { /* MediaResource */ },
      "posts_count": 42
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

### GET `/api/v1/stories/{slug}`

Get a single story by slug.

**Examples:**
```
GET /api/v1/stories/my-journey
GET /api/v1/stories/my-journey?order=desc&order_by=date
```

**Path Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `slug` | string | Story URL slug |

**Query Parameters (for sorting):**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `order` | string | `asc` | Sort order: `asc` or `desc` |
| `order_by` | string | `position` | Sort field: `position` or `date` |

**Response:** `StoryResource`

```json
{
  "data": {
    "id": 1,
    "title": "My Journey",
    "slug": "my-journey",
    "description": "A travel story...",
    "title_image": { /* MediaResource */ },
    "posts_count": 42
  }
}
```

---

### GET `/api/v1/stories/id/{id}`

Get a single story by ID.

**Examples:**
```
GET /api/v1/stories/id/123
GET /api/v1/stories/id/123?order=desc
```

**Path Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `id` | integer | Story ID |

**Query Parameters:** Same as `/api/v1/stories/{slug}`

**Response:** Same as `/api/v1/stories/{slug}`

---

### GET `/api/v1/stories/{slug}/posts`

Get paginated posts for a story.

**Examples:**
```
GET /api/v1/stories/my-journey/posts
GET /api/v1/stories/my-journey/posts?page=2&order=desc&order_by=date
```

**Path Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `slug` | string | Story URL slug |

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 15 | Items per page |
| `order` | string | `asc` | Sort order: `asc` or `desc` |
| `order_by` | string | `position` | Sort field: `position` or `date` |

**Response:** Paginated `PostResource[]`

```json
{
  "data": [
    {
      "id": 101,
      "story_id": 1,
      "title": "Day 1",
      "content": "<p>We arrived at...</p>",
      "type": "html",
      "position": 1,
      "date": "2025-06-15",
      "images": [],
      "videos": [],
      "comments": [],
      "comments_count": 0
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

## Albums

### GET `/api/v1/albums`

List all published albums.

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 15 | Items per page |

**Response:** Paginated `AlbumResource[]`

```json
{
  "data": [
    {
      "id": 1,
      "title": "Summer 2025",
      "slug": "summer-2025",
      "description": "Photos from summer...",
      "title_image_text": "Beach sunset",
      "start_date": "2025-06-01",
      "end_date": "2025-08-31",
      "title_image": { /* MediaResource */ },
      "images_count": 156
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

### GET `/api/v1/albums/{slug}`

Get a single album with full gallery.

**Path Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `slug` | string | Album URL slug |

**Response:** `AlbumResource`

```json
{
  "data": {
    "id": 1,
    "title": "Summer 2025",
    "slug": "summer-2025",
    "description": "Photos from summer...",
    "title_image_text": "Beach sunset",
    "start_date": "2025-06-01",
    "end_date": "2025-08-31",
    "title_image": { /* MediaResource */ },
    "gallery": [ /* MediaResource[] */ ]
  }
}
```

---

## Comments

### POST `/api/v1/comments`

Create a new comment on a post.

> ⚠️ This endpoint is rate limited and protected by honeypot spam protection.

**Request Body:**

```json
{
  "post_id": 101,
  "name": "John Doe",
  "content": "Great post! 🎉"
}
```

**Validation Rules:**

| Field | Type | Rules |
|-------|------|-------|
| `post_id` | integer | Required, must exist in posts |
| `name` | string | Required, max 255 characters |
| `content` | string | Required, max 5000 characters |

**Response:** `201 Created`

```json
{
  "message": "Comment created successfully.",
  "data": {
    "id": 2,
    "post_id": 101,
    "name": "John Doe",
    "content": "Great post! 🎉",
    "created_at": "2025-06-16T12:00:00+00:00"
  }
}
```

**Errors:**
- `404 Not Found` — Post not found or inactive
- `422 Unprocessable Entity` — Validation errors
- `429 Too Many Requests` — Rate limit exceeded

---

## Options

### GET `/api/v1/options`

Get all public configuration options.

**Response:** `OptionResource[]`

```json
{
  "data": [
    {
      "name": "my_location",
      "value": "{\"position\":{\"lat\":52.52,\"lng\":13.405},\"info\":\"Berlin\"}"
    }
  ]
}
```

> **Note**: The `value` field may contain a JSON string that needs to be parsed client-side.

---

## Data Structures

### StoryResource

```typescript
interface IStory {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  title_image: IMedia;
  posts?: IPost[];
  posts_count: number;
}
```

### PostResource

```typescript
interface IPost {
  id: number;
  story_id: number;
  title: string | null;
  content: string;
  type: "html" | "image" | "video" | "map";
  position: number;
  date: string | null;
  images?: IMedia[];
  videos?: IMedia[];
  comments?: IComment[];
  comments_count?: number;
}
```

**Post Types:**

| Type | Content Field |
|------|---------------|
| `html` | HTML string |
| `image` | Not used (images in `images` array) |
| `video` | JSON: `{ "path": "youtube", "filename": "video_id" }` |
| `map` | JSON: `{ "zoomlevel": number, "coordinates": [...] }` |

### AlbumResource

```typescript
interface IAlbum {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  title_image_text: string | null;
  start_date: string | null;
  end_date: string | null;
  title_image: IMedia;
  gallery: IMedia[];
  images_count?: number;
}
```

### MediaResource

```typescript
interface IMedia {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  order: number;
  custom_properties: {
    width?: string;
    height?: string;
    description?: string;
    [key: string]: unknown;
  };
  urls: {
    original: string;
    thumb?: string;
    preview?: string;
    [key: string]: string | undefined;
  };
}
```

### CommentResource

```typescript
interface IComment {
  id: number;
  post_id: number;
  name: string;
  content: string;
  created_at: string;  // ISO 8601
}
```

### OptionResource

```typescript
interface IOption {
  name: string;
  value: string;
}
```

### Pagination Meta

```typescript
interface IPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}
```

---

## Static Assets

Media files are served via URLs in the `MediaResource.urls` object:

| Variant | Property | Description |
|---------|----------|-------------|
| Original | `urls.original` | Full resolution |
| Thumbnail | `urls.thumb` | Small thumbnail |
| Preview | `urls.preview` | Medium preview |

### Example URLs

```
https://api.blackbeetle.io/storage/albums/summer/img001_original.jpg
https://api.blackbeetle.io/storage/albums/summer/img001_thumb.jpg
https://api.blackbeetle.io/storage/albums/summer/img001_preview.jpg
```

---

## Error Responses

### 404 Not Found

```json
{
  "message": "No query results for model [App\\Models\\Story]."
}
```

### 422 Validation Error

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["Please provide your name."],
    "content": ["Please provide a comment."]
  }
}
```

### 429 Rate Limited

```json
{
  "message": "Too Many Attempts."
}
```

---

## Frontend Implementation

For frontend implementation details, see:

- [lib/api.service.ts](../lib/api.service.ts) — API client
- [types/index.ts](../types/index.ts) — TypeScript interfaces
- [composables/useHelpers.ts](../composables/useHelpers.ts) — Media URL helpers
