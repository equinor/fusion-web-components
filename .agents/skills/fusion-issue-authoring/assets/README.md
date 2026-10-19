# Issue authoring assets

`fusion-issue-authoring` contains all issue-type templates and GraphQL fallback queries.

## Issue templates

Type-specific fallback templates are in `issue-templates/`. Each opens with the drafting banner (and a quoted TL;DR where no section already summarizes the issue) and ends with folded Details and References and evidence blocks:

- `issue-templates/bug.md.hbs`
- `issue-templates/feature.md.hbs`
- `issue-templates/user-story.md.hbs`
- `issue-templates/task.md.hbs`
- `issue-templates/task.documentation.md.hbs`
- `issue-templates/task.planning.md.hbs`
- `issue-templates/task.research.md.hbs`
- `issue-templates/task.spec.md.hbs`
- `issue-templates/task.testing.md.hbs`
- `issue-templates/task.ux.md.hbs`

Read each `.hbs` slot header, `assets/partials/agent-content/README.md`, and
every named partial before filling. No renderer ships with the skill.

## GraphQL fallback queries

GraphQL fallback query assets for MCP gaps are available in:

- `graphql/issue_lookup.github.graphql`
- `graphql/issue_types_list.github.graphql`
- `graphql/issue_type_update.github.graphql`
- `graphql/sub_issue_write.github.graphql`
- `graphql/sub_issue_remove.github.graphql`
- `graphql/sub_issue_reprioritize.github.graphql`
- `graphql/linkage_verify.github.graphql`