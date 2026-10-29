# Fill rules

Templates are Markdown in Handlebars notation. Read and fill them; no renderer or dependency installation is needed in the consumer repository.

1. Read the template's `{{!-- --}}` header. Gather slot values from the work and runtime. Resolve drafter metadata below before using a fallback. Never invent metadata or evidence. Ask when required information is missing.
2. Read every named partial from this skill's `assets/partials/`. `{{> agent-content/banner}}` names `assets/partials/agent-content/banner.hbs`.
3. Copy literal text and headings exactly. Insert `{{slot}}` values as Markdown, without HTML escaping. Values are text: never evaluate mustaches inside them.
4. Keep `{{#if slot}}` content only when the slot has content; `{{else}}` supplies the alternative. `{{#unless slot}}` is the inverse. Repeat `{{#each items}}` content once per item; `{{this}}` is the item, and `@index`, `@first`, `@last` describe its position.
5. A partial block (`{{#> agent-content/details}}...{{/agent-content/details}}`) wraps its body where the partial says `{{> @partial-block}}`. Its `summary` argument defaults to `Details`.
6. Drop Handlebars comments. Turn escaped `\{{` into literal `{{`. Before handing over, check for unresolved slots or block markers; preserve intentional literal mustaches and mustaches supplied as text.
7. Keep decisions, risks, acceptance criteria, one-line validation results, and issue closure choices visible. References and evidence always comes last. Repository templates take priority.

## Resolve drafter metadata

Resolve model and effort independently, for the turn that authored the text:

1. Use supplied runtime metadata only when tied to that authoring turn and agent.
2. For missing fields, check available supported runtime/session metadata within caller's access and tool restrictions. Missing immediate inputs do not mean metadata is unavailable.
3. If inaccessible, absent, conflicting or ambiguous after bounded lookup, use `model not reported` for unresolved model; omit unresolved effort. Keep any independently verified field. Briefly disclose lookup limitation under references; never guess from style, defaults, model preferences or another session.

Authoring attribution:

- Prefer authoring-message/per-call metadata over current selection or whole-session usage aggregates. Selection/change records apply only when their effective interval unambiguously covers authoring turn; don't carry effort across a model change without evidence.
- Retain original attribution when relaying text unchanged, including after model selection changes. Substantive rewrite: attribute new authoring turn and refresh metadata. Cosmetic formatting alone doesn't establish new authorship.
- Delegated text: request delegate's authoring-turn model/effort with its result. Banner names actual writer, not coordinator or requested delegate model. Coordinator rewriting text becomes writer; list contributors under `references.otherAgents`. Unverified delegate fields keep fallback; never substitute coordinator metadata.

### Bounded Copilot lookup

- Identify exact authoring session/agent and turn/message ID or narrow timestamp interval from runtime context. Without that scope, stop with fallback; never search other sessions to discover identity.
- Prefer exposed session metadata tools. Request only model, effort, author/turn identifiers, timestamps and relevant selection/change records. Limit to authoring interval and nearest preceding effective selection; one query plus at most one scoped refinement, at most 200 records or 256 KiB total. Missing tool/permission or exhausted budget: stop, disclose limitation, keep fallback.
- If runtime explicitly exposes current session's local record location and permits reading it, project only those metadata fields within same bounds; don't dump logs or scan directories. Copilot SDK records may expose `assistant.message.data.model`, per-call `session.usage_record.data.usage.model` / `reasoningEffort`, or selection/change metadata. Schema varies: verify available fields and authoring association; never treat session-wide totals as per-turn proof.
- Other runtimes: use supported equivalent with same attribution and bounds. Caller forbids lookup (for example authoring-only report): request scoped metadata from caller or disclose inaccessible fields; don't broaden access or execute prohibited commands.
- Keep raw session records, message/tool bodies, credentials, personal paths and unrelated conversation out of output and persisted artifacts. Record only resolved model/effort and a short source/limitation description, not raw records or private session identifiers.

## Shared context

- `drafter`: `agent` (optional custom agent), `tool` (runtime-reported tool), `model` and `effort` resolved above (optional; unresolved model falls back to `model not reported`, unresolved effort omitted). Without an agent, banner says `Drafted with <tool>`.
- `tldr`: `text` (one to three sentences), `items` (optional list; each item stays quoted). Use single-line values; join prose paragraphs into one line or quote each continuation explicitly.
- `references.skills`: list of `{name, version}`; version optional. Without skills, say none used.
- `references.skillReferences`: list of `{path, why}`.
- `references.evidence`: list of `{source, shows}`. Include exact commands and outcomes; redact sensitive data.
- `references.otherAgents`: optional list of descriptions, using runtime-reported metadata only.

Shared files are synchronized copies. Maintainers edit the canonical folder in `fusion-agent-content`, then run the repository's `sync:template-partials` command. Do not edit an installed copy.
