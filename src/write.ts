import { Config, LangObject, Language } from '../types';
import { getAbsolutePath } from './utils/getAbsolutePath';
import loadLanguage from './utils/lang';
import traversalDir from './utils/traveralDir';
import chalk from 'chalk';
import fs from 'fs-extra';
import regReplace from './utils/regReplace';
import * as reg from './utils/reg';

let langMap: Map<string, string> = new Map();
let langSet: Set<string> = new Set();
// 记录是否已经转换过。
let flag: boolean = false;

const enterVueFile = (pathName: string): void => {
	let data: string = fs.readFileSync(pathName, 'utf-8');
	// 1. 分离出 <template></template> <script></script>
	const _t: RegExpMatchArray | null = data.match(reg.templateLabel);
	const _s: RegExpMatchArray | null = data.match(reg.scriptLabel);
	const template = regReplace(_t ? _t[0] : '', 'template', langMap);
	const script = regReplace(_s ? _s[0] : '', 'script', langMap);
	// 2. template script 分别去替换
	data = data.replace(reg.templateLabel, template);
	data = data.replace(reg.scriptLabel, script);
	if (data !== fs.readFileSync(pathName, 'utf-8')) {
		fs.writeFileSync(pathName, data);
		console.log(chalk.green(`Vue File: ${pathName} saved!`));
		flag = true;
	}
};

const enterJSFile = (pathName: string) => {
	let data: string = fs.readFileSync(pathName, 'utf-8');
	const script = regReplace(data, 'js', langMap);
	if (script !== data) {
		fs.writeFileSync(pathName, script);
		console.log(chalk.blue(`JS File: ${pathName} saved!`));
		flag = true;
	}
};

const write = (configPath: string): void => {
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

	const mLang: Language = loadLanguage(
		require(getAbsolutePath(modulePath, 'assets', 'lang', 'zh_CN.json')),
		modules,
		'write'
	);
	langMap = mLang.langMap;
	langSet = mLang.langSet;

	if (config.loadGlobalLang) {
		const lang: Language = loadLanguage(globalLanguage, '', 'write');
		langMap = new Map<string, string>([...lang.langMap, ...langMap]);
		langSet = new Set<string>([...lang.langSet, ...langSet]);
	}
	traversalDir(modulePath, (path: string) => {
		if (/.(vue)$/.test(path)) {
			enterVueFile(path);
		}
		if (/.(js)$/.test(path)) {
			enterJSFile(path);
		}
	});
	if (!flag) {
		console.log(
			chalk.yellow(
				'There is no content in the current directory that needs to be converted for internationalization.'
			)
		);
	}
};

export default write;
