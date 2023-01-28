import { Config, Language } from './types';
import { getAbsolutePath } from './utils/getAbsolutePath';
import loadLanguage from './utils/lang';
import { LangObject } from './types/index.d';
import chalk from 'chalk';
import fs from 'fs-extra';
import _ from 'lodash';
import traversalDir from './utils/traveralDir';

const moduleMap: Map<string, number> = new Map();
const repeatMoreThanFive: Set<string> = new Set();

const enterFile = (pathName: string): void => {
	console.log(pathName);
	const data: string = fs.readFileSync(pathName, 'utf-8');
	const arr: RegExpMatchArray | Array<string> =
		data.match(
			/['"`>](\s)*[^"`'<>/\r\n]*[\u4E00-\u9FA5]+[^"'`/<>*\r\n]*(\s)*['"`<]/g
		) || [];
	for (const str of arr) {
		let key = str.slice(1, str.length - 1).trim();
		// 可能有 插值语法
		if (key.includes('{{')) {
			/** 别用 replaceAll 有兼容性问题 node环境下需要 15.0.0 */
			/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll#browser_compatibility */
			key = key
				.replace(/({{)/g, '{')
				.replace(/(}})/g, '}')
				.replace(/(\.)/g, '');
		}
		moduleMap.set(key, (moduleMap.get(key) ?? 0) + 1);
		if ((moduleMap.get(key) ?? 0) >= 5) repeatMoreThanFive.add(key);
	}
};

const read = (configPath: string): void => {
	const config: Config = require(configPath);
	const { entry, project, modules } = config;

	const globalPath: string = getAbsolutePath(
		config.root || process.cwd(),
		...config.globalLang
	);
	const globalLanguage: LangObject = require(globalPath);

	let modulePath: string = '';
	// 是否有 modules
	modulePath = getAbsolutePath(
		config.root || process.cwd(),
		entry,
		project,
		modules
	);

	let langMap: Map<string, string> = new Map();
	let langSet: Set<string> = new Set();

	const mLang: Language = loadLanguage(
		require(getAbsolutePath(modulePath, 'assets', 'lang', 'zh_CN.json')),
		modules,
		'read'
	);
	langMap = mLang.langMap;
	langSet = mLang.langSet;

	if (config.loadGlobalLang) {
		const lang: Language = loadLanguage(globalLanguage, '', 'read');
		console.log(langMap);
		langMap = new Map<string, string>([...lang.langMap, ...langMap]);
		console.log(langMap);
		langSet = new Set<string>([...lang.langSet, ...langSet]);
	}

	traversalDir(modulePath, (path: string) => {
		// 如果是 js 或者 vue 文件
		if (/.(js|vue)$/.test(path)) {
			enterFile(path);
		}
	});

	for (const item of repeatMoreThanFive) {
		if (!langSet.has(item)) {
			langMap.set('etl.' + Math.random().toString(16).slice(2), item);
			langSet.add(item);
		}
	}

	moduleMap.forEach((val, key) => {
		if (!langSet.has(key)) {
			langMap.set(
				`${modules}.` + Math.random().toString(16).slice(2),
				key
			);
			langSet.add(key);
		}
	});

	const g: LangObject = {},
		l: LangObject = {};
	langMap.forEach((val, key) => {
		if (key.startsWith(modules)) {
			_.set(l, key, val);
			return;
		}
		_.set(g, key, val);
	});
	fs.writeFile(globalPath, JSON.stringify(g), (err) => {
		if (err) {
			console.error(err);
		}
		console.log('global saved!');
	});
	fs.writeFile(
		getAbsolutePath(modulePath, 'assets', 'lang', 'zh_CN.json'),
		// getAbsolutePath(modulePath, 'zh_CN.json'),
		JSON.stringify(l[modules]),
		(err) => {
			if (err) {
				console.error(err);
			}
			console.log('module saved!');
		}
	);
	console.log(config);
	console.log(langMap.size, langSet.size);
	console.log(chalk.red(modulePath), chalk.green('modulePath'));
	console.log(chalk.red(globalPath), chalk.green('globalPath'));
};

export default read;
