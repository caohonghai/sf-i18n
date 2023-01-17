"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAbsolutePath_1 = require("./utils/getAbsolutePath");
const lang_1 = __importDefault(require("./utils/lang"));
const read = (configPath) => {
    const config = require(configPath);
    const { entry, project, modules } = config;
    const globalLanguage = require((0, getAbsolutePath_1.getAbsolutePath)(process.cwd(), config.globalLang));
    let modulePath = '';
    if (modules) {
        modulePath = (0, getAbsolutePath_1.getAbsolutePath)(entry, project, modules);
    }
    else {
        modulePath = (0, getAbsolutePath_1.getAbsolutePath)(entry, project);
    }
    const langMap = new Map();
    const langSet = new Set();
    if (config.loadGlobalLang) {
        (0, lang_1.default)(globalLanguage);
    }
    console.log(config);
    console.log(modulePath);
};
exports.default = read;
