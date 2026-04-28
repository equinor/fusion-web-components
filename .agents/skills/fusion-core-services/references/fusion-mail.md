# Mail API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Mail`

## Endpoint groups (controller-level)
- `MailsController`
- `ManagementController`

## Priority workflow coverage
- send-mail flows across supported request versions
- templated mail workflows
- mail status and delivery update workflows
- management/whitelist operations

## Model clarity map
- Request models: `Controllers/RequestModel/*`
- Response models: `Controllers/ViewModel/*`
- Validation helpers: `Controllers/Validation/*`
- Key versioned request payloads: `SendMailRequestV2`, `SendMailRequestV3`

## Capability / OPTIONS defaults
- No public `OPTIONS` capability probes are documented in the verified Mail API surface.
- Frontend or backend clients should infer send and management permissions from caller identity, configured scopes, and explicit `403 Forbidden` responses rather than a dedicated capability endpoint.
- For administrative views such as whitelist or log management, prefer server-driven authorization checks and disable mutation UI unless the app already knows the current caller has the required scope or elevated role.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `useHttpClient(name)` for configured clients in React apps
- Suggested client file: `src/api/mailClient.ts`
- Suggested hook file: `src/features/mail/useSendMail.ts`
- Keep send-request DTOs versioned locally.
- Starter shape:

```ts
export interface NewMailRequestDto {
	subject: string;
	body: string;
	recipients: string[];
	fromDisplayName?: string;
}

export async function createMail(baseUrl: string, payload: NewMailRequestDto, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/mails`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
		...init,
	});
	if (!response.ok) throw new Error(`Mail API failed: ${response.status}`);
	return await response.json();
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("mail-client", setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.Mail)`
	- named-client wrapper with typed request DTOs per version
- Suggested client class: `MailApiClient`
- Suggested DTOs: `NewMailRequestDto`, `MailItem`, `MailStatusDto`
- Prefer explicit serializer options for enum/string handling.
- Starter shape:

```csharp
public sealed class MailApiClient(HttpClient httpClient)
{
		public async Task<ApiMail?> CreateMailAsync(NewMailRequestDto request, CancellationToken cancellationToken)
		{
			using HttpResponseMessage response = await httpClient.PostAsJsonAsync("mails", request, cancellationToken);
			response.EnsureSuccessStatusCode();
			return await response.Content.ReadFromJsonAsync<ApiMail>(cancellationToken: cancellationToken);
		}
}

public sealed record NewMailRequestDto(string Subject, string Body, IReadOnlyList<string> Recipients, string? FromDisplayName = null);
```

## Suggested local models
- `NewMailRequestDto`
- `MailItem`
- `MailTemplateItem`
- `MailStatusDto`

## Representative model snapshots
- `NewMailRequestDto`: `subject`, `body`, `recipients`, optional `fromDisplayName`
- `MailItem`: created mail id, status, sender, recipients
- `MailTemplateItem`: template name/key and render payload expectations

## Validation highlights
- `NewTemplatedMailRequest.Recipients` must contain at least one valid email address
- `NewTemplatedMailRequest.Subject` is required
- `NewTemplatedMailRequest.MailBody.HtmlContent` is required
- attachment total size is limited to 3 MB in the primary validation flow

## Versioning notes
- Multiple send request versions exist; choose the version that matches target environment and endpoint contract.
