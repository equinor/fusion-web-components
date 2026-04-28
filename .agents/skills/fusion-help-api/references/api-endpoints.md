# API Endpoints

All endpoints are versioned. Add `?api-version=1.0` to requests (or use the default).

See also: [Quick Reference Card](api-quick-reference.md) | [Response Models](response-models.md)

---

## Articles

### List all articles

```
GET /articles?api-version=1.0
```

**OData support:**
- `$filter`: `appKey`, `title`, `summary`, `slug`, `createdAt`, `updatedAt`
- `$expand`: `content`, `sections`
- `$top`: max 100
- `$skip`: for pagination

**Example — get articles for an app with content:**

```
GET /articles?$filter=appKey eq 'my-app'&$expand=content&$top=10&api-version=1.0
```

### List articles for a specific app

```
GET /apps/{appKey}/articles?api-version=1.0
```

Same OData support as above. Automatically scoped to the given app.

### Get linked articles for an app

Articles from other apps that have been cross-linked to this app:

```
GET /apps/{appKey}/linked-articles?api-version=1.0
```

### Get a single article

```
GET /articles/{articleIdentifier}?$expand=content,sections&api-version=1.0
```

`articleIdentifier` can be the article **GUID** or the **slug** string.

### Create an article (admin)

```
POST /apps/{appKey}/articles?api-version=1.0
Content-Type: application/json

{
  "title": "Getting Started",           // required, max 100 chars
  "summary": "Learn how to get started", // required, max 1000 chars
  "content": "## Overview\n\n...",       // required, markdown string
  "slug": "my-app-getting-started",      // optional, auto-generated if omitted, max 200 chars, URL-safe
  "sortOrder": 1.0,                      // optional, >= 0
  "sourceSystem": "my-custom-tool",      // optional, max 50 chars
  "category": "onboarding",             // optional
  "tags": ["getting-started"],           // optional, each max 50 chars
  "linkedAppKeys": ["other-app"]         // optional, cross-link to other apps
}
```

Returns `201 Created` with the full article object (including `content` and `sections`).

### Update an article (admin)

Uses JSON Patch semantics — only send fields you want to change:

```
PATCH /apps/{appKey}/articles/{articleIdentifier}?api-version=1.0
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "## New content\n\n...",
  "tags": ["updated-tag"]
}
```

Returns `200 OK` with the updated article.

### Delete an article (admin)

```
DELETE /apps/{appKey}/articles/{articleIdentifier}?api-version=1.0
```

Returns `204 No Content`. Note: deleted articles are soft-deleted — the slug cannot be reused.

---

## FAQs

### List all FAQs

```
GET /faqs?api-version=1.0
```

**OData support:**
- `$filter`: `appKey`, `question`, `slug`, `createdAt`, `updatedAt`
- `$expand`: `answer`, `linkedArticle`, `linkedArticle.content`
- `$top`: max 100
- `$skip`: for pagination

### List FAQs for an app

```
GET /apps/{appKey}/faqs?api-version=1.0
```

### Get a single FAQ

```
GET /faqs/{faqIdentifier}?$expand=answer,linkedArticle&api-version=1.0
```

### Create a FAQ (admin)

```
POST /apps/{appKey}/faqs?api-version=1.0
Content-Type: application/json

{
  "question": "How do I reset my password?",  // required, max 200 chars
  "answer": "Navigate to Settings > Account...", // required, markdown
  "slug": "my-app-faq-reset-password",        // optional, URL-safe, max 200 chars
  "sortOrder": 1.0,                            // optional, >= 0
  "sourceSystem": "my-tool",                   // optional, max 50 chars
  "linkedArticleIdentifier": "my-app-getting-started" // optional, slug or GUID of related article
}
```

### Update a FAQ (admin)

```
PATCH /apps/{appKey}/faqs/{faqIdentifier}?api-version=1.0
Content-Type: application/json

{
  "question": "Updated question?",
  "answer": "Updated answer content."
}
```

### Delete a FAQ (admin)

```
DELETE /apps/{appKey}/faqs/{faqIdentifier}?api-version=1.0
```

---

## Release Notes

### List all release notes

```
GET /release-notes?api-version=1.0
```

**OData support:**
- `$filter`: `appKey`, `title`, `slug`, `createdAt`, `updatedAt`, `publishedDate`
- `$expand`: `content`, `sections`, `linkedArticle`, `linkedArticle.content`
- `$top`: max 100
- `$skip`: for pagination

### List release notes for an app

```
GET /apps/{appKey}/release-notes?api-version=1.0
```

### List published-only release notes

```
GET /apps/{appKey}/release-notes/published?api-version=1.0
```

Only returns release notes where `publishedDate` is in the past.

### List linked release notes for an app

```
GET /apps/{appKey}/linked-release-notes?api-version=1.0
```

### Get a single release note

```
GET /release-notes/{releaseNoteIdentifier}?$expand=content,sections,linkedArticle&api-version=1.0
```

### Create a release note (admin)

```
POST /apps/{appKey}/release-notes?api-version=1.0
Content-Type: application/json

{
  "title": "Version 2.0 Release",         // required, max 100 chars
  "content": "## What's new\n\n...",       // required, markdown
  "publishedDate": "2026-03-14T00:00:00Z", // required, ISO 8601
  "slug": "my-app-v2-release",            // optional, URL-safe, max 200 chars
  "sourceSystem": "my-tool",              // optional, max 50 chars
  "category": null,                        // optional
  "tags": ["release", "v2"],              // optional
  "releaseNoteLinkedAppKeys": [],          // optional, cross-link to other apps
  "linkedArticleIdentifier": null          // optional, link to an article by slug/GUID
}
```

### Update a release note (admin)

```
PATCH /apps/{appKey}/release-notes/{releaseNoteIdentifier}?api-version=1.0
Content-Type: application/json

{
  "title": "Updated Release Title",
  "content": "## Updated content"
}
```

### Delete a release note (admin)

```
DELETE /apps/{appKey}/release-notes/{releaseNoteIdentifier}?api-version=1.0
```

---

## Assets (Images)

### Upload an image (admin)

```
POST /assets
Content-Type: multipart/form-data

Form fields:
  - asset: <binary PNG file>
  - slug: "img-my-image-slug"  (optional)
```

Returns `201 Created` with:

```json
{
  "uri": "/help-proxy/assets/resources/images/img-my-image-slug/processed.webp"
}
```

### Get an asset

```
GET /assets/{resourcePath}
```

Returns the binary file. Supports `If-None-Match` ETag for caching (returns `304 Not Modified`).

Cache headers: `Cache-Control: private, max-age=31536000` (1 year).

### Check if asset exists

```
HEAD /assets/{assetIdentifier}
```

Returns `200 OK` if exists, `404 Not Found` if not.

---

## Search & Suggestions

### Full-text search

```
POST /search
Content-Type: application/json

{
  "search": "getting started",
  "filter": "appKey eq 'my-app'",
  "top": 10,
  "skip": 0,
  "count": true,
  "highlight": "content",
  "queryType": "simple",
  "searchMode": "any"
}
```

Uses Azure Cognitive Search under the hood. Supports Lucene query syntax when `queryType` is `"full"`.

### Auto-suggest

```
POST /suggest
Content-Type: application/json

{
  "search": "get",
  "suggesterName": "sg",
  "filter": "appKey eq 'my-app'",
  "fuzzy": true,
  "top": 5
}
```

---

## Changelog (admin)

Available to app admins (scoped) or `Fusion.Help.FullControl` (global).

### Global changelog

```
GET /changelog?$filter=commandName eq 'CreateArticle'&$top=50&api-version=1.0
```

**OData filters:** `appKey`, `articleIdentifier`, `faqIdentifier`, `activityId`, `actorUpn`, `actorAzureUniqueId`, `commandName`

### Per-app changelog

```
GET /apps/{appKey}/changelog?$top=50&api-version=1.0
```

**OData filters:** `activityId`, `actorUpn`, `actorAzureUniqueId`, `commandName`

---

## Validation rules

The API enforces these constraints server-side via FluentValidation:

| Field | Constraint |
|-------|-----------|
| Article `title` | Required, max 100 chars |
| Article `summary` | Required, max 1000 chars |
| Article `content` | Required (non-empty) |
| Article `slug` | URL-safe characters, max 200 chars |
| Article `sortOrder` | >= 0 |
| Article `sourceSystem` | Max 50 chars |
| Article `tags` (each) | Max 50 chars |
| FAQ `question` | Required, max 200 chars |
| FAQ `answer` | Required (non-empty) |
| FAQ `slug` | URL-safe characters, max 200 chars |
| Release note `title` | Required, max 100 chars |
| Release note `content` | Required (non-empty) |
| Release note `publishedDate` | Required, non-null |
| Release note `slug` | URL-safe characters, max 200 chars |
