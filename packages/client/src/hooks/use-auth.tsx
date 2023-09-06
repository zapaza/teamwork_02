import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authSlice, checkAuth, loginOAuth } from '@/store/auth/auth-slice';
import { useLocation } from 'react-router-dom';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const urlParams = new URLSearchParams(location.search);
				const code = urlParams.get('code');

				if (code) {
					await dispatch(loginOAuth(code)).unwrap();
				}
				await dispatch(checkAuth()).unwrap();
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(authSlice.actions.loadData());
			}
		};
		fetchAuth().catch(e => console.log(e));
	}, [dispatch]);
};
