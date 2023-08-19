import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import useAuth from './hooks/use-auth';

function App() {
	const isDataLoaded = useSelector((state: RootState) => state.auth.isDataLoaded);

	useAuth();

	return isDataLoaded ? (
		<>
			<Header/>
			<Outlet/>
		</>
	) : null;
}

export default App;
