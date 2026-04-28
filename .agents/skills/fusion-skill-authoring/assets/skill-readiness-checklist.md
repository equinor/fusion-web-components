# Skill Readiness Checklist

Use this checklist before considering a new or updated skill ready to ship.

## Must pass

- [ ] Frontmatter includes `name` and `description`; optional fields are only added when they carry real meaning
- [ ] `name` matches the folder name, uses kebab-case, is <= 64 chars, does not start or end with `-`, and does not contain consecutive hyphens
- [ ] `name` does not include reserved words (`anthropic`, `claude`) and contains no XML tags
- [ ] `description` is non-empty, <= 1024 chars, written in third person, contains no XML tags, and includes concrete `USE FOR` and `DO NOT USE FOR` cues
- [ ] `SKILL.md` includes: When to use, When not to use, Required inputs, Instructions, Expected output, and Safety & constraints
- [ ] `SKILL.md` includes at least one concrete example or links directly to one in `references/`
- [ ] Existing skills were checked first when working in a shared catalog, and almost-matches are handled via reuse/update instead of duplication
- [ ] Long guidance is moved to `references/`, and all referenced files are one level deep from `SKILL.md`
- [ ] Any bundled `agents/` files have a clear job in the workflow, stay narrowly scoped, and are not present by default out of habit
- [ ] Optional metadata such as `tags`, `mcp`, `compatibility`, and composition fields reflect real discoverability and runtime needs
- [ ] At least three representative requests were reviewed against the final skill content
- [ ] Validation appropriate to the target environment was run and evidence was recorded
- [ ] Content is scoped to the requested change, contains no secret handling, and introduces no hidden network access or remote-code execution patterns