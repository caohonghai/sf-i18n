"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log = {
    info: (msg) => console.log(chalk_1.default.cyan(msg)),
    warning: (msg) => console.log(chalk_1.default.yellow(msg)),
    success: (msg) => console.log(chalk_1.default.green(msg)),
    error: (msg1, msg2 = '') => console.log(chalk_1.default.red(msg1), chalk_1.default.red(msg2)),
};
exports.default = log;
