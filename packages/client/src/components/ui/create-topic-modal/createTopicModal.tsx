import React from 'react';
import './create-topic-modal.pcss';
import Input from '@/components/ui/input/input';
import { t } from 'i18next';

type modalPropsType = {
	active: boolean;
	handleClose: () => void;
	handleSubmit: (data: unknown) => Promise<void>;
};

export const CreateTopicModal = (props: modalPropsType) => {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			header: formData.get('TopicTheme')!.toString(),
			content: formData.get('TopicContent')!.toString(),
		};
		props.handleSubmit(data);
		event.currentTarget.reset();
		props.handleClose();
	};

	return (
		<div className={`create-topic-modal ${props.active ? 'active' : 'hide'}`}>
			<form className="form__container modal__form" onSubmit={onSubmit}>
				<div className="close text-xl-font-bold" onClick={props.handleClose}>
					X
				</div>
				<Input name="TopicTheme" placeholder="" label={t('theme')} error="" type="text"/>
				<textarea
					className="modal__textarea text-base-font-regular"
					name="TopicContent"></textarea>
				<button
					type="submit"
					name="addTopicBtn"
					className="button"
					onClick={props.handleSubmit}>
					{t('create_topic')}
				</button>
			</form>
		</div>
	);
};
