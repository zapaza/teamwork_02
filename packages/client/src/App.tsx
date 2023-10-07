import { Header } from './components/header/header';
import { Outlet } from 'react-router-dom';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/use-auth';
import { registerServiceWorker } from '@/utils/serviceWorker';

if (process.env.NODE_ENV === 'production') {
	registerServiceWorker();
}
export const App = () => {
	const isDataLoaded = useSelector((state: RootState) => state.auth.isDataLoaded);

	useAuth();
	return isDataLoaded ? (
		<>
			<Header/>
			<Outlet/>
		</>
	) : null;
};
