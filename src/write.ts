import { Config, LangObject, Language } from './types';
import { getAbsolutePath } from './utils/getAbsolutePath';
import loadLanguage from './utils/lang';
import traversalDir from './utils/traveralDir';
import fs from 'fs-extra';
import regReplace from './utils/regReplace';
import * as reg from './utils/reg';

let langMap: Map<string, string> = new Map();
let langSet: Set<string> = new Set();

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
	fs.writeFile(pathName, data, (err) => {
		// console.log(`${pathName} saved!`);
	});
};

const enterJSFile = (pathName: string) => {
	let data: string = fs.readFileSync(pathName, 'utf-8');
	const script = regReplace(data, 'script', langMap);
	fs.writeFile(pathName, script, (err) => {
		console.log(`${pathName} saved!`);
	});
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
	});
	console.log(langMap);
};

export default write;
