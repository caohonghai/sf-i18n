import fs from 'fs-extra';
import prettier from 'prettier';
import { CONFIGURATION_NAME } from './utils/constants';
import serialize from 'serialize-javascript';
import { getAbsolutePath } from './utils/getAbsolutePath';
import defaultConfig from './config';

const init = () => {
	const configPath: string = getAbsolutePath(
		process.cwd(),
		CONFIGURATION_NAME
	);
	const code: string = `
		module.exports = ${serialize(defaultConfig, {
			unsafe: true,
		})}
	`;
	const stylizedCode: string = prettier.format(code, {
		singleQuote: true,
		semi: true,
		parser: 'babel',
	});
	fs.outputFileSync(configPath, stylizedCode);
};

export default init;
