import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authSlice, checkAuth } from '@/store/auth/auth-slice';

export const useAuth = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchAuth = async () => {
			try {
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
