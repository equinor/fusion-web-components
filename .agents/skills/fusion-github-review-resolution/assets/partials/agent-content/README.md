# Fill rules

Templates are Markdown in Handlebars notation. Read and fill them; no renderer or dependency installation is needed in the consumer repository.

1. Read the template's `{{!-- --}}` header. Gather slot values from the work and runtime. Never invent metadata or evidence. Ask when required information is missing.
2. Read every named partial from this skill's `assets/partials/`. `{{> agent-content/banner}}` names `assets/partials/agent-content/banner.hbs`.
3. Copy literal text and headings exactly. Insert `{{slot}}` values as Markdown, without HTML escaping. Values are text: never evaluate mustaches inside them.
4. Keep `{{#if slot}}` content only when the slot has content; `{{else}}` supplies the alternative. `{{#unless slot}}` is the inverse. Repeat `{{#each items}}` content once per item; `{{this}}` is the item, and `@index`, `@first`, `@last` describe its position.
5. A partial block (`{{#> agent-content/details}}...{{/agent-content/details}}`) wraps its body where the partial says `{{> @partial-block}}`. Its `summary` argument defaults to `Details`.
6. Drop Handlebars comments. Turn escaped `\{{` into literal `{{`. Before handing over, check for unresolved slots or block markers; preserve intentional literal mustaches and mustaches supplied as text.
7. Keep decisions, risks, acceptance criteria, one-line validation results, and issue closure choices visible. References and evidence always comes last. Repository templates take priority.

## Shared context

- `drafter`: `agent` (optional custom agent), `tool` (runtime-reported tool), `model` (optional; fallback `model not reported`), `effort` (optional; omit when unreported). Without an agent, banner says `Drafted with <tool>`.
- `tldr`: `text` (one to three sentences), `items` (optional list; each item stays quoted). Use single-line values; join prose paragraphs into one line or quote each continuation explicitly.
- `references.skills`: list of `{name, version}`; version optional. Without skills, say none used.
- `references.skillReferences`: list of `{path, why}`.
- `references.evidence`: list of `{source, shows}`. Include exact commands and outcomes; redact sensitive data.
- `references.otherAgents`: optional list of descriptions, using runtime-reported metadata only.

Shared files are synchronized copies. Maintainers edit the canonical folder in `fusion-agent-content`, then run the repository's `sync:template-partials` command. Do not edit an installed copy.
