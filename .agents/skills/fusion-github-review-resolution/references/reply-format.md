# Reviewer-facing reply format

## Human-first replies

Write every thread reply for the reviewer, not for an agent. When `fusion-agent-content` is installed, use it; otherwise follow this shape:

- First line: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`, filled from runtime metadata and never guessed (write `model not reported` when unknown).
- Then one to three sentences: the decision (fixed, partly fixed, or declined), the reason, and the commit that addresses it. A reply this short needs no TL;DR.
- Fold anything longer (test output, extended reasoning, links) into one `<details><summary>Evidence</summary>` block.
- Any summary comment or report this skill posts uses the full `fusion-agent-content` shape: banner, quoted `> **TL;DR:**`, prose, folded Details, folded References and evidence.

```markdown
<sub>🤖 Drafted by fusion-developer (GitHub Copilot) · claude-opus-5.5 · high reasoning</sub>

Fixed in abc1234: `parseConfig` now returns early on an empty file, as suggested.

<details>
<summary>Evidence</summary>

`bun test config` passes, including the new empty-file case.
</details>
```
