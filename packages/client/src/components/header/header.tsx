import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import './header.pcss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchLogout } from '@/store/auth/auth-slice';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
	const { t } = useTranslation();

	const links = [
		{ path: '/', label: t('main') },
		{ path: '/game', label: t('game') },
		{ path: '/forum', label: t('forum') },
		{ path: '/leaderboard', label: t('leaderboard') },
	];
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(fetchLogout() as any);
	};

	useEffect(() => {
		if (!auth.isLoggedIn) {
			navigate('/');
		}
	}, [auth.isLoggedIn, navigate]);

	return (
		<header className="header">
			<nav className="header__nav">
				{links.map(({ path, label }) => (
					<Link key={path} className="header__nav-button" to={path}>
						{label}
					</Link>
				))}
			</nav>
			<nav className="header__nav">
				{auth.isLoggedIn ? (
					<>
						<Button name="profile" onClick={() => navigate('/profile')}>
							{t('profile')}
						</Button>
						<Button name="sign_out" onClick={handleLogout}>
							{t('sign_out')}
						</Button>
					</>
				) : (
					<>
						<Button name="sign_in" onClick={() => navigate('/login')}>
							{t('sign_in')}
						</Button>
						<Button name="signup" onClick={() => navigate('/signup')}>
							{t('signup')}
						</Button>
					</>
				)}
			</nav>
		</header>
	);
};
