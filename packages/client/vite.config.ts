import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000,
	},
	define: {
		__EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
		__INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	ssr: {
		format: 'cjs',
	},
	build: {
		outDir: path.join(__dirname, '/dist/client'),
		rollupOptions: {
			input: {
				app: './index.html',
				serviceWorker: './src/service-worker.ts',
			},
			output: {
				entryFileNames: chunkInfo =>
					chunkInfo.name === 'serviceWorker'
						? '[name].js' // оставляем оригинальное имя файла (для serviceWorker.ts)
						: 'assets/js/[name]-[hash].js', // остальные файлы по-умолчанию
			},
		},
	},
});
