import React, { useEffect, useState } from 'react';
import './topic.pcss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCurrentTopic } from '@/store/forum/forumSlice';
import { fetchTopicById } from '@/store/forum/forumThunk';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import smile from '../../../assets/smiley-happy-plus.svg';

export type TopicType = {
	id: number;
	header: string;
	content: string;
};

export type DBTopicType = {
	id: number;
	userId: number;
	content: string;
	header: string;
	created_at: string;
	updated_at: string;
};

export type DBNewTopicType = {
	userId: number;
	content: string;
	header: string;
};

export const Topic = (props: TopicType) => {
	const currentTopic = useSelector((state: RootState) => state.forum.currentTopic);
	const dispatch: AppDispatch = useDispatch();
	const { id } = useParams();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	useEffect(() => {
		async function topicById() {
			if (!currentTopic.header && !currentTopic.content && Boolean(id)) {
				await dispatch(fetchTopicById(Number(id)));
			} else return;
		}

		topicById();
	}, []);

	function handleTopicClick() {
		dispatch(setCurrentTopic({ ...props }));
		navigate(`/forum-topic/${props.id}`);
	}

	function handleSelectEmoji(data: any) {
		console.log(data.unified);
		setShowEmojiPicker(!showEmojiPicker);
	}

	const navigate = useNavigate();
	return (
		<div className="topic__container flex flex-column" onClick={() => handleTopicClick()}>
			<h3 className="topic__header">{props.header}</h3>
			<p className="topic__text text-base-font-regular">{props.content}</p>
			<div className="picker__container">
				<img
					src={smile}
					alt="smile icon"
					className="smile-icon"
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				/>
				<div className="emoji-picker">
					{showEmojiPicker && <Picker data={data} onEmojiSelect={handleSelectEmoji}/>}
				</div>
			</div>
			<span>{String.fromCodePoint(0x1f60d)}</span>
		</div>
	);
};
