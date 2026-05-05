# README Template

Default structure for package READMEs when the target repository does not provide its own template. Adapt section order and depth to the package's complexity — small utility packages may omit Configuration; large packages may split API Reference into sub-sections.

## Template

````markdown
# <Package Name>

<One-paragraph description: what the package does, what problem it solves, and who it is for. Lead with the outcome, not the implementation.>

## Features

- <Key capability 1 — what it enables>
- <Key capability 2>
- <Key capability 3>

## Installation

```bash
npm install <package-name>
# or
pnpm add <package-name>
```

## Usage

<Primary usage scenario with a realistic, copy-pasteable code example.>

```ts
import { mainExport } from '<package-name>';

// Describe the scenario
const result = mainExport(/* realistic args */);
```

<If the package has multiple primary use cases, show 2-3 focused examples under sub-headings.>

## API Reference

### `<exportName>`

<Brief description of what it does and when to use it.>

```ts
function exportName(param: Type): ReturnType;
```

| Parameter | Type | Description |
|---|---|---|
| `param` | `Type` | What it controls |

**Returns:** What the caller receives.

<Repeat for each key public export. For packages with many exports, group by category (hooks, utilities, types, constants).>

## Configuration

<Configuration options, environment variables, or setup requirements. Omit this section if the package has no configuration.>

| Option | Type | Default | Description |
|---|---|---|---|
| `option` | `Type` | `default` | What it controls |
````

## Writing guidelines

### Description paragraph

- Lead with the **outcome** the package enables, not implementation details
- Include the **problem domain** — what area does this package belong to?
- Mention the **target audience** if not obvious
- Use keywords that would appear in a natural-language search query

```markdown
<!-- ❌ Implementation-focused -->
# fusion-observable
Provides RxJS-based observable utilities and subscription management.

<!-- ✅ Outcome-focused -->
# fusion-observable
Subscribe to real-time data changes across Fusion modules with automatic cleanup and error recovery. Designed for Fusion app developers who need reactive data flows without manual subscription management.
```

### Features list

- State what each feature **enables**, not what it **is**
- Use active verbs: "Tracks...", "Validates...", "Streams..."
- Keep to 3-7 bullets — if more, group under sub-headings

### Code examples

- Use **realistic** variable names and scenarios from the package's domain
- Show the **import statement** so the reader knows the entry point
- Keep examples **minimal but complete** — copy-pasteable without additional setup
- Add brief inline comments explaining the **why**, not the **what**

### API Reference section

- List exports in the same order as the barrel export
- For large packages (15+ exports), group by category with sub-headings
- Include the function signature, parameter table, and return description
- Link to TSDoc in source when the README summary is a subset of the full docs

### Retrieval optimization

The README should surface for natural-language queries about the package's domain:
- Use domain keywords in **headings** (not just "Overview" or "API")
- Front-load important terms in the **first sentence** of each section
- Include the package's **common aliases** or related terms in the description
- Avoid jargon-only descriptions — pair technical terms with plain-language explanations
