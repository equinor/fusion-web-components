#!/usr/bin/env node

import { rollup } from 'rollup';

import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import terser from '@rollup/plugin-terser';

import camelCase from 'lodash.camelcase';
import path from 'path';
import fs from 'fs';
// import filesize from 'filesize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(`${process.cwd()}/package.json`);

const outputOptions = {
  name: camelCase(pkg.name),
  format: 'esm',
  dir: 'dist',
  plugins: [terser({ module: true })],
};

(async () => {
  const bundle = await rollup({
    input: pkg.main,
    plugins: [resolve(), commonJs(), json()],
  });

  // @ts-ignore
  const { output } = await bundle.write({
    name: camelCase(pkg.name),
    format: 'esm',
    dir: 'dist',
    plugins: [
      terser({
        module: true,
        format: {
          comments: false,
        },
      }),
    ],
  });

  for (const { fileName, type } of output) {
    const { size } = fs.statSync(path.join(outputOptions.dir, fileName));
    console.log(`[${type}]`, fileName, size);
  }
})();
