#!/usr/bin/env bash

set -euo pipefail

ORG="${ORG:-equinor}"
REPO="${REPO:-fusion-web-components}"
WORKFLOW="${WORKFLOW:-.github/workflows/release.yml}"
ENVIRONMENT="${ENVIRONMENT:-}"
DRY_RUN="${DRY_RUN:-0}"
REPOSITORY="${REPOSITORY:-${ORG}/${REPO}}"

WORKFLOW_FILE="$(basename "$WORKFLOW")"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required but was not found in PATH." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found in PATH." >&2
  exit 1
fi

if ! npm help 2>/dev/null | grep -Eq '(^|[[:space:]])trust,'; then
  npm_version="$(npm --version 2>/dev/null || echo unknown)"
  echo "Your npm version (${npm_version}) does not support 'npm trust'." >&2
  echo "Install an npm version with trusted publishing CLI support, then re-run." >&2
  exit 1
fi

PACKAGES=()
package_lines="$(
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
)"

while IFS= read -r pkg; do
  [[ -n "$pkg" ]] && PACKAGES+=("$pkg")
done <<< "$package_lines"

if [[ ${#PACKAGES[@]} -eq 0 ]]; then
  echo "No non-private workspace packages found."
  exit 0
fi

echo "Found ${#PACKAGES[@]} package(s) to configure."

configured_count=0
skipped_count=0

for pkg in "${PACKAGES[@]}"; do
  echo "Configuring trusted publishing for ${pkg}..."

  cmd=(
    npm trust github
    "$pkg"
    --repo "$REPOSITORY"
    --file "$WORKFLOW_FILE"
    --yes
  )

  if [[ -n "$ENVIRONMENT" ]]; then
    cmd+=(--environment "$ENVIRONMENT")
  fi

  if [[ "$DRY_RUN" == "1" || "$DRY_RUN" == "true" ]]; then
    cmd+=(--dry-run)
  fi

  if output="$("${cmd[@]}" 2>&1)"; then
    printf '%s\n' "$output"
    configured_count=$((configured_count + 1))
  else
    exit_code=$?
    printf '%s\n' "$output" >&2

    if grep -Eq 'npm error code E404|404 Not Found .*?/trust' <<< "$output"; then
      echo "Skipping ${pkg}: package not found on npm (likely not published yet)." >&2
      skipped_count=$((skipped_count + 1))
      continue
    fi

    echo "Failed for ${pkg} (exit ${exit_code})." >&2
    exit "$exit_code"
  fi
done

echo "Done! Configured ${configured_count}, skipped ${skipped_count}."
echo "Use: npm trust list <pkg>"
