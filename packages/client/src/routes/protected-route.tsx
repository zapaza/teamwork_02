import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute<T extends React.ReactNode>({ children }: { children: T }) {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			// Если пользователь не аутентифицирован, перенаправляем на страницу /login
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	// Если пользователь аутентифицирован, отрисовываем дочерние компоненты
	return <>{children}</>;
}

export default ProtectedRoute;
