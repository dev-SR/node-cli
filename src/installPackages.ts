import { exec } from 'child_process';
// promisify convert sync function to async function
import { promisify } from 'util';
import chalk from 'chalk';
const log = console.log;

const execAsync = promisify(exec);

function installPackages(dir: string) {
	log(chalk.yellowBright('Installing packages...'));
	const installProcess = exec(`cd ${dir} && yarn`);

	installProcess.stdout.on('data', (data) => process.stdout.write(data));
	installProcess.stderr.on('data', (data) => process.stdout.write(data));
	installProcess.on('close', (code) => process.stdout.write(`exited with ${code}`));
}

export default installPackages;
