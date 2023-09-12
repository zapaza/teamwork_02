import React from 'react';
import './topic.pcss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCurrentTopic } from '@/store/forum/forumSlice';

export type TopicType = {
	id: number;
	header: string;
	content: string;
};

export const Topic = (props: TopicType) => {
	const currentTopic = useSelector((state: RootState) => state.forum.currentTopic);
	const dispatch: AppDispatch = useDispatch();

	function handleTopicClick() {
		console.log(props);
		dispatch(setCurrentTopic({ ...props }));
		console.log(currentTopic);
		navigate('/forum-topic');
	}

	const navigate = useNavigate();
	return (
		<div className="topic__container flex flex-column" onClick={() => handleTopicClick()}>
			<h3 className="topic__header">{props.header}</h3>
			<p className="topic__text text-base-font-regular">{props.content}</p>
		</div>
	);
};
