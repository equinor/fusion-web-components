# Collaborative drafting

Build drafts with user, not for user. Goal: published issue holds user intent and verified facts only, no plausible filler.

## Question rounds

Run before drafting when problem, outcome, success criteria, scope or dependencies are unclear.

- One to three questions per round, highest impact first. Each carries recommended answer: concrete answer user can accept as-is (e.g. "Recommended: filter saved orders by status"), not advice on how to answer; plus one-line reason.
- Answer from code, docs or issue history first; ask only what sources cannot settle.
- Use structured question form when runtime supports it; otherwise numbered list.
- Round output is questions only: no draft file or partial draft until stage 1 answered. Unattended runs skip rounds (see Assumption gate).
- Stop after round where nothing material remains open; usually one or two rounds.
- Skip rounds when request already states problem, criteria, scope and dependencies, or user asks for no questions.

## Staged drafting

Agree small pieces before full draft, one round each when unclear:

1. Problem and outcome.
2. Success or acceptance criteria.
3. Scope, non-goals and dependencies.

Settled stages need no extra round. Never present full long draft before stage 1 agreed.

## Provenance tags

Tag every substantive claim in draft, in every section: problem and outcome statements, requirements, acceptance criteria, scope and non-goals, dependencies, environment and reproduction facts, impact, risks and decisions. Not tagged: headings, template boilerplate, the banner and quoted user text.

- `[stated]`: user said it, this session or in linked source user pointed to.
- `[verified: <source>]`: confirmed in code, docs, config or issue history; name path, URL or command.
- `[assumed]`: agent inference. Keep only when needed to make draft coherent.

Untagged substantive claim counts as `[assumed]`. Tags are review aids. Before publish: drop every tag; list `[verified]` sources in References and evidence fold.

## Cut before presenting

Before showing draft, remove content neither requested nor backed by evidence: speculative requirements, generic risks, restated context, padding. Report cuts in one line below draft (`Cut: …`) so user can restore any.

## Assumption gate

Publishing always needs explicit approval (SKILL.md safety gates); this gate adds a content condition, never replaces approval.

- **Interactive** (user can answer this session): block publish until each `[assumed]` claim confirmed (becomes `[stated]`), edited or removed. Ask in one round; list claims, recommend keep/edit/drop each.
- **Unattended**: caller states no user is available to answer, and has pre-authorized drafting (and publishing, if it wants a publish) for this run, e.g. greenkeeping or orchestrator runs with explicit publish approval in their invocation. Never infer unattended mode from silence or run mode alone. Don't block on assumptions: list every unresolved one in visible `Assumptions to confirm` section placed right after summary (`TL;DR`, or first summary section such as task `Objective` when template has no TL;DR), and report them in delivery output. Without pre-authorized publishing, stop at local draft.
