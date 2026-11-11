# Changelog

## 0.2.0 - 2026-11-08

### minor

- [#402](https://github.com/equinor/fusion-skills/pull/402) [`87af3ac`](https://github.com/equinor/fusion-skills/commit/87af3ac85a28df72527d47be3d1d7d9f68e13b42) Thanks [@perkjelsvik](https://github.com/perkjelsvik)! - Document fdev GitHub security snapshot commands and routing to the report-writing skill.


  resolves equinor/fusion-skills#347

## 0.1.4 - 2026-11-01

### patch

- [#393](https://github.com/equinor/fusion-skills/pull/393) [`51da027`](https://github.com/equinor/fusion-skills/commit/51da0277628440f94532d6901d1bb3f678dc350a) - Load fdev setup and REST/token examples only when needed; retain memory-only token handling, mutation/PIM confirmation and command selection in the entrypoint.


  resolves equinor/fusion-core-tasks#2691

## 0.1.3 - 2026-11-01

### patch

- [#372](https://github.com/equinor/fusion-skills/pull/372) [`61c8e4b`](https://github.com/equinor/fusion-skills/commit/61c8e4bba4f71a2cf00e83c73e32e992460e1e69) - Shorten discovery wording while keeping fdev API testing, JSON tokens, service discovery, person lookup and PIM activation, distinct from backend code and infrastructure. Keep token/secret exposure and unconfirmed PIM activation excluded.


  resolves equinor/fusion-core-tasks#2673

## 0.1.2 - 2026-10-13

### patch

- [#255](https://github.com/equinor/fusion-skills/pull/255) [`fe03c5a`](https://github.com/equinor/fusion-skills/commit/fe03c5a24a5a011d5e6550e4f21d4387bae79ea0) Thanks [@alftore](https://github.com/alftore)! - Point the compatibility note to `fusion-core-services` instead of the deprecated `fusion-backend-dev` for understanding API contracts.

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
