import path from 'path';
import slash from 'slash';
import chalk from 'chalk';

export const getAbsolutePath = (...paths: string[]): string => {
	console.log(chalk.red(slash(path.resolve(...paths))));
	return slash(path.resolve(...paths));
};
