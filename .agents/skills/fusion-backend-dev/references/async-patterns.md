# Async & Event Patterns

## Event Publishing

Fusion services publish events to Azure Service Bus topics using `IEventNotificationClient`. Events follow the [CloudEvents v1.0](https://github.com/cloudevents/spec/blob/v1.0/spec.md) specification.

### Event Type Categories

Event types use a dotted naming convention: `com.equinor.fusion.{domain}.{type}`.

| Category | Type name | Service | Sub-types (in payload) |
| --- | --- | --- | --- |
| People | `com.equinor.fusion.people.profile` | People | `ProfileUpdated`, `UserRemoved` |
| People | `com.equinor.fusion.people.security` | People | `RolesUpdated` |
| Context | `com.equinor.fusion.context.context` | Context | `Created`, `Modified`, `Deleted` |
| Context | `com.equinor.fusion.context.relation` | Context | Relation changes |
| Org | `com.equinor.fusion.org.position` | Org | `PersonAssigned`, `PersonUnassigned`, `PositionCreated`, `PositionUpdated`, `PositionRemoved` |
| Org | `com.equinor.fusion.org.project` | Org | `ProjectCreated`, `ProjectUpdated`, `ProjectRemoved` |
| Org | `com.equinor.fusion.org.contract` | Org | `ContractCreated`, `ContractUpdated`, `ContractRemoved` |

### Event Format (CloudEvents v1.0)

```json
{
  "specversion": "1.0",
  "id": "{event-id}",
  "source": "fusion-context-service",
  "type": "com.equinor.fusion.context.context",
  "time": "2026-04-17T10:30:00Z",
  "datacontenttype": "application/json",
  "fusionCategory": "optional-category",
  "data": "{ /* JSON-serialized payload string */ }"
}
```

> **Note:** The `data` field is a JSON-serialized string, not a nested object. Deserialize it separately to access the typed payload.

---

## Event Subscription

### Subscription API Pattern

Several Fusion services expose subscription endpoints that create a Service Bus subscription and return connection details with a SAS token. Only application users (service principals) can subscribe.

**Known subscription endpoints:**

| Service | Endpoint | Topic |
| --- | --- | --- |
| Context | `PUT /subscriptions/contexts` | `context-sub` |
| ContractPersonnel | `PUT /subscriptions/contracts` | `contractpersonnel-sub` |
| FusionTasks | `PUT /subscriptions/fusiontasks` | `fusiontask-sub` |
| Roles V2 | `PUT /subscriptions/roles-v2` | `role-v2-sub` |

**Request:**
```json
{
  "id": "optional-guid",
  "identifier": "my-app-name",
  "type": "Persistent",
  "typeFilter": ["com.equinor.fusion.org.position"]
}
```

- `type`: `"Persistent"` (auto-deletes after 14 days idle) or `"Transient"` (auto-deletes after 5 minutes idle)
- `typeFilter`: Optional array of event type names for SQL filter on the `type` message property
- `identifier`: Your application name; used to generate a recognizable subscription name

**Response:**
```json
{
  "id": "subscription-guid",
  "handlerName": "context-sub",
  "connection": {
    "endpoint": "sb://namespace.servicebus.windows.net",
    "path": "topic/subscriptions/subscription-name",
    "token": {
      "audience": "https://namespace.servicebus.windows.net/path",
      "tokenValue": "SharedAccessSignature sr=...&sig=...&se=...&skn=SubscribersKey",
      "tokenType": "servicebus.windows.net:sastoken",
      "expiresAtUtc": "2026-04-17T12:30:00Z"
    }
  }
}
```

### Connecting with the SAS Token

Use the returned connection details to create a Service Bus client.
The `endpoint` is an `sb://` URI — extract the host for `ServiceBusClient`:

```csharp
// Parse the sb:// endpoint to get the host name
var endpointUri = new Uri(connection.Endpoint);

var client = new ServiceBusClient(
    endpointUri.Host,
    new AzureSasCredential(connection.Token.TokenValue));

// connection.Path is the full subscription path: "{topic}/subscriptions/{name}"
// Use the topic + subscription overload for ServiceBusProcessor
const string subscriptionSegment = "/subscriptions/";
var subscriptionIndex = connection.Path.IndexOf(subscriptionSegment, StringComparison.OrdinalIgnoreCase);
if (subscriptionIndex < 0)
{
    throw new InvalidOperationException(
        $"Unexpected Service Bus subscription path format: '{connection.Path}'.");
}

var topicName = connection.Path[..subscriptionIndex];
var subscriptionName = connection.Path[(subscriptionIndex + subscriptionSegment.Length)..];

if (string.IsNullOrWhiteSpace(topicName) || string.IsNullOrWhiteSpace(subscriptionName))
{
    throw new InvalidOperationException(
        $"Unexpected Service Bus subscription path format: '{connection.Path}'.");
}

var processor = client.CreateProcessor(
    topicName,
    subscriptionName,
    new ServiceBusProcessorOptions { MaxConcurrentCalls = 1 });

processor.ProcessMessageAsync += async (args) =>
{
    string body = args.Message.Body.ToString();
    // Body is a CloudEvent v1.0 JSON; deserialize accordingly
    var cloudEvent = JsonConvert.DeserializeObject<CloudEventV1>(body);
    // Process the event...
};

processor.ProcessErrorAsync += async (args) =>
{
    if (args.Exception is UnauthorizedAccessException)
    {
        // SAS token expired — renew by calling the subscription endpoint again
    }
};

await processor.StartProcessingAsync();
```

> **Token renewal:** SAS tokens expire. When `UnauthorizedAccessException` occurs, stop the processor, call the subscription endpoint again to get a fresh token, and reconnect with a new client.

### Filtering Events

Subscriptions support SQL filters on Service Bus message properties:

```
type = 'com.equinor.fusion.org.position'
app = 'my-app-id'
```

These filters are set via `typeFilter` in the subscription request or managed by the service when creating the subscription.

### Service Bus Message Properties

Messages on the bus carry these `ApplicationProperties` (available for filtering):

| Property | Description |
| --- | --- |
| `type` | Event type name (e.g. `com.equinor.fusion.org.position`) |
| `app` | App context identifier |
| `origin` | Event origin |
| `category` | Event category |
| `batch-id` | Batch identifier (when events are sent as a batch) |

---

## Common Event Patterns

### Pattern: Real-Time Sync

When another system needs to stay in sync:

```
1. User does action in Fusion
2. Fusion publishes event
3. External system receives event
4. External system updates its local copy
```

**Use case**: Dashboard showing current org chart, active positions

**Challenge**: Initial state. Solution: Fetch full snapshot on startup, then subscribe to incremental updates.

### Pattern: Eventual Consistency

When operations span multiple services:

```
1. User creates context → Context service publishes ContextCreated
2. Approvals service receives → Creates default approvals
3. Reporting service receives → Adds to reporting index
4. Notifications service receives → Sends "New project" message
```

**Key**: All listeners are independent; failure in one doesn't block the others.

### Pattern: Webhook Delivery

When an external system needs event notifications via HTTP callbacks:

```
1. External system registers webhook URL (via the provider's webhook API)
2. Event occurs in the source system
3. Source system makes HTTP POST to the registered callback URL
4. Receiver validates signature and processes the event
```

> **Note:** Webhook header names, signature formats, and registration APIs vary by provider. Always check the specific provider's documentation for the exact contract. See [integration-patterns.md](./integration-patterns.md) for an illustrative signature validation pattern.

---

## Handling Events

### Idempotent Processing

Events can be delivered multiple times. Your handler must be idempotent:

```csharp
// ❌ NOT idempotent:
public void Handle(PositionAssigned @event)
{
  DbPosition position = new DbPosition
  {
    PositionId = @event.Data.PositionId,
    PersonId = @event.Data.PersonId,
    Title = @event.Data.Title
  };
  _db.Positions.Add(position);
  _db.SaveChanges();
}

// ✅ Idempotent:
public void Handle(PositionAssigned @event)
{
  DbPosition? existing = _db.Positions.Find(@event.Data.PositionId);
  if (existing == null)
  {
    DbPosition position = new DbPosition
    {
      PositionId = @event.Data.PositionId,
      PersonId = @event.Data.PersonId,
      Title = @event.Data.Title
    };
    _db.Positions.Add(position);
    _db.SaveChanges();
  }
  // If already processed, no-op
}
```

### Error Handling

What if processing fails?

```csharp
try
{
  ProcessEvent(@event);
  AcknowledgeMessage(message);  // Tell bus we succeeded
}
catch (RecoverableException ex)
{
  // Retry later (service bus will redeliver)
  // Don't acknowledge; message stays on queue
}
catch (PoisonMessage ex)
{
  // This event is bad; move to dead-letter queue
  MoveToDlq(message);
}
```

### Ordering Guarantees

Don't assume messages arrive in order.

- Events for the same context may still be delivered out of order
- Events for different contexts may be interleaved or out of order
- Don't assume global ordering

**If you need strict ordering**: Use an explicit ordering strategy such as Service Bus Sessions (for example, `sessionId = contextId`) so related events are processed FIFO within that session.

**Tradeoffs**: Sessions require session-aware consumers and can reduce parallelism for events that share the same session.
---

## Async APIs (Polling)

Some long-running operations use polling:

```
1. Start operation → Returns operation ID
2. Poll status endpoint with operation ID
3. Operation completes → Returns result
```

**Example**:
```
POST /api/contexts?api-version=1.0 → 202 Accepted
{ "operationId": "op-uuid" }

GET /api/contexts/op-uuid?api-version=1.0 →
{ "status": "InProgress", "progress": 45 }

// Later...
GET /api/contexts/op-uuid?api-version=1.0 →
{ "status": "Completed", "contextId": "ctx-uuid" }

// Alternatively, send the version in a header:
// api-version: 1.0
```

---

## When to Use Each Pattern

| Pattern | Use Case | Pro | Con |
| --- | --- | --- | --- |
| **Event Subscription** | Real-time sync, multi-system orchestration | Decoupled, fire-and-forget, scales | Complex setup, eventual consistency |
| **Webhook** | External system notification | Simple for external partners, HTTP standard | Requires public endpoint, delivery challenges |
| **Polling** | Frontend UX (show progress), long operations | Simple client code, user control | Chatty, can be slow |
| **Direct API Call** | Immediate result needed, tight coupling acceptable | Simple, immediate feedback | Tightly coupled, not resilient to changes |
