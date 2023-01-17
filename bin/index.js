#!/usr/bin/env node
const semver = require('semver');
const packageJson = require('../package.json');
const chalk = require('chalk');

process.env.PACKAGE_NAME = packageJson.name;
process.env.PACKAGE_VERSION = packageJson.version;

/**
 * check node version
 */
const checkNodeVersion = () => {
    if (
        !semver.satisfies(process.version, packageJson.engines.node, {
            includePrerelease: true,
        })
    ) {
        console.log(
            chalk.red(
                'You are using Node ' +
                process.version +
                ', but this version of ' +
                packageJson.name +
                ' requires Node ' +
                packageJson.engines.node +
                '.\nPlease upgrade your Node version.'
            )
        );
        process.exit(1);
    }
};

checkNodeVersion();
require('../dist/index');
