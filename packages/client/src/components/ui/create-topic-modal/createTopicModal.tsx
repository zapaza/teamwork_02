import React, { useState } from 'react';
import './create-topic-modal.pcss';
import Input from '@/components/ui/input/input';
import { t } from 'i18next';
import { DBNewTopicType } from '../topic/topic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { createTopicSchema } from '@/core/validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import closeIcon from '../../../assets/cross.svg';

type modalPropsType = {
	active: boolean;
	handleClose: () => void;
	handleSubmit: (data: DBNewTopicType) => Promise<void>;
};

export const CreateTopicModal = (props: modalPropsType) => {
	const [newTopicHeader, setNewTopicHeader] = useState('');
	const [newtopicContent, setNewTopicContent] = useState('');
	const user = useSelector((state: RootState) => state.auth);

	function changeTextareaHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewTopicContent(e.target.value);
	}

	function changeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setNewTopicHeader(e.target.value);
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(createTopicSchema),
	});

	const onSubmit = () => {
		const data = {
			userId: user.id!,
			content: newtopicContent,
			header: newTopicHeader,
		};
		props.handleSubmit(data);
		props.handleClose();
		reset();
		setNewTopicHeader('');
		setNewTopicContent('');
	};

	return (
		<div className={`create-topic-modal ${props.active ? 'active' : 'hide'}`}>
			<form className="form__container modal__form" onSubmit={handleSubmit(onSubmit)}>
				<div className="close text-xl-font-bold" onClick={props.handleClose}>
					<img src={closeIcon} alt="close button"/>
				</div>
				<Input
					{...register('TopicTheme')}
					name="TopicTheme"
					placeholder=""
					label={t('theme')}
					error=""
					type="text"
					onChange={changeInputHandler}
					value={newTopicHeader}
				/>
				<p className="input__error">{errors.TopicTheme?.message}</p>
				<textarea
					{...register('TopicContent')}
					className="modal__textarea text-base-font-regular"
					name="TopicContent"
					onChange={changeTextareaHandler}
					value={newtopicContent}>
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
