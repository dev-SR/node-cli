import * as fs from 'fs';
import * as chalk from 'chalk';
const CURR_DIR = process.cwd();
let log = console.log;
const createDirectoryContents = (
	templatePath: string,
	newProjectPath: string
) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach((fileOrFolder) => {
		const origFilePath = `${templatePath}/${fileOrFolder}`;

		// get stats about the current file/folder
		const stats = fs.statSync(origFilePath);
		// if file
		if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, 'utf8');
			// Rename
			if (fileOrFolder === '.gitignore.template')
				fileOrFolder = '.gitignore';
			const writePath = `${CURR_DIR}/${newProjectPath}/${fileOrFolder}`;
			if (!newProjectPath.includes('.git')) {
				log(
					chalk.black.bgGreen(' CREATED ') +
						' ' +
						`${newProjectPath}/${fileOrFolder}`
				);
			}

			fs.writeFileSync(writePath, contents, 'utf8');
		} // if folder:
		else if (stats.isDirectory()) {
			const writePath = `${CURR_DIR}/${newProjectPath}/${fileOrFolder}`;

			if (!fs.existsSync(writePath)) fs.mkdirSync(writePath);

			// recursive call for sub folders
			createDirectoryContents(
				`${templatePath}/${fileOrFolder}`,
				`${newProjectPath}/${fileOrFolder}`
			);
		}
	});
};

export default createDirectoryContents;
