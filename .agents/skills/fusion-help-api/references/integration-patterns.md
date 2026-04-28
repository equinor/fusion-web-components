# Integration Patterns

Common code patterns for integrating the Fusion Help API into applications and scripts.

See also: [Authentication](authentication.md) | [API Endpoints](api-endpoints.md)

---

## Pattern 1: Display help articles in a Fusion app

Fetch articles for your app key and render them in a side panel or help section.

```typescript
// React component using Fusion Framework HTTP client
import { useEffect, useState } from "react";
import { useHttpClient } from "@equinor/fusion-framework-react/hooks";

function HelpArticles({ appKey }: { appKey: string }) {
  const httpClient = useHttpClient("help");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    httpClient
      .fetchAsync(
        `/apps/${appKey}/articles?$expand=content&$orderby=sortOrder asc&api-version=1.0`
      )
      .then((res) => res.json())
      .then((data) => setArticles(data.value));
  }, [appKey]);

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          {/* Render article.content as markdown */}
        </div>
      ))}
    </div>
  );
}
```

## Pattern 2: Show latest release notes on app startup

```typescript
const response = await httpClient.fetchAsync(
  `/apps/${appKey}/release-notes/published?$expand=content&$top=1&$orderby=publishedDate desc&api-version=1.0`
);
const data = await response.json();
const latestRelease = data.value?.[0];
```

## Pattern 3: Inline FAQ search

```typescript
const response = await httpClient.fetchAsync("/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    search: userQuery,
    filter: `appKey eq '${appKey}'`,
    top: 5,
  }),
});
```

## Pattern 4: Backend automation script (C#)

```csharp
using Azure.Identity;
using System.Net.Http;
using System.Net.Http.Json;

// Setup
var credential = new DefaultAzureCredential();
var token = await credential.GetTokenAsync(
    new TokenRequestContext(new[] { "5a842df8-3238-415d-b168-9f16a6a6031b/.default" }));

var client = new HttpClient
{
    BaseAddress = new Uri("https://help.ci.api.fusion-dev.net")
};
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", token.Token);

// List all articles for an app
var articles = await client.GetFromJsonAsync<PagedResponse<Article>>(
    "/apps/my-app/articles?$expand=content&api-version=1.0");

// Create a new article
var newArticle = new
{
    title = "Automated Article",
    summary = "Created by automation script",
    content = "## Hello\n\nThis was created programmatically.",
    slug = "my-app-automated-article",
    sourceSystem = "my-automation-script",
    sortOrder = 10.0,
    tags = new[] { "automated" }
};

var response = await client.PostAsJsonAsync("/apps/my-app/articles?api-version=1.0", newArticle);
response.EnsureSuccessStatusCode();

// Update an existing article
var patch = new { content = "## Updated\n\nNew content." };
var patchResponse = await client.PatchAsJsonAsync(
    "/apps/my-app/articles/my-app-automated-article?api-version=1.0", patch);

// Delete an article
await client.DeleteAsync("/apps/my-app/articles/my-app-automated-article?api-version=1.0");
```

## Pattern 5: Python automation script

```python
import requests
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
token = credential.get_token("5a842df8-3238-415d-b168-9f16a6a6031b/.default")

base_url = "https://help.ci.api.fusion-dev.net"
headers = {
    "Authorization": f"Bearer {token.token}",
    "Content-Type": "application/json"
}

# List articles
resp = requests.get(
    f"{base_url}/apps/my-app/articles",
    params={"$expand": "content", "api-version": "1.0"},
    headers=headers
)
articles = resp.json()["value"]

# Create article
new_article = {
    "title": "Python-created Article",
    "summary": "Created via Python script",
    "content": "## Hello from Python\n\nAutomated content.",
    "slug": "my-app-python-article",
    "sourceSystem": "python-script",
    "tags": ["automated", "python"]
}
resp = requests.post(
    f"{base_url}/apps/my-app/articles",
    params={"api-version": "1.0"},
    json=new_article,
    headers=headers
)
```
