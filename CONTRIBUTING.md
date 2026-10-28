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
## Temporary light-only Storybook

Storybook's preview document sets `data-color-scheme="light"` on its root `<html>`
element through `storybook/.storybook/preview-head.html`, following the
[EDS colour scheme guidance](https://eds.equinor.com/docs/foundation/colour/getting_started/#colour-scheme-detection).
EDS v2 `variables.css` then skips its `prefers-color-scheme: dark` rule and keeps
EDS colour variables and native controls light, on initial load and when the
OS/browser preference changes. Only the preview is affected; the Storybook
manager UI is unchanged.

This is a temporary, Storybook-only precaution for
[equinor/fusion-core-tasks#2120](https://github.com/equinor/fusion-core-tasks/issues/2120).
The preview does not load EDS v2 CSS variables today, so there is no visible
change yet; the override guards against regressions once they are adopted. It is
not dark-mode support and does not change component or theme defaults. Remove the
override when Storybook supports automatic theming.

Run the regression checks from the `storybook` directory. They are intentionally
local-only and not part of CI, because the override is temporary and the preview
does not use EDS v2 variables yet:

```sh
pnpm test:setup # once, installs the Playwright Chromium shell
pnpm test
```

For manual verification, start Storybook, emulate `prefers-color-scheme: dark`
in the browser DevTools, and load a story and its Docs page. The preview root
must have `data-color-scheme="light"` and EDS colours must stay light. Switch the
preference live without reloading and check again.
