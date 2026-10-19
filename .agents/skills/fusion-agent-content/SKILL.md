---
name: fusion-agent-content
description: 'Shapes text that agents write for people: issues, PR descriptions, review replies, comments, verdicts, bug reports, and delivery reports. Produces a banner naming the agent and model, a quoted TL;DR, human-first prose under the repository template, folded supporting details, and a folded record of the skills, references, and evidence used. USE FOR: drafting or tidying agent-written GitHub text, making a PR or issue body shorter and readable, adding provenance and evidence, "write this up for humans", "add a TL;DR". DO NOT USE FOR: choosing or simulating the audience (use fusion-audience-alignment), skill or agent instruction files, commit messages, end-user product help, or publishing without confirmation.'
license: MIT
metadata:
  version: "0.1.1"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-audience-alignment
    - fusion-issue-authoring
    - fusion-pr-documentation
    - fusion-github-review-resolution
  tags:
    - writing
    - github
    - pull-request
    - issues
    - provenance
    - human-first
---

# Agent Content for People

Agents write a lot of text that people read: issues, PR descriptions, review replies, verdicts, and reports. This skill gives that text one recognizable shape. A reader learns who drafted it and what it means within seconds. The supporting material is still there for anyone who wants it, without getting in the way.

## When to use

- An agent drafts or updates an issue, PR description, review reply, PR or issue comment, review verdict, bug report, or delivery report.
- Another authoring skill (for example `fusion-issue-authoring` or `fusion-pr-documentation`) produces a body for people to read.
- The user asks to make agent text shorter or more readable, or to add a TL;DR, provenance, or evidence.

## When not to use

- Deciding who the readers are, or testing the draft against them: use `fusion-audience-alignment`, then come back here.
- Skill files, agent instructions, and other text written for agents.
- Commit messages: keep them short and conventional.
- End-user product help: follow its own style guide, without a banner.
- Machine-read files such as JSON, YAML, or changesets parsed by tooling.

## Required inputs

- The content type and destination (repository, issue, PR, or comment thread), and the repository template if one exists.
- Who is writing: the tool (for example GitHub Copilot), the custom agent name if any, the model, and the reasoning effort, as reported by the runtime.
- What was used: the skills and references read, and the evidence gathered (files, issues, docs, commands and their output).
- The intended readers, when known. Otherwise assume a teammate who reviews the work and a future maintainer.

## Instructions

### 1. Shape the content

Read `assets/content-skeleton.md.hbs`, its slot header, and `assets/partials/agent-content/README.md`. Read named partials from this skill's `assets/partials/`; fill by hand, without installing or running a renderer. Use this order:

1. **Banner**: the first line, small, naming who drafted the text.
2. **TL;DR**: a quote block of one to three sentences on the outcome and what the reader needs to do.
3. **Body**: the repository template's headings, in their order, written in plain prose.
4. **Details**: supporting material, folded.
5. **References and evidence**: skills, references, and sources used, folded and always last.

### 2. Write the banner

```markdown
<sub>🤖 Drafted by fusion-developer (GitHub Copilot) · claude-opus-5.5 · high reasoning</sub>
```

- Name the custom agent when one wrote the text, then the tool in parentheses. Without a custom agent, write `Drafted with GitHub Copilot`.
- Take the model and reasoning effort from the runtime. Never guess. If either is unknown, write `model not reported` or leave out the reasoning part.
- When several agents contributed, name the one that wrote the text and list the others under references.
- Update the banner when you rewrite text another model drafted. Don't add one to text the user wrote and asked you to post as is.

### 3. Write the TL;DR and body for people

Follow `references/writing-for-people.md`. In short:

- Write the TL;DR as a quote block that starts with `> **TL;DR:**`, and quote any list under it too. Give the outcome and the ask, and don't repeat the title. If the first template section already is the summary (such as a task's "What to do"), it serves as the TL;DR.
- Write for a teammate with thirty seconds. Use natural, flowing sentences and short paragraphs. Use bullets only for real lists.
- Aim for a visible part that fits on about one screen. Shorten by folding, never by dropping facts.

### 4. Fold details and references

Follow `references/details-and-references.md`.

- **Details** hold the material most readers will skip: implementation notes, file lists, command output, raw data, and long tables.
- Write issues and pull requests as `owner/repo#123`, never as Markdown links with custom labels, so GitHub shows their title and state.
- **References and evidence** is the last folded block. It lists the skills used (with version when known), the skill references read, and the evidence behind each claim (issues, PRs, docs, ADRs, commands) with one line on what each shows.
- Never fold what the reader must act on: acceptance criteria, decisions, risks, breaking changes, the one-line validation result, or which issues close on merge.

### 5. Check before handing over

Run `assets/pre-post-checklist.md`. Then hand the draft back to the calling skill or to the user. Publishing stays with the calling workflow and needs the user's confirmation.

## Expected output

- A draft in the five-part shape, with an accurate banner.
- A short note on anything unknown, such as an unreported model, or evidence that could not be verified.

## Example

User: "Turn your findings into a PR description."

Agent: writes the banner from its runtime metadata, then a two-sentence quoted TL;DR saying what changed and what the reviewer should check first. It fills the repository template in prose. It folds the file list and validation output under **Details**, and the skills, references, and sources it used under **References and evidence**. The one-line validation result and the issues that will close stay visible.

Avoid: a body that opens with a file inventory, repeats the title as a summary, or hides a breaking change inside a folded block.

## Safety & constraints

- Never invent a model, reasoning effort, skill, or source. Mark what is unknown.
- Folded content is still public: no secrets, tokens, personal data, or internal-only links in details.
- Folding is for supporting material, not for hiding decisions, risks, or failures.
- Don't publish, comment, or edit GitHub content without the user's explicit confirmation; that gate belongs to the calling workflow.
- Repository templates and contributor guides win over this shape when they conflict; keep their headings and add the banner, TL;DR, and folded blocks around them.
