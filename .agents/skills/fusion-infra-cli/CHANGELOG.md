# Changelog

## 0.0.1 - 2026-07-03

### patch

- [#194](https://github.com/equinor/fusion-skills/pull/194) [`e01e200`](https://github.com/equinor/fusion-skills/commit/e01e2001214e42a3bd1f5153561073a5c70e4f4e) Thanks [@alftore](https://github.com/alftore)! - Add fusion-infra-cli skill for database provisioning


  New skill covering the `finf` CLI tool for provisioning and migrating Fusion
  databases. Primary use case is deploying databases via CI/CD pipelines.

  Includes:
  - SKILL.md with core workflows for provision, migrate, PR databases
  - references/db-config-schema.md with the full provisioning config JSON schema

