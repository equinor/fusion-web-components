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
