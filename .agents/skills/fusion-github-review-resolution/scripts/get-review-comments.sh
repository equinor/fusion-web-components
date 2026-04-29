#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  skills/.experimental/fusion-github-review-resolution/scripts/get-review-comments.sh \
    --owner <owner> --repo <repo> --pr <number> --review-id <number> [--include-resolved] [--include-outdated]

Description:
  Lists review-thread comments for a specific PR review id, including any sub-comments
  that are associated with that review id. Default output is unresolved + non-outdated
  threads only.
  Note: Uses GraphQL queries limited to the first 100 review threads and first 100
  comments per thread; results may be incomplete on very large pull requests.

Examples:
  skills/.experimental/fusion-github-review-resolution/scripts/get-review-comments.sh \
    --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674

  skills/.experimental/fusion-github-review-resolution/scripts/get-review-comments.sh \
    --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 --include-outdated
EOF
}

OWNER=""
REPO=""
PR_NUMBER=""
REVIEW_ID=""
INCLUDE_RESOLVED="false"
INCLUDE_OUTDATED="false"

require_command() {
  local name="$1"
  local hint="$2"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "ERROR: '$name' is required. $hint" >&2
    exit 1
  fi
}

require_arg() {
  local flag="$1"
  local value="$2"
  local hint="$3"
  if [[ -z "$value" || "$value" == -* ]]; then
    echo "ERROR: $flag requires $hint." >&2
    usage
    exit 1
  fi
}

validate_owner() {
  local value="$1"
  if ! [[ "$value" =~ ^[A-Za-z0-9]([A-Za-z0-9-]{0,37}[A-Za-z0-9])?$ ]]; then
    echo "ERROR: --owner must match GitHub owner naming rules (1-39 chars, alphanumeric or single hyphens, no leading/trailing hyphen)." >&2
    exit 1
  fi
  if [[ "$value" =~ -- ]]; then
    echo "ERROR: --owner cannot contain consecutive hyphens." >&2
    exit 1
  fi
}

validate_repo() {
  local value="$1"
  if ! [[ "$value" =~ ^[A-Za-z0-9._-]+$ ]]; then
    echo "ERROR: --repo must contain only letters, numbers, dots, underscores, or hyphens." >&2
    exit 1
  fi
  if (( ${#value} > 100 )); then
    echo "ERROR: --repo must be 100 characters or fewer." >&2
    exit 1
  fi
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --owner)
      require_arg "--owner" "${2:-}" "an owner value"
      OWNER="$2"
      shift 2
      ;;
    --repo)
      require_arg "--repo" "${2:-}" "a repository value"
      REPO="$2"
      shift 2
      ;;
    --pr)
      require_arg "--pr" "${2:-}" "a pull request number"
      PR_NUMBER="$2"
      shift 2
      ;;
    --review-id)
      require_arg "--review-id" "${2:-}" "a review id value"
      REVIEW_ID="$2"
      shift 2
      ;;
    --include-resolved)
      INCLUDE_RESOLVED="true"
      shift
      ;;
    --include-outdated)
      INCLUDE_OUTDATED="true"
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "ERROR: Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$OWNER" || -z "$REPO" || -z "$PR_NUMBER" || -z "$REVIEW_ID" ]]; then
  echo "ERROR: Missing required arguments." >&2
  usage
  exit 1
fi

validate_owner "$OWNER"
validate_repo "$REPO"

if ! [[ "$PR_NUMBER" =~ ^[1-9][0-9]*$ ]]; then
  echo "ERROR: --pr must be a positive integer." >&2
  exit 1
fi

if ! [[ "$REVIEW_ID" =~ ^[1-9][0-9]*$ ]]; then
  echo "ERROR: --review-id must be a positive integer." >&2
  exit 1
fi

require_command "gh" "Install GitHub CLI and authenticate with 'gh auth login'."
require_command "jq" "Install jq to parse JSON output."
if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: GitHub CLI is not authenticated. Run 'gh auth login'." >&2
  exit 1
fi

# shellcheck disable=SC2016
QUERY='query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){reviewThreads(first:100){nodes{id isResolved isOutdated path line comments(first:100){nodes{databaseId body url author{login}createdAt pullRequestReview{databaseId state author{login}}}}}}}}}'

# shellcheck disable=SC2209
JSON_OUTPUT="$({
  GH_PAGER=cat gh api graphql \
    -f "query=$QUERY" \
    -F "owner=$OWNER" \
    -F "repo=$REPO" \
    -F "number=$PR_NUMBER"
} )"

if [[ -z "$JSON_OUTPUT" ]]; then
  echo "ERROR: Empty response from GitHub API." >&2
  exit 1
fi

if printf '%s\n' "$JSON_OUTPUT" | jq -e '.errors | length > 0' >/dev/null 2>&1; then
  echo "ERROR: GitHub GraphQL errors: $(printf '%s\n' "$JSON_OUTPUT" | jq -c '.errors')" >&2
  exit 1
fi

if printf '%s\n' "$JSON_OUTPUT" | jq -e '.data == null' >/dev/null 2>&1; then
  echo "ERROR: GitHub GraphQL response missing data." >&2
  exit 1
fi

printf '%s\n' "$JSON_OUTPUT" | jq \
  --argjson reviewId "$REVIEW_ID" \
  --arg includeResolved "$INCLUDE_RESOLVED" \
  --arg includeOutdated "$INCLUDE_OUTDATED" '
    .data.repository.pullRequest.reviewThreads.nodes
    | map(
        . as $thread
        | {
            threadId: $thread.id,
            isResolved: $thread.isResolved,
            isOutdated: $thread.isOutdated,
            path: $thread.path,
            line: $thread.line,
            comments: (
              $thread.comments.nodes
              | map(select(.pullRequestReview.databaseId == $reviewId))
            )
          }
        | select(.comments | length > 0)
        | if $includeResolved == "true" then . else select(.isResolved == false) end
        | if $includeOutdated == "true" then . else select(.isOutdated == false) end
      )
    | if length == 0 then
        { summary: "No matching review comments found for the requested filters." }
      else
        {
          summary: ("Found " + (length|tostring) + " matching thread(s)."),
          threads: .
        }
      end
  '
