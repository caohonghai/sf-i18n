import { LangObject } from '../../types';
import loadLanguage from '../utils/lang';

const global: LangObject = require('./zh_CN.json');
// test loadLanguage function
const { langMap, langSet } = loadLanguage(global, '', 'read');

console.log(langMap.size);
console.log(langSet.size);
