# Changelog

## 0.1.1 - 2026-07-23

### patch

- [#193](https://github.com/equinor/fusion-skills/pull/193) [`fa0ab7e`](https://github.com/equinor/fusion-skills/commit/fa0ab7e4509ab7b6c82081e9b3363483ae0bf6b0) Thanks [@alftore](https://github.com/alftore)! - Add SECURITY.md explaining High Risk false positive


  Static analysis flags the token-in-shell-variable patterns in
  `references/agentic-patterns.md` (Pattern 2 and Pattern 7) as a credential
  exposure risk. The file documents that these are false positives — the skill
  contains no scripts or executable code, and the tokens are short-lived Azure AD
  bearer tokens that exist only as local shell variables during a command.

## 0.1.0 - 2026-05-29

### minor

- [#176](https://github.com/equinor/fusion-skills/pull/176) [`7da00f3`](https://github.com/equinor/fusion-skills/commit/7da00f300c8a24d6fc02fba800179c4155101fad) Thanks [@alftore](https://github.com/alftore)! - Add fusion-devtools skill for Fusion DevTools CLI (fdev)


  Covers REST API calls, token acquisition, service discovery, person lookup, PIM activation, and environment mapping.
