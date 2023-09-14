import React from 'react';
import './topic.pcss';
import { useNavigate } from 'react-router-dom';
import { TopicType } from '@/core/api/api-forum';

export const Topic = (props: TopicType) => {
	const navigate = useNavigate();
	return (
		<div className="topic__container flex flex-column" onClick={() => navigate(`/forum-topic?id=${props.id}`)}>
			<h3 className="topic__header">{props.header}</h3>
			<p className="topic__text text-base-font-regular">{props.content}</p>
		</div>
	);
};
