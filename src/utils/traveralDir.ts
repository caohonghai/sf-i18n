import fs from 'fs-extra';
import path from 'path';

const traversalDir = (dir: string, callback: Function): void => {
	fs.readdirSync(dir).forEach((file) => {
		const pathName = path.join(dir, file);
		if (fs.statSync(pathName).isDirectory()) {
			traversalDir(pathName, callback);
		} else {
			callback(pathName);
		}
	});
};

export default traversalDir;
