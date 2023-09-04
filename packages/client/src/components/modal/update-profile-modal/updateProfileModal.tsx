import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { ButtonsProps } from '@/components/ui/button/button';
import { Modal, ModalProps } from '@/components/modal/modal';
import { updateProfileSchema } from '@/core/validator';
import { Form } from '@/components/ui/form/form';
import { updateProfile } from '@/store/auth/auth-slice';
import { UpdateProfileReq } from '@/core/api/api-profile';
import { getProfileFieldsProps } from '@/utils/get-profile-fields-props';
import { t } from 'i18next';

type UpdateProfileModalProps = Omit<ModalProps, 'children'>;

export const UpdateProfileModal = (props: UpdateProfileModalProps) => {
	const dispatch: AppDispatch = useDispatch();
	const profileData = useSelector((state: RootState) => state.auth);
	const inputs = getProfileFieldsProps(profileData);

	const onSubmit = async (data: unknown) => {
		props.toggle();
		await dispatch(updateProfile(data as UpdateProfileReq)).unwrap();
	};

	const submitButton: ButtonsProps[] = [
		{
			name: 'update',
			children: t('update'),
		},
	];

	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<Form
				name={'updateProfile'}
				title={t('update_profile')}
				inputs={inputs}
				validationSchema={updateProfileSchema}
				buttons={submitButton}
				callback={onSubmit}
				type="json"
			/>
		</Modal>
	);
};
