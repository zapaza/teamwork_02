import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import router from './routes';
import './styles/index.pcss';
import './i18n';

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>,
);
