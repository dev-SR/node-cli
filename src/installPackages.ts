import { exec } from 'child_process';
import ora from 'ora';
// promisify convert sync function to async function
import { promisify } from 'util';
import open from 'open';
const delay = (s) => new Promise((res) => setTimeout(res, s * 1000));

async function installPackages(dir: string, startServer = false) {
	const execP = promisify(exec);

	const spinner = ora('Installing packages...').start();

	try {
		const { stdout: stdout1, stderr: stderr1 } = await execP(`cd ${dir} && yarn`);
		spinner.succeed();
		console.log(stdout1);
		console.error(stderr1);
		if (startServer) {
			spinner.start('Starting dev server...');
			delay(2);
			spinner.succeed();
			const server = exec(`cd ${dir} && yarn dev && pause`);
			server.stdout.on('data', (data) => process.stdout.write(data));
			server.stderr.on('data', (data) => process.stdout.write(data));
			delay(3);
			//now open browser
			await open('http://localhost:3000/', { wait: false });
		}
	} catch (err) {
		spinner.fail();
		console.error(err);
	}
}

export default installPackages;
