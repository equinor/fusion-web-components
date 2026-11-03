# Skill Readiness Checklist

Review before marking new/updated skill ready.

## Must pass

- [ ] Frontmatter has `name` and `description`; optional fields earn inclusion
- [ ] `name` matches the folder name, uses kebab-case, is <= 64 chars, no leading/trailing `-`, no consecutive hyphens
- [ ] `name` excludes reserved words (`anthropic`, `claude`) no XML tags
- [ ] `description` is non-empty, <= 1024 chars, third person, no XML tags, concrete `USE FOR` and `DO NOT USE FOR` cues
- [ ] `SKILL.md` includes: When to use, When not to use, Required inputs, Instructions, Expected output, and Safety & constraints
- [ ] `SKILL.md` has concrete example or direct link in `references/`
- [ ] Shared catalog checked first; reuse/update almost-matches, no duplicates
- [ ] Long guidance in `references/`, all references one level from `SKILL.md`
- [ ] Bundled `agents/` files have clear, narrow jobs; no habitual scaffolding
- [ ] Optional `tags`, `mcp`, `compatibility`, and composition fields match real discovery/runtime needs
- [ ] At least three representative requests reviewed against final content
- [ ] When runtime permits, repeat requests with/without skill (baseline), each target model; record results
- [ ] References over ~100 lines: contents list; one term per concept; time-sensitive notes only in "Old patterns" section
- [ ] MCP: server/tool names; scripts: execute vs read, dependencies
- [ ] Target-environment validation run; evidence recorded
- [ ] Requested scope only; no secret handling, hidden network or remote-code execution