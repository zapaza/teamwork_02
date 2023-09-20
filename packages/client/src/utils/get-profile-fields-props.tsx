import { InputsProps } from '@/components/ui/input/input';
import { AuthState } from '@/types/auth';
import { t } from 'i18next';

export function getProfileFieldsProps(profileData: AuthState): InputsProps[] {
	return [
		{
			name: 'email',
			type: 'text',
			label: t('email'),
			placeholder: t('email'),
			value: profileData.email,
		},
		{
			name: 'login',
			type: 'text',
			label: t('login'),
			placeholder: t('login'),
			value: profileData.login,
		},
		{
			name: 'first_name',
			type: 'text',
			label: t('first_name'),
			placeholder: t('first_name'),
			value: profileData.first_name,
		},
		{
			name: 'second_name',
			type: 'text',
			label: t('second_name'),
			placeholder: t('second_name'),
			value: profileData.second_name,
		},
		{
			name: 'display_name',
			type: 'text',
			label: t('display_name'),
			placeholder: t('display_name'),
			value: profileData.display_name,
		},
		{
			name: 'phone',
			type: 'tel',
			label: t('phone'),
			placeholder: t('phone'),
			value: profileData.phone,
		},
	];
}
