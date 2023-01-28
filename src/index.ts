import fs from 'fs-extra';
import read from './read';
import init from './init';
import log from './utils/log';
import { program } from 'commander';
import { getAbsolutePath } from './utils/getAbsolutePath';
import { CONFIGURATION_NAME } from './utils/constants';
import write from './write';

/** check whether the configuration file exists */
const configPath: string = getAbsolutePath(process.cwd(), CONFIGURATION_NAME);

/** Initialize a configuration file in the project */
program
	.command('init')
	.alias('i')
	.description('Initialize a configuration file in the project')
	.action(() => {
		init();
	});

/** Recursively matches the Chinese of the module */
program
	.command('read')
	.alias('r')
	.description('Recursively matches the Chinese of the module')
	.action(() => {
		if (!fs.existsSync(configPath)) {
			log.warning(
				`The configuration file path does not exist.\nRun the 'sf init' or 'sf i' command first`
			);
		} else {
			read(configPath);
		}
	});

program
	.command('write')
	.alias('w')
	.description('Write internationalization to files.')
	.action(() => {
		write(configPath);
	});
program.parse(process.argv);
