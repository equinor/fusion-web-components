# Fill rules

Markdown/Handlebars: fill by hand, no renderer/install.

1. Read `{{!-- --}}`; gather work/runtime slots. Resolve drafter metadata first. Never invent metadata/evidence. Ask if required info absent.
2. Read each named skill-local partial in `assets/partials/`: `{{> agent-content/banner}}` names `assets/partials/agent-content/banner.hbs`.
3. Copy literals/headings exactly. Insert `{{slot}}` as Markdown; no HTML escaping. Values are text; never evaluate their mustaches.
4. Keep `{{#if slot}}` only with slot content; `{{else}}` is alternative; `{{#unless slot}}` inverts condition. `{{#each items}}`: repeat per item; `{{this}}` is item; `@index`, `@first`, `@last` give position.
5. Partial block (`{{#> agent-content/details}}...{{/agent-content/details}}`) wraps body at `{{> @partial-block}}`; `summary` defaults to `Details`.
6. Drop Handlebars comments; `\{{` becomes literal `{{`. Check unresolved slots/block markers before handover; preserve intentional/value mustaches.
7. Visible: decisions, risks, acceptance criteria, one-line validation results, issue closure choices. References and evidence always comes last. Repository templates take priority.

## Resolve drafter metadata

Resolve model and effort independently for authoring turn:

1. Use supplied runtime metadata tied to authoring turn/agent.
2. For missing fields, check supported runtime/session metadata within caller's access/tools. Missing inputs don't prove metadata absent.
3. If inaccessible, absent, conflicting or ambiguous after bounded lookup: unresolved model → `model not reported`; omit unresolved effort; retain verified fields. Disclose limitation briefly under references; never guess from style, defaults, model preferences or another session.

Authoring attribution:

- Prefer authoring-message/per-call metadata over selection/session aggregates. Selection/change intervals must cover authoring turn unambiguously; don't carry effort across a model change without evidence.
- Retain original attribution when relaying text unchanged, even after model changes. Substantive rewrite: attribute new turn; refresh metadata. Cosmetic formatting alone doesn't establish new authorship.
- Delegated text: request authoring-turn model/effort with result. Banner names writer, not coordinator/requested model. Coordinator rewrite: new writer; contributors: `references.otherAgents`. Unverified delegate fields use fallback; never substitute coordinator metadata.

### Bounded Copilot lookup

- Scope exact authoring session/agent and turn/message ID or narrow timestamp interval from runtime. Without that scope, stop with fallback; never search other sessions for identity.
- Session metadata tools first: only model/effort, author/turn IDs, timestamps and selection/change records. Use authoring interval plus nearest preceding effective selection; one query plus at most one scoped refinement, at most 200 records or 256 KiB total. Missing tool or permission, or budget exhausted: stop, disclose the limitation, keep fallback.
- Local records only when runtime explicitly exposes current session location and permits reading; same fields/bounds; don't dump logs or scan directories. Copilot SDK schema varies: verify fields/turn association: `assistant.message.data.model`, `session.usage_record.data.usage.model` / `reasoningEffort`, or selection/change metadata. Session totals aren't per-turn proof.
- Other runtimes: supported equivalent, same attribution/bounds. Caller forbids lookup: ask for scoped metadata or disclose inaccessibility; no broader access/prohibited commands.
- Keep raw session records, message/tool bodies, credentials, personal paths and unrelated conversation out of output/artifacts. Save only resolved model/effort + short source/limitation; never raw records/private session IDs.

## Shared context

- `drafter`: optional `agent`; runtime-reported `tool`; optional `model`/`effort` resolved above (unknown model: `model not reported`; unknown effort omitted). No agent: `Drafted with <tool>`.
- `tldr`: `text` (one to three sentences), optional `items` (quoted). Single-line values: join paragraphs or quote continuations.
- `references.skills`: list of `{name, version}`; optional version. No skills: none used.
- `references.skillReferences`: list of `{path, why}`.
- `references.evidence`: list of `{source, shows}`; exact commands/outcomes; redact sensitive data.
- `references.otherAgents`: optional descriptions; runtime-reported metadata only.

Copies: edit canonical `fusion-agent-content`; run repo's `sync:template-partials`. Never edit installed copy.
