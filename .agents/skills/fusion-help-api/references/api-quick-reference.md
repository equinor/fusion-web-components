# Fusion Help API — Quick Reference Card

## Base URLs

| Env | URL |
|-----|-----|
| CI | `https://help.ci.api.fusion-dev.net` |
| FQA | `https://help.fqa.api.fusion-dev.net` |
| FPRD | `https://help.api.fusion.equinor.com` |

## Token Audiences

| Env | Resource |
|-----|----------|
| CI / FQA / TR | `5a842df8-3238-415d-b168-9f16a6a6031b/.default` |
| FPRD | `97978493-9777-4d48-b38a-67b0b9cd88d2/.default` |

## Endpoint Matrix

| Resource | List | List (app) | Get | Create | Update | Delete |
|----------|------|------------|-----|--------|--------|--------|
| Articles | `GET /articles` | `GET /apps/{appKey}/articles` | `GET /articles/{id\|slug}` | `POST /apps/{appKey}/articles` | `PATCH /apps/{appKey}/articles/{id\|slug}` | `DELETE /apps/{appKey}/articles/{id\|slug}` |
| FAQs | `GET /faqs` | `GET /apps/{appKey}/faqs` | `GET /faqs/{id\|slug}` | `POST /apps/{appKey}/faqs` | `PATCH /apps/{appKey}/faqs/{id\|slug}` | `DELETE /apps/{appKey}/faqs/{id\|slug}` |
| Release Notes | `GET /release-notes` | `GET /apps/{appKey}/release-notes` | `GET /release-notes/{id\|slug}` | `POST /apps/{appKey}/release-notes` | `PATCH /apps/{appKey}/release-notes/{id\|slug}` | `DELETE /apps/{appKey}/release-notes/{id\|slug}` |
| Published Notes | — | `GET /apps/{appKey}/release-notes/published` | — | — | — | — |
| Linked Articles | — | `GET /apps/{appKey}/linked-articles` | — | — | — | — |
| Linked Notes | — | `GET /apps/{appKey}/linked-release-notes` | — | — | — | — |
| Assets | — | — | `GET /assets/{path}` | `POST /assets` (multipart) | — | — |
| Search | — | — | — | `POST /search` | — | — |
| Suggest | — | — | — | `POST /suggest` | — | — |
| Changelog | `GET /changelog` | `GET /apps/{appKey}/changelog` | — | — | — | — |

## OData Expand Options

| Resource | Expandable fields |
|----------|-------------------|
| Articles | `content`, `sections` |
| FAQs | `answer`, `linkedArticle`, `linkedArticle.content` |
| Release Notes | `content`, `sections`, `linkedArticle`, `linkedArticle.content` |

## OData Filter Fields

| Resource | Filterable fields |
|----------|-------------------|
| Articles | `appKey`, `title`, `summary`, `slug`, `createdAt`, `updatedAt` |
| FAQs | `appKey`, `question`, `slug`, `createdAt`, `updatedAt` |
| Release Notes | `appKey`, `title`, `slug`, `createdAt`, `updatedAt`, `publishedDate` |
| Changelog | `appKey`, `articleIdentifier`, `faqIdentifier`, `activityId`, `actorUpn`, `actorAzureUniqueId`, `commandName` |

## Pagination

All list endpoints support `$top` (max 100) and `$skip`. Responses include `@nextLink` when more results exist.

## Authorization Summary

| Operation | Required |
|-----------|----------|
| Read (any endpoint) | Authenticated user |
| Create / Update / Delete | App admin, trusted app, or `Fusion.Help.FullControl` |
| Upload asset | Any app admin, trusted app, or `Fusion.Help.FullControl` |
| Global changelog | `Fusion.Help.FullControl` |
| App changelog | App admin or `Fusion.Help.FullControl` |
