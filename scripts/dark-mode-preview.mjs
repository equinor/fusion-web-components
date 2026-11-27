import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const registry = 'http://127.0.0.1:4873/';
const tag = 'dark-mode';
const userconfig = join(homedir(), '.config/fusion-dark-mode/npmrc');
const repo = fileURLToPath(new URL('../', import.meta.url));
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const packageName = /^@equinor\/fusion-(wc-[a-z-]+|web-components)$/;
const stableVersion = /^\d+\.\d+\.\d+$/;

function run(command, args, cwd, capture = false) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', capture ? 'pipe' : 'inherit', 'inherit'],
  });
}

function npm(args, cwd, capture = false) {
  return run(
    'npm',
    [
      ...args,
      `--registry=${registry}`,
      `--@equinor:registry=${registry}`,
      `--userconfig=${userconfig}`,
      `--cache=${join(cwd, '.npm-cache')}`,
      '--noproxy=127.0.0.1',
      '--ignore-scripts',
      '--offline=false',
      '--prefer-online',
      '--fetch-retries=0',
    ],
    cwd,
    capture,
  );
}

function pack(output, stage) {
  const archive = join(stage, 'source.tar');
  run('git', ['archive', '--output', archive, 'HEAD'], repo);
  run('tar', ['-xf', archive], stage);
  run('pnpm', ['install', '--frozen-lockfile'], stage);
  const inventory = () =>
    JSON.parse(run('pnpm', ['-r', 'list', '--depth', '-1', '--json'], stage, true));
  const versions = new Map(inventory().map(({ name, version }) => [name, version]));
  const configPath = join(stage, '.changeset/config.json');
  // Only release versions are needed; skip GitHub lookups for changelog entries.
  writeFileSync(
    configPath,
    JSON.stringify({ ...readJson(configPath), changelog: false, commit: false }),
  );
  run('pnpm', ['exec', 'changeset', 'version'], stage);
  const releases = inventory().filter(
    (pkg) => !pkg.private && versions.get(pkg.name) !== pkg.version,
  );
  if (!releases.length) throw new Error('No publishable Changesets releases found.');
  run('pnpm', ['build'], stage);
  for (const { path } of releases) {
    run('pnpm', ['pack', '--pack-destination', output], path);
  }
}

function artifact(file) {
  const manifest = JSON.parse(run('tar', ['-xOzf', file, 'package/package.json'], tmpdir(), true));
  const { name, version, publishConfig = {} } = manifest;
  if (
    manifest.private ||
    !packageName.test(name) ||
    !stableVersion.test(version) ||
    Object.keys(publishConfig).some((key) => key !== 'access')
  ) {
    throw new Error(`Unexpected preview manifest: ${name}@${version}`);
  }
  for (const field of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ]) {
    for (const [dependency, spec] of Object.entries(manifest[field] ?? {})) {
      if (/^(workspace:|file:|link:)/.test(spec)) {
        throw new Error(`${name}: ${dependency} has an unpacked dependency spec (${spec}).`);
      }
    }
  }
  const integrity = `sha512-${createHash('sha512').update(readFileSync(file)).digest('base64')}`;
  return { file, name, spec: `${name}@${version}`, version, integrity };
}

function metadata(pkg, cwd) {
  try {
    return JSON.parse(npm(['view', `${pkg.name}@*`, 'versions', 'dist-tags', '--json'], cwd, true));
  } catch (error) {
    if (error.stdout && JSON.parse(error.stdout).error?.code === 'E404') return {};
    throw error;
  }
}

function verify(pkg, data, cwd, expectedTag = tag) {
  const dist = JSON.parse(npm(['view', pkg.spec, 'dist', '--json'], cwd, true));
  if (
    dist.integrity !== pkg.integrity ||
    !dist.tarball?.startsWith(registry) ||
    data['dist-tags']?.[expectedTag] !== pkg.version
  ) {
    throw new Error(
      `${pkg.spec} conflicts with an existing registry entry or is not tagged ${expectedTag}.`,
    );
  }
}

function publish(output, stage) {
  const packages = readdirSync(output)
    .filter((file) => file.endsWith('.tgz'))
    .sort()
    .map((file) => artifact(join(output, file)));
  if (!packages.length || new Set(packages.map((pkg) => pkg.name)).size !== packages.length) {
    throw new Error('Expected exactly one tarball per package in the output directory.');
  }
  // Detect collisions across the batch before publishing anything.
  const before = new Map();
  for (const pkg of packages) {
    const data = metadata(pkg, stage);
    before.set(pkg.name, data);
    if (data.versions?.includes(pkg.version)) {
      verify(pkg, data, stage);
    } else if (data['dist-tags']?.[tag]) {
      throw new Error(`${pkg.name} already has a ${tag} tag for a different version.`);
    }
  }
  for (const pkg of packages) {
    const previous = before.get(pkg.name);
    if (!previous.versions?.includes(pkg.version)) {
      npm(['publish', pkg.file, `--tag=${tag}`, '--provenance=false'], stage);
    }
    const data = metadata(pkg, stage);
    verify(pkg, data, stage);
    if (data['dist-tags']?.latest !== previous['dist-tags']?.latest) {
      throw new Error(`The latest tag changed unexpectedly for ${pkg.name}.`);
    }
  }

  smokeInstall(packages, stage);
}

function reuse(manifest, stage) {
  const { repository, commit, tag: snapshotTag, packages } = readJson(manifest);
  if (
    repository !== 'equinor/fusion-web-components' ||
    typeof commit !== 'string' ||
    !/^[0-9a-f]{40}$/.test(commit) ||
    snapshotTag !== `dark-mode-${commit.slice(0, 8)}` ||
    !packages ||
    !Object.keys(packages).length
  ) {
    throw new Error('Expected a commit-qualified web-components preview manifest.');
  }
  const releases = Object.entries(packages).map(
    ([name, { version, releaseVersion, integrity }]) => {
      if (
        !packageName.test(name) ||
        typeof releaseVersion !== 'string' ||
        !stableVersion.test(releaseVersion) ||
        version !== `${releaseVersion}-${snapshotTag}` ||
        typeof integrity !== 'string' ||
        !/^sha512-[A-Za-z0-9+/]{86}==$/.test(integrity)
      ) {
        throw new Error(`Invalid snapshot manifest entry: ${name}`);
      }
      return { name, version, spec: `${name}@${version}`, integrity };
    },
  );
  for (const pkg of releases) {
    verify(pkg, metadata(pkg, stage), stage, snapshotTag);
  }
  smokeInstall(releases, stage, true);
}

function smokeInstall(packages, stage, requireExactTransitive = false) {
  writeFileSync(join(stage, 'package.json'), '{"private":true,"name":"fusion-dark-mode-smoke"}\n');
  npm(
    [
      'install',
      '--save-exact',
      '--package-lock',
      '--no-audit',
      '--no-fund',
      ...packages.map(({ spec }) => spec),
    ],
    stage,
  );
  const lock = readJson(join(stage, 'package-lock.json'));
  const verifyEntry = (pkg, entry) => {
    if (
      entry?.version !== pkg.version ||
      entry.integrity !== pkg.integrity ||
      !entry.resolved?.startsWith(registry)
    ) {
      throw new Error(`Smoke install did not resolve ${pkg.spec} from the local registry.`);
    }
  };
  // A nested stable copy would invalidate snapshot testing even if the top-level install is correct.
  if (requireExactTransitive) {
    const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));
    for (const [path, entry] of Object.entries(lock.packages)) {
      const pkg = byName.get(path.split('node_modules/').at(-1));
      if (pkg) verifyEntry(pkg, entry);
    }
  }
  for (const pkg of packages) {
    verifyEntry(pkg, lock.packages[`node_modules/${pkg.name}`]);
    console.log(`${pkg.spec} ${pkg.integrity}`);
  }
}

const [action, input] = process.argv.slice(2);
if (!input || !['pack', 'publish', 'reuse'].includes(action)) {
  throw new Error(
    'Usage: node scripts/dark-mode-preview.mjs <pack|publish|reuse> <tarball-directory-or-manifest>',
  );
}
if (action !== 'pack' && !existsSync(userconfig)) {
  throw new Error(`Set up the dedicated Verdaccio npm config at ${userconfig} first.`);
}
const path = resolve(input);
const stage = mkdtempSync(join(tmpdir(), 'fusion-wc-preview-'));
try {
  if (action === 'pack') {
    mkdirSync(path);
    pack(path, stage);
  } else if (action === 'reuse') {
    reuse(path, stage);
  } else {
    publish(path, stage);
  }
} finally {
  rmSync(stage, { recursive: true });
}
