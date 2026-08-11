## Why

The skill `fusion-skill-self-report-bug` has been deprecated upstream.
The recommended replacement is `fusion-skills`.

## Current behavior

The deprecated skill `fusion-skill-self-report-bug` is still installed locally.

## New behavior

- Removes `fusion-skill-self-report-bug` from installed skills
- Updates lock file to remove the entry
- Successor `fusion-skills` is already installed — no additional install needed

## References

- Workflow run: https://github.com/equinor/fusion-web-components/actions/runs/31485067853
- Successor skill: `fusion-skills`

## Reviewer focus

- Confirm `fusion-skill-self-report-bug` is no longer referenced in project configuration
- Verify the successor `fusion-skills` skill files are correct
- Verify lock file updates reflect both the removal and addition
