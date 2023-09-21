import React, { useState } from 'react';
import './create-topic-modal.pcss';
import Input from '@/components/ui/input/input';
import { t } from 'i18next';
import { DBNewTopicType } from '../topic/topic';

type modalPropsType = {
	active: boolean;
	handleClose: () => void;
	handleSubmit: (data: DBNewTopicType) => Promise<void>;
};

export const CreateTopicModal = (props: modalPropsType) => {
	const [newTopicHeader, setNewTopicHeader] = useState('');
	const [newtopicContent, setNewTopicContent] = useState('');

	function changeTextareaHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewTopicContent(e.target.value);
	}

	function changeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setNewTopicHeader(e.target.value);
	}

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const data = {
			//TODO добавить userID
			userId: 1234,
			content: newtopicContent,
			header: newTopicHeader,
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
				<Input
					name="TopicTheme"
					placeholder=""
					label={t('theme')}
					error=""
					type="text"
					onChange={changeInputHandler}
					value={newTopicHeader}
				/>
				<textarea
					className="modal__textarea text-base-font-regular"
					name="TopicContent"
					onChange={changeTextareaHandler}
					value={newtopicContent}>
					{' '}
				</textarea>
				<button
					type="submit"
					name="addTopicBtn"
					className="button"
					onClick={() => {
						props.handleSubmit;
					}}>
					{t('create_topic')}
				</button>
			</form>
		</div>
	);
};
