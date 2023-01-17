"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePath = void 0;
const path_1 = __importDefault(require("path"));
const slash_1 = __importDefault(require("slash"));
const chalk_1 = __importDefault(require("chalk"));
const getAbsolutePath = (...paths) => {
    console.log(chalk_1.default.red((0, slash_1.default)(path_1.default.resolve(...paths))));
    return (0, slash_1.default)(path_1.default.resolve(...paths));
};
exports.getAbsolutePath = getAbsolutePath;
