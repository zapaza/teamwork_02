import React from 'react';
import './comment.pcss';

export type CommentPropsType = {
	id: string;
	userName: string;
	commentText: string;
	date: Date;
};

function Comment(props: CommentPropsType) {
	return (
		<div className="comment__container flex flex-column">
			<div className="comment__header flex flex-jc-sb">
				<h3 className="comment__username text-xl-font-bold">{props.userName}</h3>
				<span className="comment__date">{props.date.toLocaleDateString()}</span>
			</div>
			<p className="comment__text text-base-font-regular">{props.commentText}</p>
		</div>
	);
}

export default Comment;
