# C# Code Conventions

C# naming, null safety, async/await, code style.

> **Applicability:** Org-wide baseline. Repo policy (`CONTRIBUTING.md`, ADRs) and tooling (`.editorconfig`, `Directory.Build.props`) take precedence on explicit override. See skill **Precedence and applicability** for resolution order.

## Project structure

Common ASP.NET Core layered layout:

```
Controllers/               ← API controllers (MVC)
Domain/
  Commands/                ← MediatR IRequest command + nested Handler class
  Query/                   ← MediatR IRequest query + nested Handler class
  Models/                  ← Domain-internal result types
  Errors/                  ← Domain-specific exception types
  Behaviours/              ← MediatR pipeline behaviours
Database/
  Entities/                ← EF Core entity types
  Extensions/              ← EF Core queryable helpers
  *DbContext.cs            ← EF Core DbContext
Authorization/             ← IAuthorizationRequirement and handler extensions
Integrations/              ← External service client adapters
Program.cs                 ← Entry point (and DI registration for minimal APIs)
```

Minimal APIs (.NET 6+): `Program.cs`; endpoints in `Endpoints/` or by feature. `Startup.cs` for older patterns only. Reusable packages: `common/` or `shared/`. Integration tests: sibling `test/`.

## Naming

| Kind                 | Convention      | Example                         |
|----------------------|-----------------|---------------------------------|
| Interfaces           | `I` prefix      | `IUserCache`, `IEmailClient`    |
| Types / classes      | PascalCase      | `OrderDbContext`, `CreateOrder` |
| Methods / properties | PascalCase      | `GetActiveItemsAsync`, `CreatedAt` |
| Local variables      | camelCase       | `filteredItems`, `cachedResults` |
| Parameters           | camelCase       | `cancellationToken`, `userId`   |
| Private fields       | camelCase       | `logger`, `mediator`            |
| DB entity classes    | `Db` prefix     | `DbOrder`, `DbLineItem`         |
| API response models  | `Api` prefix    | `ApiOrderV2`, `ApiLineItem`     |
| Domain query results | semantic prefix | `QueryOrder`, `QueryProfile`    |
| MediatR commands     | verb phrase     | `CreateOrder`, `CancelBooking`  |
| MediatR queries      | `Get*` phrase   | `GetOrderById`, `GetActiveUsers` |
| Test classes         | `*Tests` suffix | `OrderApiTests`, `CacheTests`   |
| Test methods         | `Subject_Context_ShouldOutcome` | `CreateOrder_AsGuest_ShouldBeUnauthorized` |

## Compiler settings and style enforcement

- **Nullable reference types**: `enable` — global (`Directory.Build.props` or project file). No opt-out without documented reason.
- **TreatWarningsAsErrors**: `true` — no warning accumulation.
- **ImplicitUsings**: project preference; production explicit, tests may enable.
- **GenerateDocumentationFile**: `true` on service/library projects. Warning `1591` suppressed — generated where present, not required on every member.
- **`csharp_using_directive_placement`**: `outside_namespace`.
- **File-scoped namespaces**: prefer (`csharp_style_namespace_declarations = file_scoped`). Exception: EF Core migrations.
- Enforce via `.editorconfig` in repo root.

## Null safety

- Nullable reference types enabled project-wide — no dereference without null check or `?.`.
- `!` sparingly, typically on EF Core `DbSet` properties (`= null!`).
- `ArgumentNullException.ThrowIfNull(arg)` for entry-point guards.
- Prefer `FirstOrDefault()`/`SingleOrDefault()` over `First()`/`Single()` when result may be absent.

## Async/await

- I/O methods: `async Task`/`async Task<T>`. Never `async void` outside event handlers.
- Never block with `.Result` or `.Wait()`.
- Accept `CancellationToken cancellationToken = default` in async public methods.

## Disposables

- `IDisposable`: `using` statement or declaration.
- EF Core `DbContext`: DI-managed, scoped; don't manually dispose.

## Architecture patterns

- **Thin endpoints**: parse, dispatch, return. No business logic in controllers or endpoint definitions.
- **Minimal APIs and MVC**: both valid (`app.MapGet(...)` or `[ApiController]`). Pick one style per project.
- **CQRS / MediatR**: dispatch via handlers (`IRequest` + `IRequestHandler`). Commands (state-changing) and queries (read-only) in distinct folders.
- **Authorization**: prefer policy/requirement-based over inline role string checks.
- **API versioning**: `[ApiVersion("X.0")]` + `[MapToApiVersion("X.0")]` from `Asp.Versioning`. Versioned controllers may be split as `partial` classes per version file.
- **Route naming**: kebab-case path segments (`/orders/{orderId}/line-items`).

## API response models

- `Api` prefix on all response types (`ApiOrderV2`, `ApiLineItem`)
- Suppress null properties where they add noise: `[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]` or `[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]`
- One JSON serializer per project: `System.Text.Json` for new, Newtonsoft.Json for existing
- Versioned models: `V2`/`V3` suffix, may inherit previous version
- Don't reuse models across endpoints — hidden coupling
- Response models near controllers (`Controllers/Models/` or `Controllers/ViewModels/`)

## EF Core conventions

- Entity types: `Db` prefix (`DbOrder`, `DbLineItem`).
- `DbSet<T>` initialized with `= null!` (EF Core sets at runtime).
- Enum columns as strings: `HasConversion(new EnumToStringConverter<TEnum>())` — readable in DB, survives reordering.
- Indexes/relationships: `OnModelCreating` fluent builders, not data annotations.

## Error handling

- Domain errors: typed exceptions extending `Exception` (`RoleExistsError : Exception`).
- Constructor sets formatted message; class exposes read-only domain props.
- RFC 7807 Problem Details for errors: minimal APIs use `Results.Problem(...)`/`TypedResults.Problem(...)`; MVC use `ControllerBase.Problem(...)` or exception handler middleware.
- Catch specific domain exception; middleware handles unexpected.

## Code style (enforced via `.editorconfig`)

- **`var` is not used** (`csharp_style_var_*` all set to `false`) — always write explicit types.
- 4 spaces indent; CRLF line endings; final newline required; max line length 200 characters.
- Always use braces on control flow blocks (`csharp_prefer_braces = true`).
- Expression-bodied members: allowed for accessors, lambdas, properties — not for constructors or full methods.
- No `this.` qualifier (`dotnet_style_qualification_for_*` all `false`).
- Prefer predefined language keywords over BCL type names (`int`, not `Int32`).
- Prefer pattern matching (`is`, `switch` expressions) over `as`-with-null-check casts.
- Use object/collection initializers; prefer null-coalescing (`??`) and null-propagation (`?.`).
- `dotnet_style_readonly_field = true` — fields that are not mutated after construction should be `readonly`.

## XML doc comments

- `GenerateDocumentationFile = true` on all service projects.
- Warning `1591` is suppressed, so comments are generated where present but not required on every member.
- Use `<summary>`, `<param>`, `<returns>`, `<remarks>`, `<list>` as needed; `<see cref="..."/>` for cross-references.

## Testing

- **Framework**: xUnit + `Microsoft.AspNetCore.Mvc.Testing` for integration tests.
- **Assertions**: use xUnit `Assert.*` or consider lightweight assertion libraries like `Shouldly` or `AwesomeAssertions`. Prefer readable assertion messages.
- **Containers**: `Testcontainers` (e.g. `Testcontainers.MsSql`) for integration tests that need a real database — prefer over in-memory providers for production-representative coverage.
- **Test class naming**: `*Tests` suffix, one class per subject (`OrderApiTests`, `CacheTests`).
- **Test method naming**: `Subject_Context_ShouldOutcome` (`CreateOrder_AsGuest_ShouldBeUnauthorized`).
- **Structure**: `// Arrange` / `// Act` / `// Assert` comment blocks in unit tests.
- **Grouping**: `[Collection(...)]` to group integration tests sharing a `WebApplicationFactory` instance.
- **Mocks**: prefer hand-written `Test*` adapter classes over a mocking framework for external dependencies — keeps tests readable and avoids `Setup`/`Verify` complexity.
