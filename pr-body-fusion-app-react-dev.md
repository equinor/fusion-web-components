## Why

The skill `fusion-app-react-dev` has been deprecated upstream.
The recommended replacement is `fusion-developer-app`.

## Current behavior

The deprecated skill `fusion-app-react-dev` is still installed locally.

## New behavior

- Removes `fusion-app-react-dev` from installed skills
- Updates lock file to remove the entry
- **Installs successor** `fusion-developer-app` as a direct replacement
- Updates lock file with the new skill entry

## References

- Workflow run: https://github.com/equinor/fusion-web-components/actions/runs/31491166744
- Successor skill: `fusion-developer-app`

## Reviewer focus

- Confirm `fusion-app-react-dev` is no longer referenced in project configuration
- Verify the successor `fusion-developer-app` skill files are correct
- Verify lock file updates reflect both the removal and addition
