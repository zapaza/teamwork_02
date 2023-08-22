import './login-page.css';
import { Form } from '@/components/ui/form/form';
import React, { useEffect } from 'react';
import { InputsProps } from '@/components/ui/input/input';
import { ButtonsProps } from '@/components/ui/button/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '@/store/auth/auth-slice';
import { AppDispatch, RootState } from '@/store';
import { LoginData } from '@/types/auth';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate('/');
		}
	}, [auth.isLoggedIn, navigate]);
	const { t } = useTranslation();

	const inputs: Array<InputsProps> = [
		{
			name: 'login',
			label: t('login'),
			placeholder: t('login'),
			error: '',
			type: 'text',
		},
		{
			name: 'password',
			label: t('password'),
			placeholder: t('password'),
			error: '',
			type: 'password',
		},
	];

	const handleSubmit = async (data: unknown) => {
		try {
			await dispatch(fetchLogin(data as LoginData)).unwrap();
		} catch (error) {
			console.error('Failed to login:', error);
		}
	};

	const goSingUpPage = (e: React.FormEvent) => {
		e.preventDefault();
		navigate('/signup');
	};

	const buttons: Array<ButtonsProps> = [
		{
			name: 'signin',
			children: t('sign_in'),
			type: 'submit',
		},
		{
			name: 'signup',
			children: t('signup'),
			onClick: goSingUpPage,
		},
	];
	return (
		<Form
			name={'login'}
			title={t('sign_in')}
			inputs={inputs}
			buttons={buttons}
			callback={handleSubmit}
			type="json"
		/>
	);
};
