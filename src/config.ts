import { Config } from './types';

const config: Config = {
	/** Root path */
	root: '/Users/caohonghai/Desktop/webmanager',
	/** Module entry */
	entry: 'modules',
	/** Project name */
	project: 'ETL',
	/** Specific module */
	modules: 'accessManage',
	/** The prettier formatting code is used */
	prettier: {},
	/** The common language package path */
	globalLang: ['assets', 'lang', 'zh_CN.json'],
	// globalLang: ['src', 'test', 'zh_CN.json'],
	/** Whether to load the global language package */
	loadGlobalLang: true,
	/** Whether to skip translation */
	skipTranslate: true,
	/** The language to be generated */
	locales: ['en-US'],
};

export default config;
