# Copilot review gate

Use when user or repository policy requires Copilot before human review. Repository-local policy owns adoption
and overrides these portable defaults; ordinary thread remediation does not start this gate automatically.

Gate belongs to the publisher layer: whoever publishes the PR (interactive developer session or host publisher)
runs it. Worker-level issue solving, PR drafting and dependency review without publication authority never run,
block on or wait for it; they report content and leave the gate to the publisher.

## Enter and authorize

- Before requesting human review, complete at least one Copilot PR review and leave no unresolved critical findings.
  PR creation, ready status, local agent critique and dependency research do not count as completed PR reviews.
- Open PRs as draft and keep them draft through the gate; mark ready only when ready for human review (gate
  passed or documented exception). Ready status can notify CODEOWNERS, rules or bots, so it never comes first.
- Interactive: ask once before requesting Copilot, covering up to three review rounds, scoped fixes, validation,
  pushes, replies and resolutions. A decline pauses the gate and human-review request; never silently bypass.
- Headless/autopilot: always run within granted workflow authority, without the interactive question. Mode alone
  grants no remote permissions; caller restrictions and runtime action approvals still apply.
- Read live PR head, reviews and full discussion. Track rounds, review ids, requested/reviewed commit ids, request
  times and dispositions in a durable PR-scoped tracker: caller's persistent run artifact, otherwise
  `.tmp/copilot-review-gate-<owner>-<repo>-<number>.md`. Save tracker after each request/completion/disposition.
  Before any request, reload tracker and reconcile live review/request history, including pending requests.
  Lost tracker: reconstruct from durable PR/run evidence; ambiguous prior count means blocked, never reset to zero.
  Reuse an applicable completed review as round one; check it covers handed-off work, not unrelated or stale head.

## Request, wait and judge

1. Use a supported Copilot-review request tool, or authenticated `gh`:

   ```bash
   gh pr edit <number> --repo <owner/repo> --add-reviewer "@copilot"
   ```

   This requests/re-requests a GitHub review, not local critique. Confirm actual tool support and request outcome.
   Never substitute a human reviewer or post a comment as a failed-review-request fallback.
2. Wait for a completed Copilot review corresponding to the requested commit and round. A pending request, empty
   review list or passing CI is not a completed zero-finding review. A completed review with no findings counts.
   Wait for the review only, never for CI: do not poll running checks; report their state as observed.
   Read review summary, inline threads and replies completely; incomplete pagination/retrieval blocks judgment.
3. Treat **High** severity as critical. Also classify security, correctness, data loss, or build/test-breaking
   findings as critical, regardless of Medium/Low/missing label. Evaluate feedback against code and requirements;
   a label never makes incorrect feedback true. Uncertain critical findings remain blocking until evidenced.
4. Apply the entry's fetch → analyze → fix → validate → push → reply → resolve → verify sequence. Fix valid findings;
   validate and publish fixes before replying/resolving. For incorrect/outdated findings, reply with evidence then
   resolve. Every finding needs a disposition, including non-critical feedback; unresolved uncertainty is reported,
   never silently resolved. Non-critical findings alone do not block human review.
5. After any code change since completed review, including Low/Medium fixes or later pushes, require another
   Copilot review on current head while rounds remain. Body-only updates do not invalidate reviewed code.
   Initial plus re-reviews total at most **three rounds**, not three retries. At round three, unresolved critical
   findings or changed code without a completed current-head review mean stop and ask the person for a decision;
   unattended runs leave the PR draft, record the result and stop. Do not request human review anyway.

## Unattended service runs

Automated worker agents without PR authority do not request reviews, edit PRs, or mark them ready; the host's
publisher that creates their PR (for example the Greenkeeper publisher) applies this section. Unattended runs with
explicit PR authority keep the gate inside their time budget and never wait past it. Passed: mark ready. Blocked, rounds exhausted or review timed out: leave the PR draft, write the gate outcome,
findings and next step into the PR body, and finish the run successfully. The next run or a person continues from
the tracker. An unfinished gate never fails the run, withholds its PR, or holds it open waiting.

## Unavailability exception

Copilot not enabled for repository, exhausted review quota, or no completed review after about **15 minutes per
headless/autopilot round**: record observed reason and elapsed wait. Do not invent a quota/enablement diagnosis
from generic failure. Interactive pending reviews: report status and let the person decide rather than silently
using the headless timeout.

Explain exception in PR through an authorized note/body update, then continue to human review only if no known
critical findings remain unresolved. Mark **unavailable**, never **passed**. Missing note permission means local
draft and blocked handoff, not silent bypass. Exception never waives critical findings, required CI, legal/licence
acceptance or human approval.

Authentication, permission, transport, incomplete retrieval or mutation failures are blockers, not these
availability exceptions. Reconcile uncertain request results before retrying; do not exceed the round cap.

## Verify and hand off

Re-read live PR head and targeted thread state before human-review request. Any unreviewed code change
invalidates passed status, not only unrelated new code; never hand off a prior commit's review as current.
Report review ids/commits, rounds, validated fixes,
rebuttals/deferred non-critical findings, outstanding critical count and passed/blocked/unavailable outcome.
Human-review request still needs its own workflow authority. Copilot review never replaces required human approval.

Sources for tooling, not repository policy:
[GitHub CLI reviewer requests](https://cli.github.com/manual/gh_pr_edit) and
[GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review).
[CODEOWNERS automatic requests](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).
