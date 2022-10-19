"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// promisify convert sync function to async function
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
function installPackages(dir) {
    // const { stdout, stderr } = await execAsync(`cd ${dir} && yarn `);
    // if (stderr != '') console.error(`stderr: ${stderr}`);
    // console.log(`stdout: ${stdout}`);
    const installProcess = (0, child_process_1.exec)(`cd ${dir} && yarn`);
    installProcess.stdout.on('data', process.stdout.write);
    installProcess.stderr.on('data', process.stdout.write);
    installProcess.on('close', (code) => process.stdout.write(`exited with ${code}`));
}
exports.default = installPackages;
