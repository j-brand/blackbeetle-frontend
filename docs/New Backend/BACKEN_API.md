# Blackbeetle API Documentation

> **Base URL:** `/api/v1`  
> **Content-Type:** `application/json`

This API serves the Nuxt.js frontend application with read-only access to stories, posts, albums, and configuration options.

---

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Pagination](#pagination)
- [Endpoints](#endpoints)
  - [Stories](#stories)
  - [Posts](#posts)
  - [Albums](#albums)
  - [Comments](#comments)
  - [Options](#options)
- [Data Schemas](#data-schemas)

---

## Overview

The Blackbeetle API provides endpoints for:

- **Stories** — Blog/travel log entries with multiple posts
- **Posts** — Individual content blocks within stories (HTML, images, videos, maps)
- **Albums** — Photo galleries with media collections
- **Comments** — User comments on posts
- **Options** — Public configuration options

---

## Authentication

Most endpoints are **public** and do not require authentication.

The `POST /api/v1/comments` endpoint is:
- Rate limited (`throttle:comments`)
- Protected against spam (honeypot)

---

## Response Format

### Single Resource
```json
{
  "data": { ... }
}
```

### Collection (Paginated)
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

## Pagination

Collection endpoints support pagination via query parameters:

| Parameter  | Type    | Default | Description                |
|------------|---------|---------|----------------------------|
| `page`     | integer | 1       | Page number                |
| `per_page` | integer | 15      | Items per page             |

**Example:** `GET /api/v1/stories?page=2&per_page=10`

---

## Endpoints

### Stories

#### List Stories
```
GET /api/v1/stories
```

Returns a paginated list of active stories with their title images.

**Query Parameters:**
| Parameter  | Type    | Default | Description    |
|------------|---------|---------|----------------|
| `page`     | integer | 1       | Page number    |
| `per_page` | integer | 15      | Items per page |

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Trip to Japan",
      "slug": "trip-to-japan",
      "description": "A two-week adventure...",
      "title_image": { /* MediaResource */ },
      "posts_count": 12
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

#### Get Story by Slug
```
GET /api/v1/stories/{slug}
```

Returns a single story with all its posts, images, and comments.

**Path Parameters:**
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| `slug`    | string | Story URL slug    |

**Query Parameters:**
| Parameter | Type   | Default | Description                          |
|-----------|--------|---------|--------------------------------------|
| `order`   | string | `asc`   | Post sort order: `asc` or `desc`     |

**Response:** `200 OK`
```json
{
  "data": {
    "id": 1,
    "title": "Trip to Japan",
    "slug": "trip-to-japan",
    "description": "A two-week adventure...",
    "title_image": { /* MediaResource */ },
    "posts": [ /* PostResource[] */ ],
    "posts_count": 12
  }
}
```

**Errors:**
- `404 Not Found` — Story not found or inactive

---

#### Get Story by ID
```
GET /api/v1/stories/id/{id}
```

Returns a single story by its numeric ID with all posts, images, and comments.

**Path Parameters:**
| Parameter | Type    | Description  |
|-----------|---------|--------------|
| `id`      | integer | Story ID     |

**Query Parameters:**
| Parameter | Type   | Default | Description                          |
|-----------|--------|---------|--------------------------------------|
| `order`   | string | `asc`   | Post sort order: `asc` or `desc`     |

**Response:** Same as `GET /api/v1/stories/{slug}`

---

#### Get Story Posts
```
GET /api/v1/stories/{slug}/posts
```

Returns a paginated list of posts for a specific story.

**Path Parameters:**
| Parameter | Type   | Description    |
|-----------|--------|----------------|
| `slug`    | string | Story URL slug |

**Query Parameters:**
| Parameter  | Type    | Default | Description                          |
|------------|---------|---------|--------------------------------------|
| `page`     | integer | 1       | Page number                          |
| `per_page` | integer | 15      | Items per page                       |
| `order`    | string  | `asc`   | Post sort order: `asc` or `desc`     |

**Response:** `200 OK`
```json
{
  "data": [ /* PostResource[] */ ],
  "links": { ... },
  "meta": { ... }
}
```

---

### Posts

#### Get Post
```
GET /api/v1/posts/{id}
```

Returns a single post with its media and comments.

**Path Parameters:**
| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | integer | Post ID     |

**Response:** `200 OK`
```json
{
  "data": {
    "id": 1,
    "story_id": 1,
    "title": "Day 1: Arrival in Tokyo",
    "content": "<p>We arrived at...</p>",
    "type": "html",
    "position": 1,
    "date": "2024-03-15",
    "images": [ /* MediaResource[] */ ],
    "videos": [ /* MediaResource[] */ ],
    "comments": [ /* CommentResource[] */ ],
    "comments_count": 5
  }
}
```

**Errors:**
- `404 Not Found` — Post not found or inactive

---

### Albums

#### List Albums
```
GET /api/v1/albums
```

Returns a paginated list of active albums with their title images.

**Query Parameters:**
| Parameter  | Type    | Default | Description    |
|------------|---------|---------|----------------|
| `page`     | integer | 1       | Page number    |
| `per_page` | integer | 15      | Items per page |

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Summer Landscapes",
      "slug": "summer-landscapes",
      "description": "Beautiful summer photos",
      "title_image_text": "Sunset at the lake",
      "start_date": "2024-06-01",
      "end_date": "2024-08-31",
      "title_image": { /* MediaResource */ },
      "images_count": 24
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

#### Get Album
```
GET /api/v1/albums/{slug}
```

Returns a single album with all its images.

**Path Parameters:**
| Parameter | Type   | Description    |
|-----------|--------|----------------|
| `slug`    | string | Album URL slug |

**Response:** `200 OK`
```json
{
  "data": {
    "id": 1,
    "title": "Summer Landscapes",
    "slug": "summer-landscapes",
    "description": "Beautiful summer photos",
    "title_image_text": "Sunset at the lake",
    "start_date": "2024-06-01",
    "end_date": "2024-08-31",
    "title_image": { /* MediaResource */ },
    "images": [ /* MediaResource[] */ ]
  }
}
```

**Errors:**
- `404 Not Found` — Album not found or inactive

---

### Comments

#### List Post Comments
```
GET /api/v1/posts/{postId}/comments
```

Returns a paginated list of active comments for a post.

**Path Parameters:**
| Parameter | Type    | Description |
|-----------|---------|-------------|
| `postId`  | integer | Post ID     |

**Query Parameters:**
| Parameter  | Type    | Default | Description    |
|------------|---------|---------|----------------|
| `page`     | integer | 1       | Page number    |
| `per_page` | integer | 50      | Items per page |

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "post_id": 1,
      "name": "John Doe",
      "content": "Great post!",
      "created_at": "2024-03-16T10:30:00+00:00"
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

#### Create Comment
```
POST /api/v1/comments
```

Creates a new comment on a post.

> ⚠️ This endpoint is rate limited and protected by honeypot spam protection.

**Request Body:**
```json
{
  "post_id": 1,
  "name": "John Doe",
  "content": "Great post!"
}
```

**Validation Rules:**
| Field     | Type    | Rules                           |
|-----------|---------|----------------------------------|
| `post_id` | integer | Required, must exist in posts    |
| `name`    | string  | Required, max 255 characters     |
| `content` | string  | Required, max 5000 characters    |

**Response:** `201 Created`
```json
{
  "message": "Comment created successfully.",
  "data": {
    "id": 2,
    "post_id": 1,
    "name": "John Doe",
    "content": "Great post!",
    "created_at": "2024-03-16T12:00:00+00:00"
  }
}
```

**Errors:**
- `404 Not Found` — Post not found or inactive
- `422 Unprocessable Entity` — Validation errors
- `429 Too Many Requests` — Rate limit exceeded

---

### Options

#### List Options
```
GET /api/v1/options
```

Returns all public configuration options.

**Response:** `200 OK`
```json
{
  "data": [
    {
      "name": "site_title",
      "value": "My Portfolio"
    },
    {
      "name": "contact_email",
      "value": "hello@example.com"
    }
  ]
}
```

---

#### Get Option
```
GET /api/v1/options/{name}
```

Returns a single public option by name.

**Path Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| `name`    | string | Option name |

**Response:** `200 OK`
```json
{
  "data": {
    "name": "my_location",
    "value": { "lat": 52.52, "lng": 13.405 }
  }
}
```

**Errors:**
- `404 Not Found` — Option not found or not public

---

## Data Schemas

### StoryResource

| Field         | Type              | Description                                      |
|---------------|-------------------|--------------------------------------------------|
| `id`          | integer           | Unique identifier                                |
| `title`       | string            | Story title                                      |
| `slug`        | string            | URL-friendly slug                                |
| `description` | string \| null    | Story description                                |
| `title_image` | MediaResource     | Title/cover image (when media loaded)            |
| `posts`       | PostResource[]    | Active posts sorted by position (when loaded)    |
| `posts_count` | integer           | Count of active posts (when counted)             |

---

### PostResource

| Field           | Type              | Description                                    |
|-----------------|-------------------|------------------------------------------------|
| `id`            | integer           | Unique identifier                              |
| `story_id`      | integer           | Parent story ID                                |
| `title`         | string \| null    | Post title                                     |
| `content`       | mixed             | Post content (HTML, coordinates, etc.)         |
| `type`          | string            | Post type: `html`, `image`, `video`, `map`     |
| `position`      | integer           | Display order within story                     |
| `date`          | string \| null    | Date in `YYYY-MM-DD` format                    |
| `images`        | MediaResource[]   | Image media (when media loaded)                |
| `videos`        | MediaResource[]   | Video media (when media loaded)                |
| `comments`      | CommentResource[] | Active comments (when loaded)                  |
| `comments_count`| integer           | Count of active comments (when counted)        |

**Post Types:**
| Value   | Description                        |
|---------|------------------------------------|
| `html`  | Rich text/HTML content             |
| `image` | Image gallery                      |
| `video` | Video content                      |
| `map`   | Map with coordinates               |

---

### AlbumResource

| Field              | Type            | Description                              |
|--------------------|-----------------|------------------------------------------|
| `id`               | integer         | Unique identifier                        |
| `title`            | string          | Album title                              |
| `slug`             | string          | URL-friendly slug                        |
| `description`      | string \| null  | Album description                        |
| `title_image_text` | string \| null  | Caption for title image                  |
| `start_date`       | string \| null  | Start date in `YYYY-MM-DD` format        |
| `end_date`         | string \| null  | End date in `YYYY-MM-DD` format          |
| `title_image`      | MediaResource   | Title/cover image (when media loaded)    |
| `images`           | MediaResource[] | Album images (when media loaded)         |
| `images_count`     | integer         | Count of album images (when counted)     |

---

### CommentResource

| Field       | Type    | Description                         |
|-------------|---------|-------------------------------------|
| `id`        | integer | Unique identifier                   |
| `post_id`   | integer | Parent post ID                      |
| `name`      | string  | Commenter's name                    |
| `content`   | string  | Comment text                        |
| `created_at`| string  | ISO 8601 datetime                   |

---

### MediaResource

| Field             | Type              | Description                              |
|-------------------|-------------------|------------------------------------------|
| `id`              | integer           | Unique identifier                        |
| `name`            | string            | Media name                               |
| `file_name`       | string            | Original filename                        |
| `mime_type`       | string            | MIME type (e.g., `image/jpeg`)           |
| `size`            | integer           | File size in bytes                       |
| `order`           | integer           | Display order                            |
| `custom_properties`| object           | Custom metadata                          |
| `urls`            | object            | Available URLs (see below)               |

**URLs Object:**
| Key        | Type   | Description                                    |
|------------|--------|------------------------------------------------|
| `original` | string | Original file URL                              |
| `thumb`    | string | Thumbnail conversion (if generated for images) |
| `preview`  | string | Preview conversion (if generated for images)   |
| *dynamic*  | string | Other conversions based on model configuration |

---

### OptionResource

| Field   | Type   | Description      |
|---------|--------|------------------|
| `name`  | string | Option key       |
| `value` | mixed  | Option value     |

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

## Date Formats

| Format     | Example                    | Used In                    |
|------------|----------------------------|----------------------------|
| ISO 8601   | `2024-03-16T10:30:00+00:00`| `created_at` timestamps    |
| Date only  | `2024-03-16`               | `date`, `start_date`, etc. |
