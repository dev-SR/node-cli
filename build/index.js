#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const fs_1 = __importDefault(require("fs"));
const cloneProject_1 = __importDefault(require("./cloneProject"));
const installPackages_1 = __importDefault(require("./installPackages"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const log = console.log;
const error = chalk_1.default.red;
const warn = chalk_1.default.yellow;
const info = chalk_1.default.blue;
const green = chalk_1.default.green;
// const __dirname = resolve(dirname(''));
const CURRENT_DIR = process.cwd();
// __dirname: dir of template -> D:\Others\Project\CLI\build
// CURRENT_DIR: current dir of opened terminal -> C:\Users\soikat\Desktop
// Get All the sub-folder names inside 'templates' folder
const CHOICES = fs_1.default.readdirSync(path_1.default.join(CURRENT_DIR, 'templates'));
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
        validate: function (input) {
            if (/^([A-Za-z\.\-\\_\d])+$/.test(input))
                return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];
(0, inquirer_1.prompt)(QUESTIONS).then((answers) => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    // const templatePath = `${__dirname}/../templates/${projectChoice}`;
    const templatePath = path_1.default.join(CURRENT_DIR, 'templates', projectChoice);
    let destinationPath = CURRENT_DIR;
    if (projectName !== '.') {
        destinationPath = path_1.default.join(CURRENT_DIR, projectName);
    }
    const spinner = (0, ora_1.default)('Initiating Project Structure...').start();
    spinner.color = 'yellow';
    spinner.text = 'Creating files...';
    // spinner.color = 'yellow';
    // Make Project Directory
    console.log('\n\n');
    // Populate Project Directory
    setTimeout(() => {
        (0, cloneProject_1.default)(templatePath, destinationPath);
        spinner.succeed('Project Created Successfully');
        if (projectChoice === 'javafx') {
            log(green(`\tOpen \'${projectName}\' dir as Intellij Project`));
            log(warn(`\tThen, Visit below link to configure RUN/DEBUG script with Intellij`));
            process.stdout.write(info('\tLINK: '));
            log('https://github.com/dev-SR/node-cli/tree/main/templates/javafx#rundebug-configurations');
        }
        else if (projectChoice === 'react-ts' ||
            projectChoice === 'nextjs-ts' ||
            projectChoice === 'electronjs-react-ts') {
            (0, installPackages_1.default)(destinationPath);
        }
    }, 1000);
});
