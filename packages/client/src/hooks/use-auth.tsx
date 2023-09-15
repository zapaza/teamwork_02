import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authSlice, checkAuth, loginOAuth } from '@/store/auth/auth-slice';
import { useSearchParams } from 'react-router-dom';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const code = searchParams.get('code');
				if (code) {
					await dispatch(loginOAuth(code)).unwrap();
				}
				await dispatch(checkAuth()).unwrap();
			} catch (error) {
				console.error((error as Error).message);
			} finally {
				dispatch(authSlice.actions.loadData());
			}
		};
		fetchAuth().catch(e => console.log(e));
	}, [dispatch]);
};
