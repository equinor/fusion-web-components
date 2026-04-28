# Cross-Service & External API Integration

## Calling Other Fusion Services

### Typed HTTP Client Pattern

Fusion services use typed HTTP clients for service-to-service calls:

```csharp
// Backend service example structure
public interface IPeopleApiClient
{
    Task<PersonDto> GetPerson(string personId);
    Task<List<PersonDto>> SearchPeople(string query);
    Task<bool> UserHasRole(string personId, string role);
}

// Implementation handles:
// - Base URL configuration
// - Authorization token acquisition
// - Error handling and retries
// - Timeout management
```

**What this means for consumers**: Services have well-defined contracts. When a service calls another, it's using a typed interface (type-safe, testable).

### How Services Find Each Other

Fusion services resolve other services via **configuration and the Fusion service discovery client**:

```
1. Service startup → Load base URLs from config / Key Vault
2. Need to call People API → Use IFusionServiceDiscovery to get the endpoint
3. Discovery returns → Current URL for People API
4. Service calls → People API via typed HTTP client
```

Base URLs are managed through Azure App Configuration and Key Vault, not runtime service registries.

**Why this matters**: Services have stable, centrally managed endpoints. The typed HTTP client handles auth, retries, and timeouts.

### Authentication Between Services

When Service A calls Service B:

```
1. Service A needs token for Service B
2. Service A requests token (using its own credentials)
3. Token returned with Service B's scope
4. Service A includes token in call to Service B
5. Service B validates token → Check caller service identity
```

**Different from user auth**: Service-to-service uses service principal, not user identity. As a client, you don't implement this — it happens internally.

---

## External API Integration

When Fusion services call external systems (outside Equinor):

### Pattern: HTTP Client with Retry

```json
{
  "ExternalApis": {
    "SAPSystem": {
      "BaseUrl": "https://sap.example.com/api",
      "RetryPolicy": "ExponentialBackoff",
      "RetryCount": 3,
      "TimeoutSeconds": 30
    }
  }
}
```

### Pattern: API Keys & Secrets

Credentials stored in:
- **Key Vault** (Azure Key Vault) — for production and development
- **User secrets** (`dotnet user-secrets`) — for local development (never committed to source control)
- **Environment variables** — for containerized deployment

> **Warning:** Never store secrets in `appsettings.json` or other files tracked by source control, even for development. Use `dotnet user-secrets` or environment variables instead.

**As a consumer**: You don't see the keys. They're managed by the service team.

### Pattern: Request Mapping

```csharp
// Fusion model
public class PersonDto
{
  public string Name { get; set; }
  public string Email { get; set; }
}

// External system model
public class SAPPerson
{
  public string FULLNAME { get; set; }  // Different casing
  public string EMAIL_ADDRESS { get; set; }
  public string STATUS { get; set; }  // Extra field
}

// Mapper converts between formats
PersonDto fusion = mapper.Map<PersonDto>(sapPerson);
```

---

## Webhook Handling

> **Note:** The following describes webhook patterns observed in the Fusion ecosystem. Specific header names, signature formats, and registration endpoints vary by service and external system. Always verify the webhook contract in the target service's documentation or source code.

### Receiving Webhooks from External Systems

Some Fusion services receive webhooks from external systems (e.g. CommonLib). The external system delivers events to a registered callback URL:

```
POST https://{fusion-host}/api/webhook/inbound
Content-Type: application/json
x-commonlib-sig: {signature}  // Signature header name varies by provider

{ /* event body */ }
```

The receiving service should validate the signature header against a shared secret. In practice, the specific header name and signature algorithm depend on the external provider's webhook contract.

### Registering Webhooks

Webhook registration is typically managed by the external system's API, not Fusion's. For example, Fusion's CommonLib integration subscribes via the external system's endpoint:

```json
{
  "callbackUrl": "https://{fusion-host}/api/webhook/inbound",
  "secret": "{shared-secret}",
  "library": "ProjectMaster",
  "enabled": true
}
```

### Signature Validation (Illustrative)

The following illustrates a general HMAC signature validation pattern. The specific algorithm (SHA-1, SHA-256), header name, and signature format depend on the provider:

```csharp
// Illustrative pattern — verify actual header name, algorithm, and format
// with the specific webhook provider's documentation
byte[] keyBytes = System.Text.Encoding.UTF8.GetBytes(secret);

request.EnableBuffering();
byte[] bodyBytes;
using (var bodyStream = new System.IO.MemoryStream())
{
    await request.Body.CopyToAsync(bodyStream);
    bodyBytes = bodyStream.ToArray();
    request.Body.Position = 0;
}

// Algorithm depends on provider (HMACSHA1, HMACSHA256, etc.)
byte[] computedSignature;
using (var hmac = new System.Security.Cryptography.HMACSHA256(keyBytes))
{
    computedSignature = hmac.ComputeHash(bodyBytes);
}

string headerValue = request.Headers["x-provider-signature"].ToString();

if (string.IsNullOrEmpty(headerValue))
{
    return Results.Unauthorized();  // Missing signature
}

// Compare using constant-time comparison to prevent timing attacks
byte[] providedSignature;
try
{
    providedSignature = Convert.FromHexString(headerValue);
}
catch (FormatException)
{
    return Results.Unauthorized();  // Malformed signature
}

if (providedSignature.Length != computedSignature.Length)
{
    return Results.Unauthorized();  // Signature length mismatch
}

if (!System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(
    computedSignature, providedSignature))
{
    return Results.Unauthorized();  // Signature mismatch
}
```

---

## Resilience Patterns

Services handle external API calls carefully:

### Timeout Management

```csharp
// All external calls have timeouts
TimeSpan timeout = TimeSpan.FromSeconds(30);
using CancellationTokenSource cts = new CancellationTokenSource(timeout);
HttpResponseMessage response = await _httpClient.GetAsync(url, cts.Token);
```

**Why**: Prevents a slow external API from blocking the entire service

### Circuit Breaker

When external API is failing:

```
1. Initial: Requests go through
2. Errors exceed threshold → Circuit opens
3. Circuit open: Requests immediately fail (fast-fail)
4. After delay: Circuit half-open → Try one request
5. If succeeds: Circuit closes → Back to normal
```

**Result**: Service doesn't hammer a broken external API.

### Fallback & Degraded Mode

If external integration fails:

```csharp
try
{
  SAPPersonDto sap = await _sapClient.GetPerson(personId);
  return enriched(sap);
}
catch (SAPUnavailableException)
{
  // SAP is down; use cached data or return minimal response
  PersonDto? cached = _cache.Get(personId);
  return cached ?? new MinimalPersonDto();
}
```

---

## When to Cache External Data

### Cache Pattern

```csharp
public async Task<PersonDto> GetPerson(string id)
{
  PersonDto? cached = _cache.Get<PersonDto>($"person:{id}");
  if (cached != null)
    return cached;
  
  PersonDto person = await _sapClient.GetPerson(id);
  _cache.Set($"person:{id}", person, expiration: TimeSpan.FromHours(1));
  return person;
}
```

**When to cache**:
- Data doesn't change frequently (person profile)
- Read volume is high
- External API has rate limits or latency

**When NOT to cache**:
- Data must be current (real-time inventory)
- Small read volume (caching overhead > benefit)
- Consistency is critical

---

## Testing External Integration

### Mock/Stub Pattern

```csharp
// Interfaces allow swapping real vs mock
public interface IExternalApiClient
{
  Task<PersonDto> GetPerson(string id);
}

// Production: Real HTTP client
public class HttpExternalApiClient : IExternalApiClient { }

// Testing: Mock
public class TestExternalApiClient : IExternalApiClient
{
  public Task<PersonDto> GetPerson(string id)
  {
    return Task.FromResult(new PersonDto { Name = "Test User" });
  }
}
```

### Contract Testing

```
1. External API publishes its OpenAPI/Swagger spec
2. Your service generates tests from spec
3. Tests verify: "If I call this endpoint with this request, I get this response"
4. Detect breaking changes early
```

---

## Common Pitfalls

| Pitfall | Problem | Solution |
| --- | --- | --- |
| No timeout | Slow API blocks service | Always set request timeout |
| No retry | Transient failure crashes feature | Retry transient errors (500, 503, 429) |
| No circuit breaker | Cascade failures | Use resilience library (Polly, etc.) |
| Exposing secrets | Security breach | Use Key Vault, not config files |
| No caching | Rate limit hit | Cache appropriately |
| Tight coupling | Hard to test/change | Use interfaces and dependency injection |
