---
description: Complete a bounded Copilot review gate before requesting human pull request review.
applyTo: "**"
---

# Copilot before human review

- The active host runtime owns post-PR review-gate orchestration, approvals, credentials and remote publishing. The rules below guide its authorized gate owner; automated worker agents focus on implementation, validation and drafting, then hand off to the host's publisher.
- After opening a PR, before requesting human review, complete at least one Copilot review and leave no unresolved critical findings.
- Open every PR as draft and keep the PR draft through the gate. Mark it ready only when it is ready for human review: the gate passed or a permitted exception is documented. Ready status tells people to look now, and CODEOWNERS, rules or bots may notify them on it.
- High severity counts as critical. Security, correctness, data loss, or build/test-breaking findings also count as critical, regardless of label.
- Interactive sessions: ask the user once before requesting Copilot review; confirm the bounded review/fix/push/reply/resolve sequence. Declining pauses the gate and human-review request, not an implicit bypass. Automated runs: the host's authorized publisher owns the gate under host runtime policy.
- Mode is not mutation approval. Respect runtime permissions and explicit remote-action restrictions; missing authority blocks affected actions, not a claim that Copilot is unavailable.
- Use `fusion-github-review-resolution` for the gate and remediation. Missing companion or required tooling means blocked; report what is missing, do not substitute inline success or an availability exception.
- Request Copilot review, wait for completion, read the full review and threads, fix valid findings, validate and push fixes, then reply to and resolve every finding with evidence. Incorrect/outdated findings need a reasoned reply, not unnecessary edits. Uncertain findings stay open and are reported; non-critical findings do not block human review.
- After any code change since completed review, including non-critical fixes, request Copilot again on current head while rounds remain. Body-only updates are exempt. Count initial review plus re-reviews: at most three rounds total, not three retries. Save and reload a durable PR-scoped tracker before requests; unrecoverable prior count blocks further requests.
- After round three, unresolved critical findings or unreviewed changed code mean stop and ask the person for a decision. Unattended: leave the PR draft, record the gate result in the PR and stop. Do not request human review anyway.
- Review, not checks: the gate waits for a completed Copilot review, never for CI. Do not poll or wait for running checks before requesting review, fixing findings or handing off; report CI state as observed. Required CI stays a merge requirement enforced by branch rules and reviewers.
- Automated worker agents do not orchestrate the PR review gate or change PR readiness; the host's publisher applies the gate after publishing their work. This does not restrict host-authorized implementation, validation or commits.
- Unattended runs with PR authority (publishers, scheduled jobs): run the gate inside the run's time budget and never wait past it. Passed: mark ready. Blocked or timed out: leave the PR draft with the gate result in its body and finish the run successfully; the next run or a person continues. An unfinished gate never fails the run or withholds its PR.
- Copilot unavailable (repository not enabled, exhausted quota, or no completed review within about 15 minutes per headless/autopilot round): explain the observed reason in the PR, then continue to human review only if no known critical findings remain unresolved. This is an exception, not a passed gate.
- Authentication, permission, transport, or incomplete-review retrieval failures are blockers, not availability exceptions. No PR note permission means stop at a local draft; do not silently skip the explanation.
- Report review ids, reviewed commits, round count, findings/dispositions, validation, gate outcome and any exception before human handoff. A Copilot review does not replace human approval or required CI.
