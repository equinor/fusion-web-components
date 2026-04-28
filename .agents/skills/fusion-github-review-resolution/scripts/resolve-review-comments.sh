#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh \
    --owner <owner> --repo <repo> --pr <number> --review-id <number> \
    [--message <text> | --message-file <path>] [--apply] [--include-resolved] [--include-outdated] \
    [--allow-additional-reply]

Description:
  Resolves matching review threads for a given pull request review id.
  Note: Uses GraphQL queries limited to the first 100 review threads and first 100
  comments per thread; results may be incomplete on very large pull requests.

Safety:
  - Default mode is dry-run and performs no GitHub mutations.
  - --apply is required to post replies and resolve threads.
  - --message or --message-file is required with --apply.
  - By default the script fails closed when the authenticated user already replied on a target thread.
    Use --allow-additional-reply only after manual inspection.

Examples:
  Dry-run:
    skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh \
      --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 --include-resolved

  Apply:
    skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh \
      --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 \
      --apply --message "Addressed in <commit>: <what changed>."
EOF
}

OWNER=""
REPO=""
PR_NUMBER=""
REVIEW_ID=""
MESSAGE=""
APPLY="false"
INCLUDE_RESOLVED="false"
INCLUDE_OUTDATED="false"
MESSAGE_FROM_INLINE="false"
MESSAGE_FROM_FILE="false"
ALLOW_ADDITIONAL_REPLY="false"
VIEWER_LOGIN=""

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
    --message)
      require_arg "--message" "${2:-}" "a message value"
      MESSAGE="$2"
      MESSAGE_FROM_INLINE="true"
      shift 2
      ;;
    --message-file)
      require_arg "--message-file" "${2:-}" "a path argument"
      MESSAGE_FILE="$2"
      if [[ ! -r "$MESSAGE_FILE" ]]; then
        echo "ERROR: Message file '$MESSAGE_FILE' does not exist or is not readable" >&2
        exit 1
      fi
      MESSAGE="$(cat "$MESSAGE_FILE")"
      MESSAGE_FROM_FILE="true"
      shift 2
      ;;
    --apply)
      APPLY="true"
      shift
      ;;
    --include-resolved)
      INCLUDE_RESOLVED="true"
      shift
      ;;
    --include-outdated)
      INCLUDE_OUTDATED="true"
      shift
      ;;
    --allow-additional-reply)
      ALLOW_ADDITIONAL_REPLY="true"
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

if [[ "$MESSAGE_FROM_INLINE" == "true" && "$MESSAGE_FROM_FILE" == "true" ]]; then
  echo "ERROR: Use only one of --message or --message-file." >&2
  exit 1
fi

if [[ "$APPLY" == "true" && ! "$MESSAGE" =~ [^[:space:]] ]]; then
  echo "ERROR: --message or --message-file is required when --apply is set." >&2
  exit 1
fi

require_command "gh" "Install GitHub CLI and authenticate with 'gh auth login'."
require_command "jq" "Install jq to parse JSON output."
if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: GitHub CLI is not authenticated. Run 'gh auth login'." >&2
  exit 1
fi

export GH_PAGER=cat

VIEWER_LOGIN="$(gh api user --jq '.login')"
if [[ -z "$VIEWER_LOGIN" ]]; then
  echo "ERROR: Failed to determine the authenticated GitHub user." >&2
  exit 1
fi

# shellcheck disable=SC2016
QUERY='query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){reviewThreads(first:100){nodes{id isResolved isOutdated path line comments(first:100){nodes{databaseId url body author{login} pullRequestReview{databaseId}}}}}}}}'

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

TARGETS_JSON="$(printf '%s\n' "$JSON_OUTPUT" | jq -c \
  --argjson reviewId "$REVIEW_ID" \
  --arg includeResolved "$INCLUDE_RESOLVED" \
  --arg includeOutdated "$INCLUDE_OUTDATED" \
  --arg viewerLogin "$VIEWER_LOGIN" \
  --arg message "$MESSAGE" '
    .data.repository.pullRequest.reviewThreads.nodes
    | map(
        . as $thread
        | {
            threadId: $thread.id,
            isResolved: $thread.isResolved,
            isOutdated: $thread.isOutdated,
            path: ($thread.path // "<unknown>"),
            line: $thread.line,
            commentIds: ($thread.comments.nodes | map(.databaseId)),
            matchingReviewCommentIds: (
              $thread.comments.nodes
              | map(select(.pullRequestReview.databaseId == $reviewId) | .databaseId)
            ),
            viewerReplyIds: (
              $thread.comments.nodes
              | map(
                  select(
                    (.author.login // "") == $viewerLogin
                    and ((.pullRequestReview.databaseId // 0) != $reviewId)
                  )
                  | .databaseId
                )
            ),
            hasMatchingViewerReply: (
              $thread.comments.nodes
              | map(
                  select(
                    (.author.login // "") == $viewerLogin
                    and ((.pullRequestReview.databaseId // 0) != $reviewId)
                    and ((.body // "") == $message)
                  )
                )
              | length > 0
            )
          }
        | select(.matchingReviewCommentIds | length > 0)
        | if $includeResolved == "true" then . else select(.isResolved == false) end
        | if $includeOutdated == "true" then . else select(.isOutdated == false) end
      )
  ')"

TARGET_COUNT="$(printf '%s\n' "$TARGETS_JSON" | jq 'length')"
if [[ "$TARGET_COUNT" == "0" ]]; then
  echo "No matching review threads found for review $REVIEW_ID with current filters."
  exit 0
fi

echo "Found $TARGET_COUNT matching thread(s):"
printf '%s\n' "$TARGETS_JSON" | jq -r '
  to_entries[]
  | "\(.key + 1). \(.value.threadId) \(.value.path)\(if .value.line then ":\(.value.line)" else "" end) comments=\(.value.matchingReviewCommentIds | map(tostring) | join(",")) viewerReplies=\(.value.viewerReplyIds | length)\(if .value.hasMatchingViewerReply then " [matching-reply]" else "" end)\(if .value.isResolved then " [resolved]" else "" end)\(if .value.isOutdated then " [outdated]" else "" end)"
'

if [[ "$APPLY" != "true" ]]; then
  echo "Dry-run only. Re-run with --apply to post replies and resolve threads."
  exit 0
fi

while IFS= read -r row; do
  THREAD_ID="$(printf '%s\n' "$row" | jq -r '.threadId')"
  IS_RESOLVED="$(printf '%s\n' "$row" | jq -r '.isResolved')"
  VIEWER_REPLY_COUNT="$(printf '%s\n' "$row" | jq -r '.viewerReplyIds | length')"
  HAS_MATCHING_VIEWER_REPLY="$(printf '%s\n' "$row" | jq -r '.hasMatchingViewerReply')"

  if [[ "$IS_RESOLVED" == "true" ]]; then
    echo "Thread $THREAD_ID is already resolved; skipping reply and resolve mutations."
    continue
  fi

  # Guard against duplicate thread replies on retries. If the authenticated user already
  # replied, fail closed unless the exact message is already present or the operator opts in.
  if [[ "$HAS_MATCHING_VIEWER_REPLY" == "true" ]]; then
    echo "Skipping reply for thread $THREAD_ID; identical reply already exists from $VIEWER_LOGIN."
  elif [[ "$VIEWER_REPLY_COUNT" != "0" && "$ALLOW_ADDITIONAL_REPLY" != "true" ]]; then
    echo "ERROR: Thread $THREAD_ID already has $VIEWER_REPLY_COUNT reply/replies from $VIEWER_LOGIN. Re-run with --allow-additional-reply only after manual inspection." >&2
    exit 1
  else
    # Use the thread-scoped GraphQL mutation so replies stay attached to the review thread.
    # shellcheck disable=SC2209,SC2016
    ADD_REPLY_OUTPUT="$({
      GH_PAGER=cat gh api graphql \
        -f 'query=mutation($threadId:ID!,$body:String!){addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$threadId,body:$body}){comment{url}}}' \
        -F "threadId=$THREAD_ID" \
        -f "body=$MESSAGE"
    } )"

    if [[ -z "$ADD_REPLY_OUTPUT" ]]; then
      echo "ERROR: Empty reply mutation response for thread $THREAD_ID." >&2
      exit 1
    fi

    if printf '%s\n' "$ADD_REPLY_OUTPUT" | jq -e '.errors | length > 0' >/dev/null 2>&1; then
      echo "ERROR: Reply mutation errors for thread $THREAD_ID: $(printf '%s\n' "$ADD_REPLY_OUTPUT" | jq -c '.errors')" >&2
      exit 1
    fi

    REPLY_URL="$(printf '%s\n' "$ADD_REPLY_OUTPUT" | jq -r '.data.addPullRequestReviewThreadReply.comment.url // empty')"
    if [[ -z "$REPLY_URL" ]]; then
      echo "ERROR: Reply mutation for thread $THREAD_ID did not return a comment URL." >&2
      exit 1
    fi

    echo "Posted reply for thread $THREAD_ID: $REPLY_URL"
  fi

# shellcheck disable=SC2209,SC2016
  MUTATION_OUTPUT="$({
    GH_PAGER=cat gh api graphql \
      -f 'query=mutation($threadId:ID!){resolveReviewThread(input:{threadId:$threadId}){thread{id isResolved}}}' \
      -F "threadId=$THREAD_ID"
  } )"

  if [[ -z "$MUTATION_OUTPUT" ]]; then
    echo "ERROR: Empty mutation response for thread $THREAD_ID." >&2
    exit 1
  fi

  if printf '%s\n' "$MUTATION_OUTPUT" | jq -e '.errors | length > 0' >/dev/null 2>&1; then
    echo "ERROR: GraphQL mutation errors for thread $THREAD_ID: $(printf '%s\n' "$MUTATION_OUTPUT" | jq -c '.errors')" >&2
    exit 1
  fi

  if ! printf '%s\n' "$MUTATION_OUTPUT" | jq -e '.data.resolveReviewThread.thread.isResolved == true' >/dev/null 2>&1; then
    echo "ERROR: Thread $THREAD_ID was not resolved." >&2
    exit 1
  fi

  echo "Resolved thread $THREAD_ID."
done < <(printf '%s\n' "$TARGETS_JSON" | jq -c '.[]')

echo "Completed: processed $TARGET_COUNT matching thread(s)."
