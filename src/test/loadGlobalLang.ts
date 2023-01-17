import { LangObject } from '../types/index.d';
import loadLanguage from '../utils/lang';

const global: LangObject = require('./zh_CN.json');
// test loadLanguage function
const { langMap, langSet } = loadLanguage(global);

console.log(langMap.size);
console.log(langSet.size);
