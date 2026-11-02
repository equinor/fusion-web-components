# Finding readers

Start from the content's destination and purpose, then confirm with what the repository shows.

## Where readers show up

- **Issue templates and labels.** A user story template implies a product owner and a developer. Labels such as `security`, `documentation`, or `ux` add specialist readers.
- **Assignees, participants, and reviewers.** Their roles, never their names, show who acts.
- **`CODEOWNERS` and team mentions.** These show who reviews a PR touching those paths.
- **Linked issues and the project board.** A parent story or epic tells you who tracks progress; a board column tells you who picks the work up next.
- **Repository docs.** `CONTRIBUTING.md`, ADRs, and READMEs show which decisions maintainers expect to be explained.
- **Agents.** If a skill or workflow will act on the content (task planning, issue solving, release automation), that agent is a reader too.

## Common readers by content type

| Content | Usually read by |
| --- | --- |
| User story or feature | Product owner, developer, tester, task-planning agent |
| Task | Developer who picks it up, reviewer, issue-solving agent |
| Bug report | Maintainer who triages, developer who fixes, reporter |
| PR description | Reviewer, future maintainer, release-notes writer |
| Release note or announcement | End users or consuming teams, support |
| ADR | Current team, future maintainers, neighboring teams |
| Help article | First-time user, experienced user, support |
| Status report | Lead or stakeholder, the team |

## Choosing how many

- Pick as few readers as cover everyone who must understand or act. A short reply may need one; a story that spans teams may need more.
- Always include the reader who must decide or act.
- Include a reader with no prior context when the content must last or will be found later.
- Include an agent reader when an agent will act on the content.
- Merge readers whose needs are the same; each extra reader should bring a need the others don't cover.

## User story example

User: "Draft a user story for exporting tasks, and make sure it works for the PO and the devs."

Agent: gathers candidate readers from the repository's issue template and the project board: product owner, developer, tester, and the task-planning agent. It picks three: the PO, who decides priority; a developer new to the module; and the planning agent. It reviews the draft as each. The PO can't see the user value in the TL;DR, the developer doesn't know which export formats are in scope, and the agent can't trace criteria to tasks. The agent rewrites the TL;DR around user value, states the formats in the requirements, and numbers the acceptance criteria. It records the three readers in the folded references.
