import { InputsProps } from '../components/ui/input/input';
import { AuthState } from '../types/auth';

export default function getProfileFieldsProps(profileData: AuthState): InputsProps[] {
	return [
		{
			name: 'email',
			type: 'text',
			label: 'Email',
			placeholder: 'Email',
			value: profileData.email,
		},
		{
			name: 'login',
			type: 'text',
			label: 'Login',
			placeholder: 'Login',
			value: profileData.login,
		},
		{
			name: 'first_name',
			type: 'text',
			label: 'First Name',
			placeholder: 'First Name',
			value: profileData.first_name,
		},
		{
			name: 'second_name',
			type: 'text',
			label: 'Second Name',
			placeholder: 'Second name',
			value: profileData.second_name,
		},
		{
			name: 'display_name',
			type: 'text',
			label: 'Display Name',
			placeholder: 'Display Name',
			value: profileData.display_name,
		},
		{
			name: 'phone',
			type: 'tel',
			label: 'Phone',
			placeholder: 'Phone',
			value: profileData.phone,
		},
	];
}
