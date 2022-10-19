"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
// const createDirectoryContents = (templatePath: string, newProjectPath: string) => {
// 	const filesToCreate = fs.readdirSync(templatePath);
// 	filesToCreate.forEach((fileOrFolder) => {
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
function cloneProject(sourcePath, destinationPath) {
    fs_1.default.cp(sourcePath, destinationPath, { recursive: true }, (err) => {
        if (err) {
            chalk_1.default.red(err);
        }
    });
}
exports.default = cloneProject;
