import React from 'react';
import './comment.pcss';
import { CommentType } from '@/core/api/api-forum';

export const Comment = (props: CommentType) => {
	return (
		<div className="comment__container flex flex-column">
			<div className="comment__header flex flex-jc-sb">
				<h3 className="comment__username text-xl-font-bold">{props.author.schema.name}</h3>
				<span className="comment__date">{props.date}</span>
			</div>
			<p className="comment__text text-base-font-regular">{props.content}</p>
		</div>
	);
};
