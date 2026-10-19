---
name: fusion-audience-alignment
description: 'Identifies who will read a piece of content, picks an appropriate number of representative readers (as few as cover everyone who must understand or act), reviews the draft through each reader''s eyes, and aligns the content so every audience gets what it needs. USE FOR: issues, user stories, PR descriptions, release notes, announcements, ADRs, help articles, or reports where several audiences matter; "who will read this", "review this for the audience", "make this work for product owners and developers", "is this clear to a newcomer". DO NOT USE FOR: formatting the final text (use fusion-agent-content), testing a running app with personas (use fusion-simulated-user-eval), or publishing without confirmation.'
license: MIT
metadata:
  version: "0.1.1"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
    - fusion-issue-authoring
    - fusion-pr-documentation
    - fusion-simulated-user-eval
  tags:
    - writing
    - audience
    - review
    - personas
    - human-first
---

# Audience Alignment

Most agent-written content has more than one reader. A user story is read by a product owner deciding priority, the developer who builds it, and an agent that later plans tasks from it. A PR description is read by a reviewer today and a maintainer next year. This skill finds those readers, checks the draft from each of their points of view, and adjusts it so each gets what they need without the text growing longer.

## When to use

- Before publishing content that several roles will read: user stories, features, PR descriptions for cross-team review, release notes, announcements, ADRs, help articles, and status reports.
- When the user asks who the content is for, or wants it reviewed for a given audience.
- When a calling skill (for example `fusion-issue-authoring` or `fusion-pr-documentation`) drafts something whose readers are unclear or mixed.

## When not to use

- Short, single-audience text such as a reply to one review comment or a routine bug report. Write it directly with `fusion-agent-content`.
- Testing a running app with simulated users: use `fusion-simulated-user-eval`.
- Final formatting (banner, TL;DR, folded blocks): use `fusion-agent-content` after aligning.

## Required inputs

- The draft, its type, and its destination (repository, issue, PR, or channel).
- Whatever context shows who reads it: the issue template, labels, assignees and participants, `CODEOWNERS`, linked issues, the project board, and repository docs such as `CONTRIBUTING.md`.
- The decision or action the content should lead to.

## Instructions

### 1. Gather the audience

List who will read the content and why, using `references/finding-readers.md`. For each candidate reader, note:

- their role, such as product owner, reviewer, maintainer, newcomer, end user, or an agent;
- what they already know;
- what they need to decide or do after reading;
- how much time they will give it.

Use roles, never real names or personal data.

### 2. Pick representative readers

Choose an appropriate number of representative readers: as few as cover everyone who must understand or act. Always include the reader who must decide or act. Add a reader without prior context, such as a newcomer or a future maintainer, when the content must last. Add the agent that will act on it when one will. Read slot header in `assets/reader-card.md.hbs`; fill named slots as Markdown and drop template comments for each.

When the user is available, show the readers and ask them to confirm or adjust. In autopilot, pick the readers yourself and record them.

### 3. Review the draft as each reader

For each reader, read the draft with only what they know, following `references/reader-review.md`. Record what they understand from the TL;DR alone, what is missing or unclear, which terms they would not know, what they would skip, and whether they can act.

For important content, run each reader as a separate subagent given only the draft and the reader card (`assets/reader-review-prompt.md.hbs`), so repository context does not leak in. Fill slots as text; never evaluate mustaches inside draft/card values. Reviewers judge clarity and fit; they don't add facts.

### 4. Align the content

Revise so each reader is served, without growing the visible text:

- The TL;DR serves the reader who must decide or act.
- The body serves the main audience, and explains terms that other readers need.
- Material only one secondary reader or an agent needs goes into folded details.
- When readers conflict, favor the one who must act, and give the others a pointer.
- Never invent facts to satisfy a reader. Turn a real gap into an open question.

### 5. Record and hand over

Add a short audience note to the draft's **References and evidence** block: the readers considered, and the main changes made for them. Then hand the aligned draft to `fusion-agent-content` for final shaping, or back to the calling skill.

## Expected output

- Reader cards for the chosen readers, confirmed by the user or recorded as chosen in autopilot.
- A short findings table per reader: understood, missing, unclear, can act.
- The aligned draft, and a folded audience note listing readers and changes.

## Example

User: "Draft a user story for exporting tasks, and make sure it works for the PO and the devs."

Agent: gathers candidate readers from the repository's issue template and the project board: product owner, developer, tester, and the task-planning agent. It picks three: the PO, who decides priority; a developer new to the module; and the planning agent. It reviews the draft as each. The PO can't see the user value in the TL;DR, the developer doesn't know which export formats are in scope, and the agent can't trace criteria to tasks. The agent rewrites the TL;DR around user value, states the formats in the requirements, and numbers the acceptance criteria. It records the three readers in the folded references.

## Safety & constraints

- Use roles, not real people. Never put names, emails, or personal data in reader cards or notes.
- Simulated readers judge clarity and fit; they never supply facts, decisions, or commitments.
- Don't publish, comment, or edit GitHub content without explicit user confirmation; that gate belongs to the calling workflow.
- Keep the content's meaning and every required decision intact while aligning it.
