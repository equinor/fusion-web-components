# Backend Code Search Reference

## Overview

Backend code search indexes C# implementations across Fusion services, libraries, and infrastructure. Use these search patterns when researching service implementations, API contracts, architectural patterns, or cross-service interactions.

## Search lanes

| Lane | Focus | Example Queries | Evidence Type |
| --- | --- | --- | --- |
| **Interface/Abstraction** | Service interfaces, contract definitions, API abstractions | "IPeopleApiClient", "IAuthorizationService", "interface definition" | C# interface declaration with method signatures and XML docs |
| **Class Implementation** | Concrete implementations, controllers, handlers, business logic | "PeopleService implementation", "PersonController", "class that handles" | C# class with implementation details, inheritance chain, dependencies |
| **CQRS Handler** | MediatR commands, queries, notifications and their handlers | "GetPersonCommand handler", "CreatePositionCommand", "query that retrieves" | C# command/query with handler, validation, authorization |
| **Authorization Pattern** | Role-based checks, authorization requirements, security validation | "How authorization works", "role check", "authorization requirement" | Authorization code, requirement definitions, role checks |
| **Validation Pattern** | FluentValidation rules, input validation, business rules | "Person validation", "validate email", "validation rules" | Validator classes, validation pipelines, error messages |
| **Cross-Service Call** | API client usage, service-to-service communication, HttpClient patterns | "How Org service calls People API", "calls to external service", "integration" | API client interface, method calls with URL/parameter construction |
| **Configuration** | Startup configuration, dependency injection, options patterns | "How is authentication configured", "options binding", "DI setup" | Startup.cs snippets, AddOptions patterns, ServiceCollection extensions |
| **Database Query** | Entity Framework queries, repository patterns, data access | "How person data is queried", "database access", "query performance" | EF Core queries, LINQ expressions, migration context |
| **Event Handling** | Domain events, service bus integration, event subscription patterns | "How events are published", "event subscription", "async integration" | Event classes, handlers, publish/subscribe code |

## Proven search starters

When you don't know the exact service or method, start with high-level intent:

```
"How does fusion-core-services handle authorization for sensitive endpoints"
→ Returns authorization handlers, requirement definitions, Startup config

"What's the pattern for validating input in fusion services"
→ Returns FluentValidation classes, validator registrations, error handling

"How do Fusion services integrate with external APIs"
→ Returns HttpClient setup, API client interfaces, authentication patterns

"How is the People service structured"
→ Returns Controllers, CQRS handlers, Domain models, DbContext
```

## Query construction tips

1. **Use service names**: "fusion-core-services", "fusion-libraries", "people", "org", "context"
2. **Use architectural terms**: "IRequest handler", "command", "query", "validator", "controller"
3. **Use intent verbs**: "how is X implemented", "what pattern does Y use", "does X support Z"
4. **Add context**: specific API version, scenario, or related entity helps narrow results

## Evidence capture

For backend code answers, always capture:

| Metadata | Meaning | Captured Example |
| --- | --- | --- |
| `repository` | Fusion repository name | `fusion-core-services` |
| `service` | Service/package name | `Fusion.Services.People` |
| `filePath` | Path to file in repo | `src/Fusion.Services.People/Controllers/PeopleController.cs` |
| `declarationName` | Type, method, or symbol | `GetPersonById` |
| `declarationKind` | C# declaration type | `method`, `class`, `interface` |
| Code snippet | Minimal code that proves the claim | The actual code lines quoted |

## Weak signal indicators

Stop and state uncertainty if:
- Search returns no results for the service/method you're looking for
- Results are from unrelated services (e.g., Org service results when querying People service)
- Code snippets are incomplete (truncated methods, missing context)
- Results don't clearly answer the "how" or "why" part of the question after one refinement

Example: _"I found references to PeopleService but not the specific implementation of profile update logic. To complete this answer, I'd need to verify the UpdateProfile method locally."_

## Lane examples by question type

### "How does the authorization work?"

**Lane:** Authorization Pattern  
**Query:** `"authorization requirement in fusion-core-services" + "role-based access"`  
**Expected result types:**
- Authorization handler classes
- Requirement builder extensions
- Startup configuration showing authorization pipelines
- Example authorize attributes on controllers

### "How do services call external APIs?"

**Lane:** Cross-Service Call  
**Query:** `"how fusion services integrate with external API" + "HttpClient"` OR `"API client abstraction"`  
**Expected result types:**
- API client interface definitions
- HttpClient factory setup
- Example service-to-service calls with URL construction
- Authentication header injection

### "What's the pattern for validating user input?"

**Lane:** Validation Pattern  
**Query:** `"FluentValidation" + "fusion-core-services"` OR `"validation rule"`  
**Expected result types:**
- Validator classes inheriting from AbstractValidator<T>
- Validation pipeline registration in Startup
- Error response mappings
- Example rule chains

### "How are domain events published?"

**Lane:** Event Handling  
**Query:** `"domain event" + "publish" + "async messaging"` OR `"INotification"`  
**Expected result types:**
- Domain event classes
- MediatR notification definitions
- Event handler implementations
- Service Bus or event bus integration code
