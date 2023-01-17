"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const read_1 = __importDefault(require("./read"));
const init_1 = __importDefault(require("./init"));
const log_1 = __importDefault(require("./utils/log"));
const commander_1 = require("commander");
const getAbsolutePath_1 = require("./utils/getAbsolutePath");
const constants_1 = require("./utils/constants");
/** Initialize a configuration file in the project */
commander_1.program
    .command('init')
    .alias('i')
    .description('Initialize a configuration file in the project')
    .action(() => {
    (0, init_1.default)();
});
/** Recursively matches the Chinese of the module */
commander_1.program
    .command('read')
    .alias('r')
    .description('Recursively matches the Chinese of the module')
    .action(() => {
    /** check whether the configuration file exists */
    const configPath = (0, getAbsolutePath_1.getAbsolutePath)(process.cwd(), constants_1.CONFIGURATION_NAME);
    if (!fs_extra_1.default.existsSync(configPath)) {
        log_1.default.warning(`The configuration file path does not exist.\nRun the 'sf init' or 'sf i' command first`);
    }
    else {
        (0, read_1.default)(configPath);
    }
});
commander_1.program.parse(process.argv);
