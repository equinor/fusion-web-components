# Fusion Help API — Response Models

## Article

Returned by `GET /articles/{id}`, `POST /apps/{appKey}/articles`, `PATCH /apps/{appKey}/articles/{id}`.

```jsonc
{
  // Always present
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",  // GUID
  "appKey": "my-app",                              // Fusion app key
  "slug": "my-app-getting-started",                // URL-safe unique identifier
  "title": "Getting Started",                      // Display title
  "summary": "Learn how to get started.",           // Short description
  "contentPath": "articles/my-app-getting-started", // Internal content path
  "createdAt": "2026-01-15T10:30:00+00:00",        // ISO 8601
  "createdBy": {                                    // Account object
    "azureUniqueId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "name": "John Doe",
    "upn": "john@equinor.com"
  },
  "lastModifiedBy": { ... },                       // Account object
  "lastModified": "2026-03-01T08:00:00+00:00",
  "sortOrder": 1.0,

  // Conditional (null when not applicable or not expanded)
  "sourceSystem": "Fusion.Help.Cli",               // Null if created via UI
  "content": "## Overview\n\nThis guide...",        // Only with $expand=content
  "tags": ["getting-started"],                      // Null if not set
  "linkedAppKeys": ["other-app"],                   // Null if not set
  "sections": [                                     // Only with $expand=sections
    {
      "title": "Overview",
      "sections": []                                // Nested sub-sections
    }
  ],
  "category": null,
  "updatedAt": "2026-03-01T08:00:00+00:00",        // Null if never updated
  "updatedBy": { ... }                              // Null if never updated
}
```

## FAQ

Returned by `GET /faqs/{id}`, `POST /apps/{appKey}/faqs`, `PATCH /apps/{appKey}/faqs/{id}`.

```jsonc
{
  "id": "3fa85f64-...",
  "appKey": "my-app",
  "question": "How do I reset my password?",
  "slug": "my-app-faq-reset-password",
  "contentPath": "faqs/my-app-faq-reset-password",
  "createdAt": "2026-01-15T10:30:00+00:00",
  "createdBy": { ... },
  "lastModifiedBy": { ... },
  "lastModified": "2026-03-01T08:00:00+00:00",
  "sortOrder": 1.0,

  "sourceSystem": null,
  "answer": "Navigate to Settings > Account...",    // Only with $expand=answer
  "linkedArticle": { ... },                         // Only with $expand=linkedArticle (full Article object)
  "updatedAt": null,
  "updatedBy": null
}
```

## Release Note

Returned by `GET /release-notes/{id}`, `POST /apps/{appKey}/release-notes`.

```jsonc
{
  "id": "3fa85f64-...",
  "appKey": "my-app",
  "slug": "my-app-v2-release",
  "title": "Version 2.0 Release",
  "contentPath": "release-notes/my-app-v2-release",
  "createdAt": "2026-03-01T08:00:00+00:00",
  "createdBy": { ... },
  "lastModifiedBy": { ... },
  "lastModified": "2026-03-01T08:00:00+00:00",
  "publishedDate": "2026-03-14T00:00:00+00:00",

  "sourceSystem": null,
  "content": "## What's new\n\n...",                // Only with $expand=content
  "tags": ["release", "v2"],
  "linkedArticle": null,                            // Only with $expand=linkedArticle
  "releaseNoteLinkedAppKeys": [],
  "sections": [ ... ],                              // Only with $expand=sections
  "category": null,
  "updatedAt": null,
  "updatedBy": null
}
```

## Paged Collection

All list endpoints return a paged collection wrapper:

```jsonc
{
  "@count": 42,             // Total count (when requested)
  "@nextLink": "/articles?$skip=10&$top=10",  // Next page URL (if more results)
  "value": [ ... ]          // Array of resource objects
}
```

## Account (nested object)

```jsonc
{
  "azureUniqueId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "John Doe",
  "upn": "john@equinor.com"
}
```

## Section (nested in articles/release notes)

```jsonc
{
  "title": "Section Heading",
  "sections": [              // Nested sub-sections (recursive)
    {
      "title": "Sub Heading",
      "sections": []
    }
  ]
}
```

Sections are auto-parsed from the markdown heading structure of the content.
