"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelRegexp = exports.quoteRegxp = exports.jsWord = exports.dollarTRegexp = exports.commentRegexp = exports.firstSpaceRegexp = exports.spaceRegexp = exports.quotationRegexp = exports.angleBracketsRegexp = exports.warnRegexp = exports.angleBracketSpaceRegexp = exports.propertyRegexp = exports.scriptRegexp = exports.scriptLabel = exports.scripteEndRegexp = exports.scriptBeginRegexp = exports.templateLabel = exports.templateEndRegexp = exports.templateBeginRegexp = void 0;
//约定:所有汉字匹配均以汉字开头,所有正则针对 单行匹配
const spaceRegexp = /\s/g;
exports.spaceRegexp = spaceRegexp;
const firstSpaceRegexp = /\s+/;
exports.firstSpaceRegexp = firstSpaceRegexp;
const quotationRegexp = /[\"|\']/g;
exports.quotationRegexp = quotationRegexp;
const angleBracketsRegexp = /[\<|\>]/g;
exports.angleBracketsRegexp = angleBracketsRegexp;
const templateBeginRegexp = /\<template/g;
exports.templateBeginRegexp = templateBeginRegexp;
const templateEndRegexp = /\<\/template/g;
exports.templateEndRegexp = templateEndRegexp;
const scriptBeginRegexp = /\<script/g;
exports.scriptBeginRegexp = scriptBeginRegexp;
const scripteEndRegexp = /\<\/script/g;
exports.scripteEndRegexp = scripteEndRegexp;
//只匹配单行注释，多行注释不考虑
const commentRegexp = /(\/\/)|(<!--)|(\/\*)/g;
exports.commentRegexp = commentRegexp;
//匹配js中的汉字,配合template range 判断 是否是template中的js汉字  √ (?<!=)["'][\u4e00-\u9fa5]\S*["|']
const scriptRegexp = /(?<!=)["'][\u4e00-\u9fa5]\S*["']/g;
exports.scriptRegexp = scriptRegexp;
//匹配属性中的汉字 √
// const propertyRegexp = /\s\S+=["'][\u4e00-\u9fa5]\S*["']/g;
// 单行  匹配 template ><下，空行的汉字（retrieve）,
const angleBracketSpaceRegexp = /((?<=\s)[\u4e00-\u9fa5][^\s\<\>]*|(?<=[>\s])[\u4e00-\u9fa5][^\s\<\>|\n]*(?=[\s<]))/g;
exports.angleBracketSpaceRegexp = angleBracketSpaceRegexp;
//匹配到特殊字符串说明前面正则匹配有问题，给出提示，去掉匹配
const warnRegexp = /[{}<>:]/g;
exports.warnRegexp = warnRegexp;
// 匹配 $t替换的字符串
const dollarTRegexp = /(?<=(\$t|i18n\.t)\(["'])[^'"]+/gm;
exports.dollarTRegexp = dollarTRegexp;
// 匹配 template 标签
const templateLabel = /\<template[\s\S]*\/template>/g;
exports.templateLabel = templateLabel;
// 匹配 script 标签
const scriptLabel = /\<script[\s\S]*\/script>/g;
exports.scriptLabel = scriptLabel;
// 匹配 JS/script 中的中文
const jsWord = /'[^'\r\n]*[\u4E00-\u9FA5]+[^'\r\n{}]*'/g;
exports.jsWord = jsWord;
// 匹配 template 中 双引号的属性
const propertyRegexp = /\s\S+=["'][^"]*[\u4e00-\u9fa5]+[^">]*["']/g;
exports.propertyRegexp = propertyRegexp;
// 引号中的中文
const quoteRegxp = /["'][^"']*[\u4e00-\u9fa5]+[^"'>]*["']/g;
exports.quoteRegxp = quoteRegxp;
// 标签之间的中文
const labelRegexp = /[>][^><]*[\u4e00-\u9fa5]+[^"'><]*[<]/g;
exports.labelRegexp = labelRegexp;
