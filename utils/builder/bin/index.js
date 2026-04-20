#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_json_1 = __importDefault(require("@rollup/plugin-json"));
const plugin_terser_1 = __importDefault(require("@rollup/plugin-terser"));
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const pkg = require(`${process.cwd()}/package.json`);
const outputOptions = {
    name: (0, lodash_camelcase_1.default)(pkg.name),
    format: 'esm',
    dir: 'dist',
    plugins: [(0, plugin_terser_1.default)({ module: true })],
};
(async () => {
    const bundle = await (0, rollup_1.rollup)({
        input: pkg.main,
        plugins: [(0, plugin_node_resolve_1.default)(), (0, plugin_commonjs_1.default)(), (0, plugin_json_1.default)()],
    });
    const { output } = await bundle.write({
        name: (0, lodash_camelcase_1.default)(pkg.name),
        format: 'esm',
        dir: 'dist',
        plugins: [
            (0, plugin_terser_1.default)({
                module: true,
                format: {
                    comments: false,
                },
            }),
        ],
    });
    for (const { fileName, type } of output) {
        const { size } = node_fs_1.default.statSync(node_path_1.default.join(outputOptions.dir, fileName));
        console.log(`[${type}]`, fileName, size);
    }
})();
