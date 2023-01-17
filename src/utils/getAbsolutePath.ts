import path from 'path';
import slash from 'slash';
import chalk from 'chalk';

export const getAbsolutePath = (...paths: string[]): string => {
	return slash(path.resolve(...paths));
};
