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