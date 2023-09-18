import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import routes from './src/routes/index';

dotenv.config();

const { NODE_ENV, NOT_SSR, SERVER_PORT } = process.env;
const isDev = NODE_ENV === 'development';

async function startServer() {
	const app = express();
	app.use(cors());
	const port = Number(SERVER_PORT) || 3001;
	app.use(express.json());

	app.use((req, _res, next) => {
		console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
		next();
	});
	app.use('/api', routes);

	// не работает этот SSR у меня в дев режиме из-за того, что папку client не находит.
	// поэтому отключу для dev режма у себя
	// хорошо бы перенести этот файл в src, но боюсь поломать докер
	if (!NOT_SSR) {
		let vite: ViteDevServer | undefined;
		const distPath = path.dirname(require.resolve('client/dist/index.html'));
		const srcPath = path.dirname(require.resolve('client/'));
		const ssrClientPath = require.resolve('client/dist-ssr/ssr.cjs');

		if (isDev) {
			vite = await createViteServer({
				server: { middlewareMode: true },
				root: srcPath,
				appType: 'custom',
			});

			app.use(vite.middlewares);
		}

		if (!isDev) {
			app.use('/assets', express.static(path.resolve(distPath, 'assets')));
			app.use('/favicon', express.static(path.resolve(distPath, 'favicon')));
			app.use('/images', express.static(path.resolve(distPath, 'images')));
			app.use('/assets', express.static(path.resolve(distPath, 'images')));
			app.use('/audio', express.static(path.resolve(distPath, 'audio')));
		}

		app.use('*', async (req, res, next) => {
			const url = req.originalUrl;
			try {
				let template: string;

				if (!isDev) {
					template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
				} else {
					template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
					template = await vite!.transformIndexHtml(url, template);
				}

				let render: () => Promise<string>;

				if (!isDev) {
					render = (await import(ssrClientPath)).render(req.url);
				} else {
					render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
				}

				const [initialStateRender, appHtml] = await render();

				const stringifyState = JSON.stringify(initialStateRender).replace(/</g, '\\u003c');
				const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${stringifyState}</script>`;

				const html = template
					.replace('<!--ssr-outlet-->', appHtml)
					.replace('<!--preloadedState-->', stateMarkup);

				res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
			} catch (e) {
				if (isDev) {
					vite?.ssrFixStacktrace(e as Error);
				}
				next(e);
			}
		});
	}

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
	});
}

startServer();
