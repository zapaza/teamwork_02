import Topic from '../../components/ui/topic/topic';
import Comment from '../../components/ui/comment/comment';
import './forum-topic-page.pcss';
import { Button } from '../../components/ui/button/button';
import { useState } from 'react';

const topicMock = {
	id: '1',
	topicTitle: 'Заголовок топика1',
	topicText:
		// eslint-disable-next-line max-len
		'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика',
};

function ForumTopicPage() {
	const currentUserMock = 'Ты';
	const [newCommentState, setNewCommentState] = useState('');
	const [comments, setComments] = useState([
		{
			id: '1',
			userName: 'Иван',
			commentText: 'Игра топ',
			date: new Date('08.06.2023'),
		},
		{
			id: '2',
			userName: 'Коля',
			commentText: 'Команда красавцы',
			date: new Date('08.06.2023'),
		},
	]);

	function addcommentHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		setComments([
			...comments,
			{
				id: (comments.length + 1).toString(),
				userName: currentUserMock,
				commentText: newCommentState,
				date: new Date('08.06.2023'),
			},
		]);
		setNewCommentState('');
	}

	function changeTextareaHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewCommentState(e.target.value);
	}

	return (
		<div className="forum-topic__container flex flex-column flex-ai-center">
			<Topic key={topicMock.id} {...topicMock}/>
			<h5 className="comments-header text-base-font-bold">Комментарии:</h5>
			{comments.map(item => (
				<Comment key={item.id} {...item}/>
			))}
			<form className="new-comment-form form__container flex flex-column">
				<h5 className="text-xl-font-bold">Оставить комментарий</h5>
				<textarea
					className="comments__textarea text-base-font-regular"
					onChange={changeTextareaHandler}
					value={newCommentState}></textarea>
				<Button
					name="addCommentBtn"
					className="button add-comment-button"
					onClick={addcommentHandler}>
					Отправить
				</Button>
			</form>
		</div>
	);
}

export default ForumTopicPage;
