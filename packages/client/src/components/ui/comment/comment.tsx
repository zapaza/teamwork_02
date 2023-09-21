import React, { useEffect } from 'react';
import './comment.pcss';
import { CommentType } from '@/core/api/api-forum';
import { fetchUserById } from '@/store/forum/forumThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

export const Comment = (props: CommentType) => {
	const dispatch: AppDispatch = useDispatch();
	const user = useSelector((state: RootState) => state.forum.user);

	useEffect(() => {
		async function fetchUser() {
			await dispatch(fetchUserById(props.userId));
		}

		fetchUser();
	}, []);

	const userName = user.find(el => el.id == props.userId);

	return (
		<div className="comment__container flex flex-column">
			<div className="comment__header flex flex-jc-sb">
				<h3 className="comment__username text-xl-font-bold">
					{userName?.display_name || userName?.login}
				</h3>
				<span className="comment__date">
					{new Date(props.created_at).toLocaleDateString()}
				</span>
			</div>
			<p className="comment__text text-base-font-regular">{props.content}</p>
		</div>
	);
};
