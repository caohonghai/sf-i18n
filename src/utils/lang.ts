import { LangObject, Language } from '../types';

const mp: Map<string, string> = new Map();
const st: Set<string> = new Set();

const recursionLoad = (obj: LangObject, prefix: string = ''): void => {
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			loadLanguage(
				obj[key] as LangObject,
				prefix === '' ? key : `${prefix}.${key}`
			);
		} else {
			mp.set(
				prefix === '' ? key : `${prefix}.${key}`,
				obj[key] as string
			);
			st.add(obj[key] as string);
		}
	}
};

const loadLanguage = (obj: LangObject, prefix: string = ''): Language => {
	recursionLoad(obj, prefix);
	return {
		langMap: mp,
		langSet: st,
	};
};

export default loadLanguage;
