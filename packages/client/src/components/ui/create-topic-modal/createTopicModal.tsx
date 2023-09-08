import React from 'react';
import './create-topic-modal.pcss';
import { Button } from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { t } from 'i18next';

type modalPropsType = {
	active: boolean;
	handleClose: () => void;
};

export const CreateTopicModal = (props: modalPropsType) => {
	return (
		<div className={`create-topic-modal ${props.active ? 'active' : 'hide'}`}>
			<form className="form__container modal__form">
				<div className="close text-xl-font-bold" onClick={props.handleClose}>
					X
				</div>
				<Input name="TopicTheme" placeholder="" label={t('theme')} error="" type="text"/>
				<textarea className="modal__textarea text-base-font-regular"></textarea>
				<Button
					name="addTopicBtn"
					className="button"
					onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
						e.preventDefault();
					}}>
					{t('create_topic')}
				</Button>
			</form>
		</div>
	);
};
