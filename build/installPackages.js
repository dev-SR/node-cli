"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// promisify convert sync function to async function
const util_1 = require("util");
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const execAsync = (0, util_1.promisify)(child_process_1.exec);
function installPackages(dir) {
    log(chalk_1.default.yellowBright('Installing packages...'));
    const installProcess = (0, child_process_1.exec)(`cd ${dir} && yarn`);
    installProcess.stdout.on('data', (data) => process.stdout.write(data));
    installProcess.stderr.on('data', (data) => process.stdout.write(data));
    installProcess.on('close', (code) => process.stdout.write(`exited with ${code}`));
}
exports.default = installPackages;
