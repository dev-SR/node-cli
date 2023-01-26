import fs from 'fs';
import chalk from 'chalk';
const CURR_DIR = process.cwd();
const log = console.log;

// const createDirectoryContents = (templatePath: string, newProjectPath: string) => {
// 	const CURRENT_DIR_CONTENTS = fs.readdirSync(templatePath);

// 	CURRENT_DIR_CONTENTS.forEach((fileOrFolder) => {
// 		const origFilePath = `${templatePath}/${fileOrFolder}`;

// 		// get stats about the current file/folder
// 		const stats = fs.statSync(origFilePath);
// 		// if file
// 		if (stats.isFile()) {
// 			// Rename
// 			if (fileOrFolder === '.gitignore.template') fileOrFolder = '.gitignore';

// 			const contents = fs.readFileSync(origFilePath, 'utf8');
// 			const writePath = `${CURR_DIR}/${newProjectPath}/${fileOrFolder}`;

// 			if (!newProjectPath.includes('.git')) {
// 				log(chalk.black.bgGreen(' CREATED ') + ' ' + `${newProjectPath}/${fileOrFolder}`);
// 			}

// 			fs.writeFileSync(writePath, contents, 'utf8');
// 		} // if folder:
// 		else if (stats.isDirectory()) {
// 			const writePath = `${CURR_DIR}/${newProjectPath}/${fileOrFolder}`;

// 			if (!fs.existsSync(writePath)) fs.mkdirSync(writePath);

// 			// recursive call for sub folders
// 			createDirectoryContents(
// 				`${templatePath}/${fileOrFolder}`,
// 				`${newProjectPath}/${fileOrFolder}`
// 			);
// 		}
// 	});
// };

const debugCreation = (templatePath: string, newProjectPath: string) => {
	const CURRENT_DIR_CONTENTS = fs.readdirSync(templatePath);

	CURRENT_DIR_CONTENTS.forEach((fileOrFolder) => {
		const origFilePath = `${templatePath}/${fileOrFolder}`;

		// get stats about the current file/folder
		const stats = fs.statSync(origFilePath);
		// if file
		if (stats.isFile()) {
			const writePath = `${newProjectPath}/${fileOrFolder}`.replace(/\//g, '\\');
			log(chalk.black.bgGreen(' CREATED ') + ' ' + writePath);
		} // if folder:
		else if (stats.isDirectory()) {
			// recursive call for sub folders
			debugCreation(`${templatePath}/${fileOrFolder}`, `${newProjectPath}/${fileOrFolder}`);
		}
	});
};

function cloneProject(sourcePath: string, destinationPath: string) {
	log();
	debugCreation(sourcePath, destinationPath);

	fs.cp(sourcePath, destinationPath, { recursive: true, errorOnExist: false }, (err) => {
		if (err) {
			chalk.red(err);
		}
	});
}
export default cloneProject;
