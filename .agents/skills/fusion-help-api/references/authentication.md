# Authentication

All Help API endpoints require a valid Azure AD bearer token.

## Token audiences by environment

| Environment | Resource ID (audience) |
|-------------|----------------------|
| `ci`, `fqa`, `tr` | `5a842df8-3238-415d-b168-9f16a6a6031b/.default` |
| `fprd` | `97978493-9777-4d48-b38a-67b0b9cd88d2/.default` |

## From a Fusion app (frontend)

Use the Fusion Framework module's HTTP client, which handles token acquisition automatically. The help service is registered as `"help"` in the Fusion service discovery.

```typescript
import { useHttpClient } from "@equinor/fusion-framework-react/hooks";

// Fusion Framework React example
const httpClient = useHttpClient("help");
const response = await httpClient.fetchAsync("/articles?$expand=content&$filter=appKey eq 'my-app'&api-version=1.0");
```

## From a backend service or script

```csharp
using Azure.Core;
using Azure.Identity;
using System.Net.Http.Headers;

// Using Azure.Identity
var credential = new DefaultAzureCredential();
var token = await credential.GetTokenAsync(
    new TokenRequestContext(new[] { "5a842df8-3238-415d-b168-9f16a6a6031b/.default" }));

var client = new HttpClient { BaseAddress = new Uri("https://help.ci.api.fusion-dev.net") };
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);
```

## From Azure CLI (quick testing)

```bash
az login
az account get-access-token --resource 5a842df8-3238-415d-b168-9f16a6a6031b
```
