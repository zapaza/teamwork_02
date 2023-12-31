import { InputsProps } from '@/components/ui/input/input';
import { ButtonsProps } from '@/components/ui/button/button';
import { Form } from '@/components/ui/form/form';
import { signUpSchema } from '@/core/validator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { checkAuth, fetchSignup } from '@/store/auth/auth-slice';
import { SignupData } from '@/types/auth';
import './signup-page.pcss';

export const SignupPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

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
		{
			name: 'repeat_password',
			label: t('repeat_password'),
			placeholder: t('repeat_password'),
			error: '',
			type: 'password',
		},
		{
			name: 'first_name',
			label: t('first_name'),
			placeholder: t('first_name'),
			error: '',
			type: 'text',
		},
		{
			name: 'second_name',
			label: t('second_name'),
			placeholder: t('second_name'),
			error: '',
			type: 'text',
		},
		{
			name: 'email',
			label: t('email'),
			placeholder: t('email'),
			error: '',
			type: 'text',
		},
		{
			name: 'phone',
			label: t('phone'),
			placeholder: '+7(999)999-99-99',
			error: '',
			type: 'text',
		},
	];

	const buttons: Array<ButtonsProps> = [
		{
			name: 'signup',
			children: t('signup'),
		},
	];
	const handleSubmit = async (data: unknown) => {
		try {
			await dispatch(fetchSignup(data as SignupData)).unwrap();
			await dispatch(checkAuth()).unwrap();
			navigate('/');
		} catch (error) {
			console.error('Failed to register:', error);
		}
	};

	return (
		<main className="signup-page">
			<Form
				name={'signup'}
				title={t('signup')}
				inputs={inputs}
				buttons={buttons}
				validationSchema={signUpSchema}
				callback={handleSubmit}
				type="json"
			/>
		</main>
	);
};
