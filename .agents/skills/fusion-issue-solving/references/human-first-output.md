## Human-first output

People read the PR body draft (step 9) and the delivery report, so give both the same shape:
1. A banner line, `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`, filled from runtime metadata and never guessed.
2. A quoted TL;DR (`> **TL;DR:** ...`) of one to three sentences, then (for the PR body) the repository PR template headings in plain prose.
3. A folded `<details><summary>Details</summary>` block for file lists and command output, then a folded `<details><summary>References and evidence</summary>` block last, for the skills, references, and evidence used.

Keep the one-line validation result, risks, and the issues that close on merge visible. When `fusion-agent-content` is installed, use it to shape both texts; optionally also use `fusion-pr-documentation` for the PR body when it is installed.
