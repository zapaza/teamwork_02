import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { ButtonsProps } from '@/components/ui/button/button';
import { Modal, ModalProps } from '@/components/modal/modal';
import { updateAvatarSchema } from '@/core/validator';
import { Form } from '@/components/ui/form/form';
import { updateAvatar } from '@/store/auth/auth-slice';
import { InputsProps } from '@/components/ui/input/input';
import { t } from 'i18next';

const submitButton: ButtonsProps[] = [
	{
		name: 'update',
		children: t('update'),
	},
];

const avatarInputs: InputsProps[] = [
	{
		name: 'avatar',
		type: 'file',
		label: t('new_avatar'),
		placeholder: '',
	},
];

type UpdateAvatarModalProps = Omit<ModalProps, 'children'>;

export const UpdateAvatarModal = (props: UpdateAvatarModalProps) => {
	const dispatch: AppDispatch = useDispatch();

	const onSubmit = async (data: unknown) => {
		props.toggle();
		await dispatch(updateAvatar(data as FormData)).unwrap();
	};

	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<Form
				name={'updateAvatar'}
				title={t('update_avatar')}
				inputs={avatarInputs}
				validationSchema={updateAvatarSchema}
				buttons={submitButton}
				callback={onSubmit}
				type="formData"
			/>
		</Modal>
	);
};
