import { Topic } from '@/components/ui/topic/topic';
import { Comment } from '@/components/ui/comment/comment';
import { Button } from '@/components/ui/button/button';
import { useEffect, useState } from 'react';
import './forum-topic-page.pcss';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchTopicById } from '@/store/forum/forumThunk';
import { DBNewComment, apiForum } from '@/core/api/api-forum';
import { useParams } from 'react-router-dom';

export type CommentPropsType = {
	userName: string;
	date: string;
	content: string;
};

export const ForumTopicPage = () => {
	const currentTopic = useSelector((state: RootState) => state.forum.currentTopic);
	const user = useSelector((state: RootState) => state.auth);
	const { id } = useParams();
	const [newCommentState, setNewCommentState] = useState('');
	const dispatch: AppDispatch = useDispatch();

	async function topicById() {
		await dispatch(fetchTopicById(Number(id)));
	}

	useEffect(() => {
		topicById();
	}, []);

	async function addcommentHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		if (user.id) {
			const newComment: DBNewComment = {
				topicId: currentTopic.id,
				content: newCommentState,
				userId: user.id,
			};
			await apiForum.addComment(newComment);
		}
		setNewCommentState('');
		topicById();
	}

	function changeTextareaHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewCommentState(e.target.value);
	}

	return (
		<div className="forum-topic__container flex flex-column flex-ai-center">
			<Topic key={currentTopic.id} {...currentTopic}/>
			<h5 className="comments-header text-base-font-bold">{t('comments')}:</h5>
			{currentTopic.comments &&
				currentTopic.comments.map((item: any) => <Comment key={item.id} {...item}/>)}
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
