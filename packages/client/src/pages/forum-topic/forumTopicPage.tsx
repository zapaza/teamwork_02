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
import { yupResolver } from '@hookform/resolvers/yup';
import { createCommentSchema } from '@/core/validator';
import { useForm } from 'react-hook-form';

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

	async function addcommentHandler() {
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createCommentSchema),
	});

	return (
		<div className="forum-topic__container flex flex-column flex-ai-center">
			<Topic key={currentTopic.id} {...currentTopic}/>
			<h5 className="comments-header text-base-font-bold">{t('comments')}:</h5>
			{currentTopic.comments &&
				currentTopic.comments.map((item: any) => <Comment key={item.id} {...item}/>)}
			<form
				className="new-comment-form form__container flex flex-column"
				onSubmit={handleSubmit(addcommentHandler)}>
				<h5 className="text-xl-font-bold new-comment-form__header">
					{t('leave_a_comment')}
				</h5>
				<textarea
					{...register('Comment')}
					name="Comment"
					className="comments__textarea text-base-font-regular"
					onChange={changeTextareaHandler}
					value={newCommentState}></textarea>
				<p className="input__error">{errors.Comment?.message}</p>
				<Button name="addCommentBtn" className="button add-comment-button">
					{t('send')}
				</Button>
			</form>
		</div>
	);
};
