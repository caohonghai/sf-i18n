import { LangObject, Language } from '../../types';

const mp: Map<string, string> = new Map();
const st: Set<string> = new Set();

const recursionLoad = (
	obj: LangObject,
	prefix: string = '',
	operator: 'read' | 'write'
): void => {
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			loadLanguage(
				obj[key] as LangObject,
				prefix === '' ? key : `${prefix}.${key}`,
				operator
			);
		} else {
			if (operator === 'read') {
				mp.set(
					prefix === '' ? key : `${prefix}.${key}`,
					obj[key] as string
				);
			} else {
				mp.set(
					obj[key] as string,
					prefix === '' ? key : `${prefix}.${key}`
				);
			}

			st.add(obj[key] as string);
		}
	}
};

const loadLanguage = (
	obj: LangObject,
	prefix: string = '',
	operator: 'read' | 'write'
): Language => {
	recursionLoad(obj, prefix, operator);
	return {
		langMap: mp,
		langSet: st,
	};
};

export default loadLanguage;
