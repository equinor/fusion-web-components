## Why

The skill `fusion-framework-feature-toggling` has been deprecated upstream.
The recommended replacement is `fusion-app-react-dev`.

## Current behavior

The deprecated skill `fusion-framework-feature-toggling` is still installed locally.

## New behavior

- Removes `fusion-framework-feature-toggling` from installed skills
- Updates lock file to remove the entry
- Successor `fusion-app-react-dev` is already installed — no additional install needed

## References

- Workflow run: https://github.com/equinor/fusion-web-components/actions/runs/31491166744
- Successor skill: `fusion-app-react-dev`

## Reviewer focus

- Confirm `fusion-framework-feature-toggling` is no longer referenced in project configuration
- Verify the successor `fusion-app-react-dev` skill files are correct
- Verify lock file updates reflect both the removal and addition
