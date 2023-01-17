"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mp = new Map();
const st = new Set();
const recursionLoad = (obj, prefix = '') => {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            loadLanguage(obj[key], prefix === '' ? key : `${prefix}.${key}`);
        }
        else {
            mp.set(prefix === '' ? key : `${prefix}.${key}`, obj[key]);
            st.add(obj[key]);
        }
    }
};
const loadLanguage = (obj, prefix = '') => {
    recursionLoad(obj, prefix);
    return {
        langMap: mp,
        langSet: st,
    };
};
exports.default = loadLanguage;
