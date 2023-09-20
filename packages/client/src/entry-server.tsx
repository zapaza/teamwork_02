import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { Request as ExpressRequest } from 'express';
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from 'react-router-dom/server';
import { matchRoutes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createFetchRequest, createContext, createUrl } from '@/entry-server.utils';
import { reducer } from '@/store';
import { routerPaths } from '@/routes/paths';
import './styles/index.pcss';

export const render = async (req: ExpressRequest) => {
	const { query, dataRoutes } = createStaticHandler(routerPaths);
	const fetchRequest = createFetchRequest(req);
	const context = await query(fetchRequest);

	if (context instanceof Response) {
		throw context;
	}

	const store = configureStore({
		reducer,
	});

	const url = createUrl(req);

	const foundRoutes = matchRoutes(routerPaths, url);
	if (!foundRoutes) {
		throw new Error('Страница не найдена!');
	}

	return {
		html: ReactDOM.renderToString(
			<Provider store={store}>
				<StaticRouterProvider
					router={createStaticRouter(dataRoutes, context)}
					context={context}
				/>
			</Provider>,
		),
		initialState: store.getState(),
	};
};
