import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import './header.pcss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchLogout } from '@/store/auth/auth-slice';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
	const { t } = useTranslation();

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
			<button className={`burger ${isOpen ? 'burger--open' : ''}`} onClick={toggleMenu}>
				<span className={'burger__line'}></span>
			</button>
			<nav className={`header__nav  ${isOpen ? 'header__nav--open' : ''}`}>
				{links.map(({ path, label }) => (
					<Link
						key={path}
						className="header__nav-button"
						to={path}
						onClick={() => setIsOpen(false)}>
						{label}
					</Link>
				))}
			</nav>
			<nav className="header__nav-controls flex flex-jc-end gap-16">
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
