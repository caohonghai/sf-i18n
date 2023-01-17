"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const prettier_1 = __importDefault(require("prettier"));
const constants_1 = require("./utils/constants");
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const getAbsolutePath_1 = require("./utils/getAbsolutePath");
const config_1 = __importDefault(require("./config"));
const init = () => {
    const configPath = (0, getAbsolutePath_1.getAbsolutePath)(process.cwd(), constants_1.CONFIGURATION_NAME);
    const code = `
		module.exports = ${(0, serialize_javascript_1.default)(config_1.default, {
        unsafe: true,
    })}
	`;
    const stylizedCode = prettier_1.default.format(code, {
        singleQuote: true,
        semi: true,
        parser: 'babel',
    });
    fs_extra_1.default.outputFileSync(configPath, stylizedCode);
};
exports.default = init;
