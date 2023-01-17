import type { Options } from 'prettier';

export type Config = {
	entry: string;
	project: string;
	modules?: string;
	globalLang: string;
	loadGlobalLang: boolean;
	skipTranslate: boolean;
	locales?: string[];
	prettier?: Options;
};

export interface Language {
	langMap: Map<string, string>;
	langSet: Set<string>;
}

export interface LangObject {
	[propName: string]: string | LangObject;
}

/** The deep attribute is optional */
export type deepPartial<T extends object> = {
	[K in keyof T]?: T[K] extends object ? deepPartial<T[K]> : T[K];
};
