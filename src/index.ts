#!/usr/bin/env node

import { prompt } from 'inquirer';
import * as fs from 'fs';
import createDirectoryContents from './createDirectoryContents';
import * as ora from 'ora';
// const __dirname = resolve(dirname(''));

const CURRENT_DIR = process.cwd();
// __dirname: dir of template -> D:\Others\Project\CLI\build
// CURRENT_DIR: current dir of opened terminal -> C:\Users\soikat\Desktop

// Get All the sub-folder names inside 'templates' folder
const CHOICES = fs.readdirSync(`${__dirname}/../templates`);

const QUESTIONS = [
	{
		name: 'project-choice',
		type: 'list',
		message: 'What project template would you like to generate?',
		choices: CHOICES
	},
	{
		name: 'project-name',
		type: 'input',
		message: 'Project name:',
		validate: function (input: string) {
			if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
			else
				return 'Project name may only include letters, numbers, underscores and hashes.';
		}
	}
];
prompt(QUESTIONS).then((answers) => {
	const projectChoice = answers['project-choice'];
	const projectName: string = answers['project-name'];
	const templatePath = `${__dirname}/../templates/${projectChoice}`;

	const DirPath = `${CURRENT_DIR}/${projectName}`;
	const spinner = ora('Initiating Project Structure...').start();
	spinner.color = 'yellow';
	spinner.text = 'Creating files...';
	// spinner.color = 'yellow';
	// Make Project Directory
	if (!fs.existsSync(DirPath)) fs.mkdirSync(DirPath);

	// Populate Project Directory
	setTimeout(() => {
		console.log();
		console.log();
		createDirectoryContents(templatePath, projectName);
		console.log();
		spinner.succeed('Project Created Successfully');
	}, 1000);
});
