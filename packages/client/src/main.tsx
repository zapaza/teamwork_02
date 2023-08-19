import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import router from './routes';
import './styles/index.pcss';
import './i18n';

// работает в production, в dev не работает и не должно работать из-за дополнительных модулей vite
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (const registration of registrations) {
				registration.unregister().then(r => console.log(r));
			}
		});

		//скрыли до лучших времен пока не починим
		// navigator.serviceWorker
		//   .register('serviceWorker.js' || 'service-worker.ts')
		//   .then(
		//     registration => {
		//       console.log('SW registered: ', registration)
		//     },
		//     err => {
		//       console.error('SW registration failed: ', err)
		//     }
		//   )
	});
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<React.Suspense fallback="Loading...">
			<Provider store={store}>
				<RouterProvider router={router}/>
			</Provider>
		</React.Suspense>
	</React.StrictMode>,
);
