import { Topic } from '@/components/ui/topic/topic';
import { Comment } from '@/components/ui/comment/comment';
import { Button } from '@/components/ui/button/button';
import { useEffect, useState } from 'react';
import './forum-topic-page.pcss';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { apiForum, CommentType } from '@/core/api/api-forum';
import { fetchAllComments } from '@/store/forum/forumThunk';
import { useLocation } from 'react-router-dom';

export const ForumTopicPage = () => {
	const user = useSelector((state: RootState) => state.auth);
	const forum = useSelector((state: RootState) => state.forum);
	const [newCommentState, setNewCommentState] = useState('');
	const dispatch: AppDispatch = useDispatch();
	const searchParam = useLocation().search;
	const topicId = Number(new URLSearchParams(searchParam).get('id'));
	const currentTopic = forum.data.topics.find(item => item.id === topicId);

	useEffect(() => {
		const fetchComments = () => {
			dispatch(fetchAllComments({ id: topicId }));
		};

		fetchComments();
	}, []);

	async function addcommentHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		const newComment: CommentType = {
			author: {
				schema: {
					id: user.id!,
					name: user.display_name ? user.display_name : user.login,
				},
			},
			topicId,
			content: newCommentState,
			date: new Date().toLocaleTimeString(),
		};
		setNewCommentState('');
		await apiForum.addComment(newComment);
		await dispatch(fetchAllComments({ id: topicId }));
	}

	function changeTextareaHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewCommentState(e.target.value);
	}
	if (!currentTopic) {
		throw new Error('Topic not found');
	}
	return (
		<div className="forum-topic__container flex flex-column flex-ai-center">
			{currentTopic && <Topic key={topicId} {...currentTopic}/>}
			<h5 className="comments-header text-base-font-bold">{t('comments')}:</h5>
			{forum.data.comments &&
				forum.data.comments.map((item: CommentType) => <Comment key={item.id} {...item}/>)}
			<form className="new-comment-form form__container flex flex-column">
				<h5 className="text-xl-font-bold">{t('leave_a_comment')}</h5>
				<textarea
					className="comments__textarea text-base-font-regular"
					onChange={changeTextareaHandler}
					value={newCommentState}></textarea>
				<Button
					name="addCommentBtn"
					className="button add-comment-button"
					onClick={addcommentHandler}>
					{t('send')}
				</Button>
			</form>
		</div>
	);
};
