#!/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/* Types for dependencies object */
interface Deps {
  [key: string]: Record<string, string> | Record<string, Record<string, boolean>>;
}

/**
 * The dependencies to add to package.json
 */
const addDependencies: Deps = {
  devDependencies: {
    '@types/react': '^17.0.11',
  },
  peerDependencies: {
    '@types/react': '^16.9.0 || ^17.0.0 || ^18.0.0',
  },
  peerDependenciesMeta: {
    '@types/react': {
      optional: true,
    },
  },
};

/**
 * Update package dependency in monorepo.
 */
const set_types_dependencies = async () => {
  /* Process folders in ./packages */
  try {
    const content = await readdir('./packages', { encoding: 'utf8', withFileTypes: true });
    /* Process folders in packages */
    for (const entry of content) {
      if (entry.isDirectory()) {
        const pkgPath = join('./packages/', entry.name, '/package.json');
        /* Process package.json file */
        try {
          const pkgString = await readFile(pkgPath, 'utf8');
          const pkg = JSON.parse(pkgString);
          console.log('Adding dependencies to', pkg.name);
          let changed = false;
          Object.keys(addDependencies).forEach((dep: string) => {
            /* skip iteration if dependency exist */
            if (dep in pkg && '@types/react' in pkg[dep]) {
              return;
            }
            changed = true;
            /* merge dependenecy property */
            pkg[dep] = pkg[dep] ? Object.assign(pkg[dep], addDependencies[dep]) : addDependencies[dep];
          });
          /* Write to package.json only if any changes  */
          if (changed) {
            try {
              await writeFile(pkgPath, JSON.stringify(pkg, null, '  '));
              console.log('Updated', pkgPath);
            } catch {
              console.log('Could not write to', pkgPath);
            }
          } else {
            console.log('Package already has dependencies');
          }
        } catch {
          console.log('Could not read', pkgPath);
        }
        console.log();
      }
    }
  } catch (e) {
    console.log('Could not process package directories');
  }
};

/* Execute */
set_types_dependencies();
