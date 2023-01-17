//约定:所有汉字匹配均以汉字开头,所有正则针对 单行匹配
const spaceRegexp = /\s/g;
const firstSpaceRegexp = /\s+/;
const quotationRegexp = /[\"|\']/g;
const angleBracketsRegexp = /[\<|\>]/g;
const templateBeginRegexp = /\<template/g;
const templateEndRegexp = /\<\/template/g;
const scriptBeginRegexp = /\<script/g;
const scripteEndRegexp = /\<\/script/g;

//只匹配单行注释，多行注释不考虑
const commentRegexp = /(\/\/)|(<!--)|(\/\*)/g;

//匹配js中的汉字,配合template range 判断 是否是template中的js汉字  √ (?<!=)["'][\u4e00-\u9fa5]\S*["|']
const scriptRegexp = /(?<!=)["'][\u4e00-\u9fa5]\S*["']/g;

//匹配属性中的汉字 √
// const propertyRegexp = /\s\S+=["'][\u4e00-\u9fa5]\S*["']/g;

// 单行  匹配 template ><下，空行的汉字（retrieve）,
const angleBracketSpaceRegexp =
	/((?<=\s)[\u4e00-\u9fa5][^\s\<\>]*|(?<=[>\s])[\u4e00-\u9fa5][^\s\<\>|\n]*(?=[\s<]))/g;

//匹配到特殊字符串说明前面正则匹配有问题，给出提示，去掉匹配
const warnRegexp = /[{}<>:]/g;

// 匹配 $t替换的字符串
const dollarTRegexp = /(?<=(\$t|i18n\.t)\(["'])[^'"]+/gm;

// 匹配 template 标签
const templateLabel = /\<template[\s\S]*\/template>/g;
// 匹配 script 标签
const scriptLabel = /\<script[\s\S]*\/script>/g;
// 匹配 JS/script 中的中文
const jsWord = /'[^'\r\n]*[\u4E00-\u9FA5]+[^'\r\n{}]*'/g;
// 匹配 template 中 双引号的属性
const propertyRegexp = /\s\S+=["'][^"]*[\u4e00-\u9fa5]+[^">]*["']/g;
// 引号中的中文
const quoteRegxp = /["'][^"']*[\u4e00-\u9fa5]+[^"'>]*["']/g;
// 标签之间的中文
const labelRegexp = /[>][^><]*[\u4e00-\u9fa5]+[^"'><]*[<]/g;

export {
	templateBeginRegexp,
	templateEndRegexp,
	templateLabel,
	scriptBeginRegexp,
	scripteEndRegexp,
	scriptLabel,
	scriptRegexp,
	propertyRegexp,
	angleBracketSpaceRegexp,
	warnRegexp,
	angleBracketsRegexp,
	quotationRegexp,
	spaceRegexp,
	firstSpaceRegexp,
	commentRegexp,
	dollarTRegexp,
	jsWord,
	quoteRegxp,
	labelRegexp,
};
