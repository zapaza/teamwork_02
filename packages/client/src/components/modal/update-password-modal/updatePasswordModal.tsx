import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { ButtonsProps } from '@/components/ui/button/button';
import { Modal, ModalProps } from '@/components/modal/modal';
import { updatePasswordSchema } from '@/core/validator';
import { Form } from '@/components/ui/form/form';
import { updatePassword } from '@/store/auth/auth-slice';
import { UpdatePasswordReq } from '@/core/api/api-profile';
import { InputsProps } from '@/components/ui/input/input';
import { t } from 'i18next';

const submitButton: ButtonsProps[] = [
	{
		name: 'change',
		children: t('change'),
	},
];

const passwordsInputs: InputsProps[] = [
	{
		name: 'oldPassword',
		type: 'password',
		label: t('old_password'),
		placeholder: t('old_password'),
	},
	{
		name: 'newPassword',
		type: 'password',
		label: t('new_password'),
		placeholder: t('new_password'),
	},
	{
		name: 'newPasswordRepeat',
		type: 'password',
		label: t('repeat_new_password'),
		placeholder: t('repeat_new_password'),
	},
];

type UpdatePasswordModalProps = Omit<ModalProps, 'children'>;

export const UpdatePasswordModal = (props: UpdatePasswordModalProps) => {
	const dispatch: AppDispatch = useDispatch();

	const onSubmit = async (data: unknown) => {
		props.toggle();
		await dispatch(updatePassword(data as UpdatePasswordReq)).unwrap();
	};

	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<Form
				name={'updatePassword'}
				title={t('update_password')}
				inputs={passwordsInputs}
				validationSchema={updatePasswordSchema}
				buttons={submitButton}
				callback={onSubmit}
				type="json"
			/>
		</Modal>
	);
};
