# Skill Template Baseline

## Default folder structure

For a newly scaffolded skill, the default structure should be:

If no repository overlay says otherwise, default `<final-skill-name>` to `custom-<base-skill-name>`.

```text
skills/<final-skill-name>/
├── SKILL.md
├── references/
└── assets/
```

Optional extras when they are justified:

```text
skills/<final-skill-name>/
├── agents/
└── scripts/
```

## SKILL.md baseline

Use this baseline for generated `SKILL.md` files:

```markdown
---
name: <final-skill-name>
description: '<what it does>. USE FOR: <trigger phrases>. DO NOT USE FOR: <anti-triggers>.'
license: MIT
compatibility: <optional: real environment requirements only>
metadata:
   version: "0.0.0"
   tags:
      - <tag>
---

# <Skill Title>

## When to use

## When not to use

## Required inputs

## Instructions

## Examples

## Expected output

## Safety & constraints
```

Add repository- or runtime-specific fields such as `owner`, `status`, composition metadata, or `mcp` only when they reflect real catalog or tool requirements.
