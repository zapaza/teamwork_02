import { Header } from './components/header/header';
import { Outlet } from 'react-router-dom';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/use-auth';
import { PageInitArgs } from '@/routes/paths';
import { usePage } from '@/hooks/usePage';

export const App = () => {
	const isDataLoaded = useSelector((state: RootState) => state.auth.isDataLoaded);

	usePage({ initPage: initAppPage });

	return isDataLoaded ? (
		<>
			<Header/>
			<Outlet/>
		</>
	) : null;
};

const useData = (state: RootState) => useSelector((state: RootState) => state.auth.isDataLoaded);

export const initAppPage = async ({ dispatch, state }: PageInitArgs) => {
	if (!useData(state)) {
		return useAuth();
	}
};
