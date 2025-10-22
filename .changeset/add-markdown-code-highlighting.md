---
"@equinor/fusion-wc-markdown": minor
"@equinor/fusion-wc-storybook": patch
---

Added code highlighting and table support to markdown viewer

- Add Prism.js dependency and TypeScript types
- Implement syntax highlighting for code blocks
- Create modular file structure with code-highlighter utility
- Support multiple languages (TypeScript, C#, CSS, Bash, YAML)
- Replace ProseMirror tokenizer with marked library for better table support
- Add comprehensive table styling with responsive design
- Create separate table.styles.ts file for better code organization
- Update example files with TypeScript, C#, and enhanced table examples
- All styles properly scoped to shadow DOM
