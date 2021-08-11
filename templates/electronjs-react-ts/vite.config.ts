import reactRefresh from '@vitejs/plugin-react-refresh';
import { UserConfig, ConfigEnv } from 'vite';
import { join } from 'path';

const srcRoot = join(__dirname, 'src');

export default ({ command }: ConfigEnv): UserConfig => {
	// DEV
	if (command === 'serve') {
		return {
			base: '/',
			plugins: [reactRefresh()],
			resolve: {
				alias: {
					'/@': srcRoot
				}
				/*`jsconfig.json or tsconfig.json`
				"compilerOptions": {
    				"baseUrl": ".",
    				"paths": {
      					"@/*": ["src/*"]
    				}
  				}*/
			},
			build: {
				outDir: join(srcRoot, '/out'),
				emptyOutDir: true,
				rollupOptions: {}
			},
			server: {
				port:
					process.env.PORT === undefined ? 3000 : Number(process.env.PORT)
			},
			optimizeDeps: {
				// auto: true,
				exclude: ['path']
			}
		};
	}
	// PROD
	else {
		return {
			base: `${__dirname}/src/out/`,
			plugins: [reactRefresh()],
			resolve: {
				alias: {
					'/@': srcRoot
				}
			},
			build: {
				outDir: join(srcRoot, '/out'),
				emptyOutDir: true,
				rollupOptions: {}
			},
			server: {
				port:
					process.env.PORT === undefined ? 3000 : Number(process.env.PORT)
			},
			optimizeDeps: {
				// auto: true,
				exclude: ['path']
			}
		};
	}
};
