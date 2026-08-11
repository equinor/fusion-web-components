## Why

The skill `fusion-issue-author-user-story` has been deprecated upstream.
The recommended replacement is `fusion-issue-authoring`.

## Current behavior

The deprecated skill `fusion-issue-author-user-story` is still installed locally.

## New behavior

- Removes `fusion-issue-author-user-story` from installed skills
- Updates lock file to remove the entry
- Successor `fusion-issue-authoring` is already installed — no additional install needed

## References

- Workflow run: https://github.com/equinor/fusion-web-components/actions/runs/31493181918
- Successor skill: `fusion-issue-authoring`

## Reviewer focus

- Confirm `fusion-issue-author-user-story` is no longer referenced in project configuration
- Verify the successor `fusion-issue-authoring` skill files are correct
- Verify lock file updates reflect both the removal and addition
