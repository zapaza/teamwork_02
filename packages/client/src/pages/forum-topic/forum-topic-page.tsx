import Topic from '../../components/ui/topic/topic'
import Comment from '../../components/ui/comment/comment'
import './forum-topic-page.pcss'
import Button from '../../components/ui/button/button'

const topicMock = {
  id: '1',
  topicTitle: 'Заголовок топика1',
  topicText:
    'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика',
}

const commentsMock = [
  { id: '1', userName: 'Иван', commentText: 'Игра топ', date: new Date() },
  {
    id: '2',
    userName: 'Коля',
    commentText: 'Команда красавцы',
    date: new Date(),
  },
]

const newCommentMock =
  'Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий Новый комментарий'

function ForumTopicPage() {
  return (
    <div className="forum-topic__container flex flex-column flex-ai-center">
      <Topic key={topicMock.id} {...topicMock} />
      <h5 className="comments-header text-base-font-bold">Комментарии:</h5>
      {commentsMock.map(item => (
        <Comment {...item} />
      ))}
      <form className="new-comment-form form__container flex flex-column">
        <h5 className="text-xl-font-bold">Оставить комментарий</h5>
        <textarea className="comments__textarea">{newCommentMock}</textarea>
        <Button
          name="addCommentBtn"
          children="Отправить"
          className="button add-comment-button"
        />
      </form>
    </div>
  )
}

export default ForumTopicPage
