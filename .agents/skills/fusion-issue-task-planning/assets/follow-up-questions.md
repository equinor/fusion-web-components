# Follow-up questions

Interactive: use only when required inputs are missing, at most 3 questions per batch, blockers first. Automated: resolve from task context; record safe assumptions or required-input blockers without questions.

## Blocking questions

1. Which issue should I plan for (`owner/repo#number` or URL)?
2. Should I proceed as a `User Story` if the issue type is missing or ambiguous?
3. What planning depth should I use: `minimal`, `standard`, or `detailed`?
4. Should I keep this `draft-only`, or prepare for publish after your explicit confirmation?

## Context enrichment questions

5. Which constraints or non-goals must be preserved when mapping tasks to acceptance criteria?
6. Are there specific ancestor issues or related links that must be included?

## Defaults

- Planning depth: `standard`
- Run mode: `draft-only`
- Publish behavior: active host authority required; explicit interactive publication confirmation or separately authorized automated scope, never run mode alone

## Questioning rules

- Ask at most 3 questions per batch.
- Do not ask questions that can be answered from issue data.
- If blocked by missing issue reference, ask only question 1 first.
- If acceptance criteria are incomplete, continue with explicit assumptions and flag for review.
