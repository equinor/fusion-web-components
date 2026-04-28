# Follow-Up Questions — Core Service Developer

Clarifying questions to ask before reviewing or applying conventions to Fusion Core backend services (C# / .NET APIs). Pick the relevant section based on the code under review. Skip questions already answered.

## API Design & Versioning

- Does the controller use `[ApiVersion]` and `[MapToApiVersion]` attributes, and does the route template include the version segment (e.g., `/api/v{version:apiVersion}/orders`)?
- Are response models prefixed with `Api` and versioned with a suffix (e.g., `ApiOrderV2`) to distinguish them from domain and persistence models?
- Is the controller using policy-based authorisation (`[Authorize(Policy = "...")]`) rather than inline role string checks?
- Are new endpoints documented with XML doc comments (`<summary>`, `<param>`, `<response>`) including HTTP status codes?
- Does the endpoint accept `CancellationToken` as the last parameter and pass it through to all async calls?
- Are breaking changes to existing endpoints (renamed fields, removed properties, changed status codes) accompanied by a new API version or migration path?

## CQRS & MediatR Patterns

- Are commands named as verb phrases (`CreateOrder`, `CancelBooking`) and queries as `Get*` phrases (`GetOrderById`, `GetActiveOrders`)?
- Does each command/query contain a nested `Handler` class, or is the handler in a separate file? Which pattern does this project use consistently?
- Is the handler's `Handle` method `async Task<TResponse>` (never `async void`), and does it accept and propagate `CancellationToken`?
- Are commands that mutate state kept separate from queries that only read? Are there any commands that return read-model data (mixing concerns)?
- Does a FluentValidation validator exist for the command/query, and does it follow the project's naming convention (e.g., `CreateOrderValidator`)?
- Are MediatR pipeline behaviours (logging, validation, transaction) registered centrally, or are there per-handler cross-cutting concerns that should be lifted?

## Entity & Data Model Conventions

- Are EF Core entity classes prefixed with `Db` (e.g., `DbOrder`, `DbLineItem`) to distinguish them from domain and API models?
- Are domain query result models prefixed with `Query` (e.g., `QueryOrder`) or do they reuse entity or API types across layers?
- Does the `DbContext` use explicit Fluent API configuration (`OnModelCreating` / `IEntityTypeConfiguration<T>`) rather than relying solely on attribute conventions?
- Are navigation properties and foreign keys explicitly configured, or are there shadow properties that could cause unexpected migration behaviour?
- Does the mapping between `Db*` entities and `Api*`/`Query*` models use a consistent strategy across the project (extension methods, hand-written, AutoMapper)?

## Error Handling & Null Safety

- Is nullable reference types (`<Nullable>enable</Nullable>`) active in the project file? Are there `#nullable disable` directives that suppress it without justification?
- Are null checks using pattern matching (`is null`, `is not null`) rather than `== null` / `!= null`?
- Does the code avoid `.Result` and `.Wait()` on tasks, using `await` consistently throughout?
- Are exceptions typed (e.g., `NotFoundException`, `ConflictException`) with structured properties, or are bare `Exception` or `InvalidOperationException` thrown?
- Are `FirstOrDefault()` / `SingleOrDefault()` results null-checked before use, or is the code assuming non-null without validation?
- Does global exception-handling middleware map domain exceptions to appropriate HTTP status codes, or does each controller handle this locally?

## XML Documentation & Intent Comments

- Do all public classes, methods, and properties have XML doc comments (`<summary>`, `<param>`, `<returns>`, `<exception>`)?
- Do intent comments on non-obvious decisions explain the *why* (e.g., "soft-delete instead of hard-delete because audit trail retention policy")?
- Are suppression pragmas (`#pragma warning disable`, `[SuppressMessage]`) justified with a comment explaining why the warning is inapplicable?
- Are magic numbers, timeout values, retry counts, and claim/scope name strings extracted to named constants with origin comments?
- Can complex LINQ queries or EF Core projections pass the regenerability test — if deleted, could a developer rewrite them from the intent comments and type signatures alone?

## Testing Conventions

- Do test classes use the `*Tests` suffix (e.g., `OrderApiTests`, `CreateOrderHandlerTests`)?
- Do test methods follow the `Subject_Context_ShouldOutcome` naming pattern (e.g., `CreateOrder_WithInvalidPayload_ShouldReturnBadRequest`)?
- Are integration tests using `WebApplicationFactory` or `Testcontainers`, and is database isolation handled per test class or per test?
- Are assertions using FluentAssertions (`.Should().Be...`) consistent with the project's assertion style?
- Do tests cover the documented error paths (validation failures, not-found, conflict, unauthorised), not just the happy path?

## ADR & Architectural Decisions

- Does this service have an ADR directory (`docs/adr/`, `adr/`)? Does this change comply with recorded decisions on data access patterns, authentication, or API design?
- If a new technology, library, or architectural pattern is introduced, has a new ADR been drafted?
- Does the `CONTRIBUTING.md` or contributor docs specify service-specific conventions (branching strategy, database migration process) that apply?
- Are there existing ADRs referencing deprecated patterns or tooling that this change could trigger for revision?
- Does this change cross a policy boundary where conventions require requirement-based authorization rather than inline role or scope checks?
