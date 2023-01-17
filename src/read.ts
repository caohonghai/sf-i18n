import { Config } from './types';
import { getAbsolutePath } from './utils/getAbsolutePath';
import loadLanguage from './utils/lang';

const read = (configPath: string): void => {
	const config: Config = require(configPath);
	const { entry, project, modules } = config;
	const globalLanguage = require(getAbsolutePath(
		process.cwd(),
		config.globalLang
	));
	let modulePath: string = '';
	if (modules) {
		modulePath = getAbsolutePath(entry, project, modules);
	} else {
		modulePath = getAbsolutePath(entry, project);
	}

	const langMap: Map<string, string> = new Map();
	const langSet: Set<string> = new Set();

	if (config.loadGlobalLang) {
		loadLanguage(globalLanguage);
	}
	console.log(config);
	console.log(modulePath);
};

export default read;
