# Batch Strategy

Guidance for orchestrating documentation passes across multiple packages. Covers token budget estimation, batch sizing, context isolation, and failure handling.

## Token budget estimation

Estimate the token cost for each package before processing:

| Component | Estimate | Notes |
|---|---|---|
| Reading source files | ~100 tokens/file | Scanning for exports, understanding implementation |
| Reading existing docs | ~50 tokens/file | Existing TSDoc and README content |
| Generating TSDoc | ~200 tokens/export | Summary + tags + example for each export |
| Generating README | ~500 tokens/package | Full README rewrite |
| Review council | ~300 tokens/package | Evaluation across four criteria |

**Package cost formula:**
```
cost ≈ (source_files × 100) + (existing_doc_files × 50) + (exports × 200) + 500 + 300
```

## Batch sizing

Default batch size: **5 packages**

Adjust based on:
- **Smaller packages** (< 10 source files): increase batch size to 8-10
- **Larger packages** (> 50 source files): decrease batch size to 2-3
- **Mixed sizes**: group similarly-sized packages together

### Ordering strategy

Process batches in this order:
1. **Smallest packages first** — build momentum, catch tooling issues early
2. **Related packages together** — packages that share types or re-export from each other benefit from being processed in sequence
3. **Largest packages last** — these may need special handling

## Context isolation

Each package must be processed with a clean working context:

### Carry across packages (shared context)
- Repository-level standards (discovered once in Step 1)
- Execution plan and progress tracker
- Commit format and branch conventions

### Do NOT carry across packages (isolated per package)
- TSDoc patterns and examples — each package has its own API semantics
- README content and structure decisions
- Export inventories and implementation details
- Review council findings

### Why isolation matters
- Prevents "pattern bleed" where TSDoc from a utility package leaks into a domain package
- Each package's documentation should stand alone
- Reduces the risk of hallucinated cross-references between unrelated packages

## Oversized package handling

When a single package exceeds 60% of the estimated context window:

1. **Split by API surface priority:**
   - Pass 1: Barrel exports and direct re-exports
   - Pass 2: Internally-consumed-but-exported items
   - Pass 3: README generation (after all TSDoc is done)

2. **Split by directory** (for very large packages):
   - Process each source directory as a sub-batch
   - Generate the README after all directories are processed

3. **Flag for manual review** if the package cannot be split cleanly

## Failure handling

| Scenario | Action |
|---|---|
| Documenter fails on a single file | Skip the file, continue with the package, note in report |
| Review council fails a package (1st time) | Return to documenter with specific fixes |
| Review council fails a package (2nd time) | Flag for manual review, move to next package |
| Entire batch fails | Stop, report the failure, do not continue to next batch |
| Token budget exceeded mid-package | Commit completed work, flag remainder for next batch |

## Progress tracking

Maintain a status file at `.tmp/scribe-progress-<context>.md`:

```markdown
## Progress

| Package | Status | Exports | TSDoc | README | Review |
|---|---|---|---|---|---|
| @scope/pkg-a | ✅ passed | 12 | 12/12 | ✅ | 4/4 |
| @scope/pkg-b | 🔄 review | 8 | 8/8 | ✅ | 2/4 |
| @scope/pkg-c | ⏳ pending | — | — | — | — |
```
