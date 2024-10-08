#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollup_1 = require("rollup");
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
var plugin_json_1 = __importDefault(require("@rollup/plugin-json"));
var plugin_terser_1 = __importDefault(require("@rollup/plugin-terser"));
var lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// import filesize from 'filesize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
var pkg = require("".concat(process.cwd(), "/package.json"));
var outputOptions = {
    name: (0, lodash_camelcase_1.default)(pkg.name),
    format: 'esm',
    dir: 'dist',
    plugins: [(0, plugin_terser_1.default)({ module: true })],
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var bundle, output, _i, output_1, _a, fileName, type, size;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, rollup_1.rollup)({
                    input: pkg.main,
                    plugins: [(0, plugin_node_resolve_1.default)(), (0, plugin_commonjs_1.default)(), (0, plugin_json_1.default)()],
                })];
            case 1:
                bundle = _b.sent();
                return [4 /*yield*/, bundle.write({
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
                    })];
            case 2:
                output = (_b.sent()).output;
                for (_i = 0, output_1 = output; _i < output_1.length; _i++) {
                    _a = output_1[_i], fileName = _a.fileName, type = _a.type;
                    size = fs_1.default.statSync(path_1.default.join(outputOptions.dir, fileName)).size;
                    console.log("[".concat(type, "]"), fileName, size);
                }
                return [2 /*return*/];
        }
    });
}); })();
