# Contributing

## Publishing a new npm package for the first time

Trusted publishing (OIDC) cannot publish a package that does not already exist on npm. For a brand-new package, an npm organization admin (or a user with publish rights) must publish it once from a local machine using user credentials.

After this one-time bootstrap publish, configure trusted publishing so future releases can run from GitHub Actions.

### 1 Publish once locally (user token/session)

Authenticate with npm using a user account that can publish the package, then publish from the monorepo:

```bash
pnpm --filter "@equinor/fusion-wc-<package>" publish --access public --no-git-checks
```

### 2 Configure OIDC trusted publishing for the new package

Direct command for a single package:

```bash
npm trust github @equinor/fusion-wc-<package> --repo equinor/fusion-web-components --file release.yml --yes
```

### 3 Verify trust for the new package

```bash
npm trust list @equinor/fusion-wc-<package>
```

Ensure the trust entry points to:

- repository: `equinor/fusion-web-components`
- workflow file: `.github/workflows/release.yml`

Once this is in place, subsequent releases for that package can use OIDC via CI.

## Colour schemes in Storybook

The Storybook preview loads `@equinor/eds-tokens/css/variables` and wraps every story in
`<fwc-theme>` without a `color-scheme` attribute, so stories inherit the document scheme and follow the browser's
`prefers-color-scheme` preference. Use EDS CSS custom properties (`var(--eds-color-…)`) for colours
in components; do not use the deprecated JavaScript `tokens` object from `@equinor/eds-tokens`
or `@equinor/fusion-web-theme` colour helpers, and do not hard-code colours.

To check a change in both schemes, start Storybook (`pnpm dev`), open a story and its Docs page,
and use the browser DevTools to emulate `prefers-color-scheme: light` and `dark`
(Chrome: **Rendering** > **Emulate CSS media feature prefers-color-scheme**). Switch the
preference without reloading; colours should update immediately.

### Preview dark mode packages locally

Use the dedicated Verdaccio registry at `http://127.0.0.1:4873/` and an authenticated, user-only
npm config at `$HOME/.config/fusion-dark-mode/npmrc`. The registry should allow authenticated reads and
provide the unchanged dependencies through its npm uplink. Do not commit the config or credentials.

#### Reuse the commit-qualified snapshot

The retained snapshot comes from `090f40d9` and is tagged `dark-mode-090f40d9`. Obtain the
trusted `web-090f40d9.json` manifest from whoever provisioned the local registry, and save it
outside the checkout. The `reuse` command installs all 24 exact versions in a disposable project.
It checks the tag, loopback tarball URLs, SHA-512 hashes, and that no transitive dependency
substitutes an older stable version. It does not publish or retag anything.

```sh
node scripts/dark-mode-preview.mjs reuse "$HOME/.config/fusion-dark-mode/web-090f40d9.json"
```

For a disposable consumer checkout, use the exact `version` from the manifest, not `releaseVersion`
or a stable range. For example:

```sh
npm install --save-exact @equinor/fusion-wc-theme@2.0.0-dark-mode-090f40d9 \
  --registry=http://127.0.0.1:4873/ --@equinor:registry=http://127.0.0.1:4873/ \
  --userconfig="$HOME/.config/fusion-dark-mode/npmrc"
```

#### Pack and publish stable release candidates locally

These commands are separate from snapshot reuse and do not produce commit-qualified versions.
Run from the web-components checkout. `pack` uses committed files from `HEAD` and works without
Verdaccio. It calculates the normal Changesets release versions in a disposable copy, then uses
pnpm to pack the versioned packages. Use a new output directory for each pack.

```sh
mkdir -p .tmp
node scripts/dark-mode-preview.mjs pack .tmp/dark-mode-preview
node scripts/dark-mode-preview.mjs publish .tmp/dark-mode-preview
```

`publish` writes only to the loopback registry and only under the `dark-mode` tag, never `latest`.
It refuses to overwrite a different artifact at the same version. Keep the original tarballs to retry
a partial publish. The command smoke-installs all published versions into a disposable project and
prints the exact package names, versions and integrity hashes.

Keep any resulting manifest or lockfile changes local. CI and normal releases do not use Verdaccio.
