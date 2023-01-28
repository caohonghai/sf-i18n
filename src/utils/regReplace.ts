import * as reg from './reg';

/** 兼容性问题 用 new RegExp 来解决 */
const regReplace = (
	context: string,
	tag: string = 'template',
	langMap: Map<string, string>
) => {
	if (tag === 'template') {
		// 1. match properties
		// 双引号 :label="'融合概览'" label="融合概览" :label="click('点击')"
		let regArray: string[] =
			[...new Set(context.match(reg.propertyRegexp))] || [];
		// 防止相同的内容重复替换。
		const st: Set<string> = new Set();
		regArray.forEach((str) => {
			const _s = str.trim();
			if (!(_s[0] === ':' || _s[0] === '@')) {
				// label="测试" => :label="测试"
				let tempStr: string = ' :' + _s;
				// 测试
				const regResult = tempStr.match(reg.quoteRegxp);
				let cn: string = (regResult && regResult[0]) || '';
				if (cn !== '') {
					cn = cn.slice(1, cn.length - 1).trim();
				}
				const i18n: string = `"$t('${langMap.get(cn)}', '${cn}')"`;
				// :label="测试" => :label="$t('hash code', '测试')"
				tempStr = tempStr.replace(reg.quoteRegxp, i18n);
				if (!st.has(cn)) {
					context = context.replace(new RegExp(str, 'g'), tempStr);
				}
				st.add(cn);
			} else {
				const cnArray = [...new Set(str.match(reg.quoteRegxp))] || [];
				cnArray.forEach((cn) => {
					const _cn = cn.slice(1, cn.length - 1).trim();
					const i18n = `$t('${langMap.get(_cn)}', '${_cn}')`;
					if (!st.has(_cn)) {
						// console.log(cn);
						// console.log(_cn);
						context = context.replace(new RegExp(cn, 'g'), i18n);
					}
					st.add(_cn);
				});
			}
		});
		// 2. match label
		regArray = [...new Set(context.match(reg.labelRegexp))] || [];
		regArray.forEach((str) => {
			let _s = str.slice(1, str.length - 1).trim();
			if (_s.includes('{{')) {
				// 为了匹配Lang 包的value 需要先处理来保持一直
				_s = _s.replace(/({{)/g, '{').replace(/(}})/g, '}');
				// 匹配出 {{ value }}
				const musk = [...new Set(_s.match(/{[\w.\s]*}/g))] || [];
				// const obj = {};
				let obj = '{';
				musk.forEach((item) => {
					// item is string ?
					item = item.slice(1, item.length - 1).trim();
					obj += ` ${item.replace(/(\.)/g, '')}: ${item},`;
				});
				if (obj !== '{') {
					obj = obj.slice(0, obj.length - 1) + ' }';
				} else obj += '}';
				/** 字符串拼接 */
				if (langMap.has(_s)) {
					const i18n = `> {{ $tc('${langMap.get(
						_s
					)}', null, ${obj}, '${_s}') }} <`;
					context = context.replace(new RegExp(str, 'g'), i18n);
				}
			} else {
				if (langMap.has(_s)) {
					const i18n = `> {{ $t('${langMap.get(_s)}', '${_s}') }} <`;
					context = context.replace(new RegExp(str, 'g'), i18n);
				}
			}
		});
	} else {
		// 防止重复执行 replace
		const regArray = [...new Set(context.match(reg.jsWord))] || [];
		// 遍历每条 中文 替换 context
		regArray.forEach((str) => {
			const tempStr = str.slice(1, str.length - 1).trim();
			if (langMap.has(tempStr)) {
				const replaceStr = `this.$t('${langMap.get(
					tempStr
				)}', '${tempStr}')`;
				context = context.replace(new RegExp(str, 'g'), replaceStr);
			}
		});
	}
	return context;
};

export default regReplace;
