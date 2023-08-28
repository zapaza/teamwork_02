import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [react()],
	ssr: true,
	define: {
		__SERVER_PORT__: process.env.SERVER_PORT || 3001,
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'ssr.tsx'),
			name: 'Client',
			formats: ['cjs'],
		},
		rollupOptions: {
			output: {
				dir: 'dist-ssr',
			},
		},
	},
});
