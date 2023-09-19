import React, { useEffect } from 'react';
import './topic.pcss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCurrentTopic } from '@/store/forum/forumSlice';
import { fetchTopicById } from '@/store/forum/forumThunk';

export type TopicType = {
	id: number;
	header: string;
	content: string;
};

export const Topic = (props: TopicType) => {
	const currentTopic = useSelector((state: RootState) => state.forum.currentTopic);
	const dispatch: AppDispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		async function topicById() {
			if (!currentTopic.header && !currentTopic.content) {
				await dispatch(fetchTopicById(Number(id)));
			} else return;
		}

		topicById();
	}, []);

	function handleTopicClick() {
		dispatch(setCurrentTopic({ ...props }));
		navigate(`/forum-topic/${props.id}`);
	}

	const navigate = useNavigate();
	return (
		<div className="topic__container flex flex-column" onClick={() => handleTopicClick()}>
			<h3 className="topic__header">{props.header}</h3>
			<p className="topic__text text-base-font-regular">{props.content}</p>
		</div>
	);
};
