# APM setup example

User: "Set up APM sync for this repo."
Agent: finds no workflow with APM update purpose; confirms committed `apm.yml`/lockfile;
detects consumer visibility and internal `equinor/fusion-skills` dependencies. Internal
`equinor` repo: fills reusable caller template with `apmTokenSecret`. Public repo: fills
standalone template with `dependencyTokenSecret`. Both name `APM_FUSION_SKILLS_TOKEN`;
parses and lints candidate. Shows diff; waits for approval.
Avoid: relying on `github.token` for internal dependencies, calling the internal reusable
workflow from a public repo, or reporting setup done after filling only.
