#!/usr/bin/env bash

set -euo pipefail

ORG="${ORG:-equinor}"
REPO="${REPO:-fusion-web-components}"
WORKFLOW="${WORKFLOW:-.github/workflows/release.yml}"
ENVIRONMENT="${ENVIRONMENT:-}"
DRY_RUN="${DRY_RUN:-0}"
REPOSITORY="${REPOSITORY:-${ORG}/${REPO}}"
WORKFLOW_FILE="$(basename "$WORKFLOW")"

is_true() {
  case "${1:-}" in
    1|true|TRUE|yes|YES|y|Y) return 0 ;;
    *) return 1 ;;
  esac
}

collect_workspace_packages() {
  pnpm -r list --depth -1 --json | node -e '
    const fs = require("node:fs");
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) process.exit(0);

    const data = JSON.parse(input);
    const records = Array.isArray(data)
      ? data
      : Array.isArray(data?.packages)
        ? data.packages
        : Array.isArray(data?.projects)
          ? data.projects
          : (data && typeof data === "object")
            ? Object.values(data)
            : [];

    for (const pkg of records) {
      if (pkg?.name && pkg.private !== true) {
        console.log(pkg.name);
      }
    }
  '
}

is_published() {
  local pkg="$1"
  npm view "$pkg" version >/dev/null 2>&1
}

trust_matches_target() {
  local trust_list_output="$1"
  grep -Eq '^type:\s*github$' <<< "$trust_list_output" \
    && grep -Eq "^file:\s*${WORKFLOW_FILE}$" <<< "$trust_list_output" \
    && grep -Eq "^repository:\s*${REPOSITORY}$" <<< "$trust_list_output"
}

add_trust() {
  local pkg="$1"
  local cmd=(npm trust github "$pkg" --repo "$REPOSITORY" --file "$WORKFLOW_FILE" --yes)

  if [[ -n "$ENVIRONMENT" ]]; then
    cmd+=(--environment "$ENVIRONMENT")
  fi

  if is_true "$DRY_RUN"; then
    cmd+=(--dry-run)
  fi

  "${cmd[@]}" 2>&1
}

echo "Starting npm trusted publishing setup..."
echo "Repository: ${REPOSITORY}"
echo "Workflow file: ${WORKFLOW_FILE}"
echo "Dry run: ${DRY_RUN}"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required but was not found in PATH." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found in PATH." >&2
  exit 1
fi

if ! npm trust -h >/dev/null 2>&1; then
  npm_version="$(npm --version 2>/dev/null || echo unknown)"
  echo "Your npm version (${npm_version}) does not support 'npm trust'." >&2
  exit 1
fi

PACKAGES=()
while IFS= read -r pkg; do
  [[ -n "$pkg" ]] && PACKAGES+=("$pkg")
done < <(collect_workspace_packages)

if [[ ${#PACKAGES[@]} -eq 0 ]]; then
  echo "No non-private workspace packages found."
  exit 0
fi

echo "Found ${#PACKAGES[@]} package(s) to process."

configured_count=0
already_count=0
skipped_unpublished_count=0
skipped_unpublished=()
skipped_unpublished_before_trust_count=0

for pkg in "${PACKAGES[@]}"; do
  echo
  echo "[${pkg}]"

  if ! is_published "$pkg"; then
    echo "not published, skip."
    skipped_unpublished_before_trust_count=$((skipped_unpublished_before_trust_count + 1))
    skipped_unpublished+=("$pkg")
    continue
  fi

  trust_list_cmd=(npm trust list "$pkg")

  while true; do
    set +e
    trust_list_output="$(${trust_list_cmd[@]} 2>&1)"
    trust_list_exit=$?
    set -e

    if (( trust_list_exit == 0 )); then
      break
    fi

    if grep -Eqi 'npm error code EOTP|\bEOTP\b' <<< "$trust_list_output"; then
      echo "npm returned EOTP for trust lookup."
      echo "Run this command locally and approve token access for 5 minutes:"
      echo "  ${trust_list_cmd[*]}"
      read -r -p "Press Enter to retry after approval (or Ctrl+C to abort)... "
      continue
    fi

    break
  done

  if (( trust_list_exit != 0 )); then
    if grep -Eqi 'npm error code E404|404 Not Found' <<< "$trust_list_output"; then
      echo "published check passed but trust list returned 404, skip."
      skipped_unpublished_count=$((skipped_unpublished_count + 1))
      skipped_unpublished+=("$pkg")
      continue
    fi

    printf '%s\n' "$trust_list_output" >&2
    exit "$trust_list_exit"
  fi

  if trust_matches_target "$trust_list_output"; then
    echo "already trusted, skip."
    already_count=$((already_count + 1))
    continue
  fi

  echo "missing trust entry, adding..."

  set +e
  add_output="$(add_trust "$pkg")"
  add_exit=$?
  set -e

  if (( add_exit == 0 )); then
    echo "trust added."
    configured_count=$((configured_count + 1))
    continue
  fi

  if grep -Eqi 'npm error code E409|409 Conflict' <<< "$add_output"; then
    echo "already trusted (E409), skip."
    already_count=$((already_count + 1))
    continue
  fi

  if grep -Eqi 'npm error code E404|404 Not Found' <<< "$add_output"; then
    echo "not published, skip."
    skipped_unpublished_count=$((skipped_unpublished_count + 1))
    skipped_unpublished+=("$pkg")
    continue
  fi

  printf '%s\n' "$add_output" >&2
  exit "$add_exit"
done

echo
echo "Done. configured=${configured_count}, already=${already_count}, skipped-unpublished=$((skipped_unpublished_count + skipped_unpublished_before_trust_count))"
if [[ ${#skipped_unpublished[@]} -gt 0 ]]; then
  echo "Unpublished/skipped:"
  for pkg in "${skipped_unpublished[@]}"; do
    echo "- ${pkg}"
  done
fi
