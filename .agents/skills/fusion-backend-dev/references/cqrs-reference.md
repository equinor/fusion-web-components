# CQRS: Commands, Queries, and Handlers

## Command/Query Pattern Basics

Fusion services use **CQRS** (Command Query Responsibility Segregation) via MediatR:

### Commands (Write Operations)

A command represents an intent to change state:

```csharp
// Example command
public class CreatePositionCommand : IRequest<PositionDto>
{
    public string ContextId { get; set; }
    public string Title { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? ExternalId { get; set; }  // Optional idempotency key
}
```

**Characteristics**:
- Imperative name (Create, Update, Delete, Assign, Publish)
- Returns a result (`IRequest<TResponse>`)
- Goes through validation pipeline
- May trigger events
- Executed once (idempotent when possible)

### Queries (Read Operations)

A query represents a request for data:

```csharp
// Example query
public class GetPositionsQuery : IRequest<List<PositionDto>>
{
    public string ContextId { get; set; }
    public bool IncludeArchived { get; set; }
}
```

**Characteristics**:
- Indicative name (Get, List, Find, Search)
- Returns data (`IRequest<TResponse>`)
- Should be idempotent (no side effects)
- Can be cached
- Multiple executions are safe

### Handlers

Each command/query has a handler that processes it:

```csharp
// Command handler
public class CreatePositionHandler : IRequestHandler<CreatePositionCommand, PositionDto>
{
    public async Task<PositionDto> Handle(CreatePositionCommand request, ...)
    {
        // Validate input
        // Check authorization
        // Apply business logic
        // Save to database
        // Publish events
        // Return result
    }
}

// Query handler
public class GetPositionsHandler : IRequestHandler<GetPositionsQuery, List<PositionDto>>
{
    public async Task<List<PositionDto>> Handle(GetPositionsQuery request, ...)
    {
        // Query database
        // Apply filters
        // Return data
    }
}
```

---

## Handler Lifecycle

When you call a command/query, this happens:

```
1. Handler created (dependency injection)
2. Validation behaviors run
   ├─ Validate input schema
   └─ Validate business rules
3. Authorization behavior runs
   └─ Check if user has permission
4. Logging/telemetry begins
5. Handle() method executes
6. Response captured
7. Events published (if any)
8. Logging/telemetry ends
9. Response returned
```

---

## Command Patterns

### Create Pattern

```csharp
public class CreateContextCommand : IRequest<ContextDto>
{
    public string Title { get; set; }
    public string Type { get; set; }  // ProjectContext, ProgramContext, etc.
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

// Handler responsibilities:
// 1. Validate: Title not empty, dates valid, type recognized
// 2. Check auth: User is admin or has create permission
// 3. Create: Context entity with initial state
// 4. Persist: Save to database
// 5. Publish: ContextCreated event
// 6. Return: ContextDto with new ID
```

### Update Pattern

```csharp
public class UpdateContextCommand : IRequest<ContextDto>
{
    public string ContextId { get; set; }
    public string? Title { get; set; }  // Optional — null means unchanged
    public DateTime? EndDate { get; set; }  // Optional — null means unchanged
}

// Handler responsibilities:
// 1. Load: Fetch current context
// 2. Validate: New values are valid
// 3. Check auth: User is context manager
// 4. Update: Modify only specified fields
// 5. Persist: Save changes
// 6. Publish: ContextModified event
// 7. Return: Updated ContextDto
```

### Delete Pattern

```csharp
public class DeleteContextCommand : IRequest<bool>
{
    public string ContextId { get; set; }
}

// Handler responsibilities:
// 1. Load: Fetch context
// 2. Check auth: Only admin or context owner
// 3. Validate: Can delete (no active positions, etc.)
// 4. Delete: Mark as archived (soft delete) or remove
// 5. Persist: Save deletion state
// 6. Publish: ContextDeleted event
// 7. Return: Success boolean
```

---

## Query Patterns

### Single Item

```csharp
public class GetContextQuery : IRequest<ContextDto>
{
    public string ContextId { get; set; }
}

// Handler: Fetch by ID, apply read authorization, return
```

### List with Filtering

```csharp
public class ListContextsQuery : IRequest<List<ContextDto>>
{
    public string? Type { get; set; }  // Optional filter
    public bool IncludeArchived { get; set; }
    public int? Take { get; set; }  // Pagination
    public int? Skip { get; set; }
}

// Handler: Query with optional filters, paginate, return list
```

### Fluent Builder Pattern

Some queries support fluent building (illustrative pseudo-code — actual query classes vary by service):

```csharp
// Fluent builder query example:
GetContextQuery query = new GetContextQuery { ContextId = contextId }
    .WithPositions()
    .WithManager()
    .WithResponsibilities();

ContextDto context = await mediator.Send(query);
```

**What this enables**: Load only the data you need (optimization)

---

## Validation & Authorization

### Validation Flow

```
1. Input validation: Are required fields present? Correct types?
2. Business rule validation: Does this make sense?
   - StartDate before EndDate?
   - Context not archived?
   - Quota not exceeded?
3. Authorization check: Does user have permission?
```

### Authorization Requirements

```csharp
public class CreatePositionCommand : IRequest<PositionDto>, ITrackableRequest
{
    public string ContextId { get; set; }
    public string Title { get; set; }
}

// Implicit requirement:
// Must satisfy "IsContextManager" for ContextId
// This is checked before Handle() runs
```

**If authorization fails**: `403 Forbidden` returned; Handle() never runs

---

## Error Handling

### Validation Errors

Command fails in validation phase (ProblemDetails envelope):

```
Response: 400 Bad Request
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "error": { "code": "ModelValidationError", "message": "Model contained 1 error" },
  "errors": { "startDate": ["Must be before end date"] },
  "traceId": "..."
}
```

### Authorization Errors

Command fails in authorization phase:

```
Response: 403 Forbidden
{
  "type": "https://docs.fusion-dev.net/development/api/errors/#403",
  "title": "User is not authorized to access data",
  "status": 403,
  "error": { "code": "Forbidden", "message": "Only context managers can create positions" },
  "traceId": "..."
}
```

### Business Rule Violations

Handler executes but business rule check fails:

```csharp
if (context.IsArchived)
{
  throw new InvalidOperationException("Cannot modify archived context");
}
```

```
Response: 400 Bad Request
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Invalid operation",
  "status": 400,
  "detail": "Cannot modify archived context",
  "error": { "code": "InvalidOperation", "message": "Cannot modify archived context" },
  "traceId": "..."
}
```

### Unexpected Errors

Handler crashes or unhandled exception:

```
Response: 500 Internal Server Error
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "Unexpected error",
  "status": 500,
  "error": { "code": "UnexpectedError", "message": "An unexpected error occurred" },
  "traceId": "00-abc123..."  // Share with support
}
```

---

## Choosing Command vs Query

| Aspect | Command | Query |
| --- | --- | --- |
| **Intent** | Change state | Read state |
| **Side effects** | Expected (save to DB, publish events) | None (read-only) |
| **Idempotent** | Usually not (or explicitly handled) | Always |
| **Can cache** | No | Yes |
| **Execution** | Once, carefully | Multiple times safe |
| **Example** | CreatePosition, UpdateContext, AssignRole | GetContext, ListPositions, SearchPeople |

---

## Common Handler Patterns

### Idempotent Creation

```csharp
public async Task<PositionDto> Handle(
    CreatePositionCommand request,
    CancellationToken cancellationToken)
{
    // Check if already exists only when an idempotent key was provided
    if (!string.IsNullOrWhiteSpace(request.ExternalId))
    {
        DbPosition? existing = await _db.Positions
            .FirstOrDefaultAsync(p => p.ExternalId == request.ExternalId, cancellationToken);

        if (existing != null)
            return _mapper.Map<PositionDto>(existing);  // Return existing
    }
    
    // Create new
    DbPosition position = new DbPosition { ... };
    await _db.SaveChangesAsync(cancellationToken);
    await _mediator.Publish(new PositionCreated(position), cancellationToken);
    
    return _mapper.Map<PositionDto>(position);
}
```

### Soft Delete

```csharp
public async Task<bool> Handle(
    DeleteContextCommand request,
    CancellationToken cancellationToken)
{
    DbFusionContext context = await _db.Contexts.FindAsync(request.ContextId)
        ?? throw new NotFoundException($"Context {request.ContextId} not found");
    
    context.IsArchived = true;
    context.ArchivedAt = DateTime.UtcNow;
    context.ArchivedBy = _currentUser.Id;
    
    await _db.SaveChangesAsync(cancellationToken);
    await _mediator.Publish(new ContextArchived(context), cancellationToken);
    
    return true;
}
```

### Transactional Consistency

```csharp
public async Task<ContextDto> Handle(
    CreateContextCommand request,
    CancellationToken cancellationToken)
{
    using IDbContextTransaction transaction = await _db.Database.BeginTransactionAsync(cancellationToken);
    
    try
    {
        DbFusionContext context = new DbFusionContext { ... };
        await _db.Contexts.AddAsync(context, cancellationToken);
        
        // Create default positions, approvals, etc. in same transaction
        DbPosition defaultPosition = new DbPosition { ContextId = context.Id, ... };
        await _db.Positions.AddAsync(defaultPosition, cancellationToken);
        
        await _db.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);
        
        // Publish events AFTER transaction succeeds
        await _mediator.Publish(new ContextCreated(context), cancellationToken);
        
        return _mapper.Map<ContextDto>(context);
    }
    catch
    {
        await transaction.RollbackAsync(cancellationToken);
        throw;
    }
}
```
