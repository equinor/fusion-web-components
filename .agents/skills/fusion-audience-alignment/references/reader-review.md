# Reviewing as a reader

Read the draft with only what the reader knows. A reader who has seen the code, the chat, or the agent's research is not a fair test.

## Questions per reader

1. **TL;DR alone:** what do they understand, and could they decide or act from it?
2. **Missing:** what do they need that the draft doesn't say?
3. **Unclear:** which terms, acronyms, or references would they not know?
4. **Skipped:** what would they skip, and could it be folded or cut?
5. **Can act:** yes, partly, or no, and what stops them.

## Findings table

| Reader | Understood from TL;DR | Missing | Unclear | Would skip | Can act |
| --- | --- | --- | --- | --- | --- |
| Product owner | ... | ... | ... | ... | partly |

## Inline or subagent

- **Inline** is enough for most issues and PRs: switch perspective deliberately, one reader at a time.
- **Subagents** give a fairer test for important content, such as announcements, cross-team stories, or ADRs. Start one per reader with only the draft and the reader card (`assets/reader-review-prompt.md.hbs`), and no repository or chat context. Collect their findings and merge duplicates.

## From findings to changes

- A gap the content can fill from verified facts: add it, in the place that reader reads.
- A gap nobody has answered yet: turn it into a visible open question; don't invent an answer.
- Jargon: explain it once, or replace it with a plain word.
- Material only one reader needs: fold it under details with a summary that names that reader's need.
- Conflicting needs: favor the reader who must act, and give the others a pointer.
