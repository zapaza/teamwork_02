import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from './src/store';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from '@/routes/paths';

export const render = (url: string) => {
	const store = setupStore();
	const initialState = store.getState();
	const renderResult = renderToString(
		<StaticRouter location={url}>
			<Provider store={store}>
				<RouterProvider router={routerPaths}/>
			</Provider>
		</StaticRouter>,
	);
	return [initialState, renderResult];
};
