"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    /** Module entry */
    entry: 'modules',
    /** Project name */
    project: 'ETL',
    /** Specific module: Without this parameter, the entire project is recursed by default. */
    modules: 'accessManage',
    /** The prettier formatting code is used */
    prettier: {},
    /** The common language package path */
    globalLang: '/assets/lang/zh_CN.json',
    /** Whether to load the global language package */
    loadGlobalLang: true,
    /** Whether to skip translation */
    skipTranslate: true,
    /** The language to be generated */
    locales: ['en-US'],
};
exports.default = config;
