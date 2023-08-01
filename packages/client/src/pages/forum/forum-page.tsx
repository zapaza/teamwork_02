import Button from '../../components/ui/button/button'
import Topic from '../../components/ui/topic/topic'
import CreateTopicModal from '../../components/ui/create-topic-modal/create-topic-modal'
import './forum-page.pcss'
import { useState } from 'react'

const forumMock = [
  {
    id: '1',
    topicTitle: 'Заголовок топика1',
    topicText:
      'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
  },
  {
    id: '2',
    topicTitle: 'Заголовок топика2',
    topicText:
      'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
  },
  {
    id: '3',
    topicTitle: 'Заголовок топика3',
    topicText:
      'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
  },
  {
    id: '4',
    topicTitle: 'Заголовок топика4',
    topicText:
      'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
  },
]

function ForumPage() {
  const [activeModal, setActiveModal] = useState(false)

  function changeActive() {
    setActiveModal(!activeModal)
  }

  return (
    <>
      <div className="forum__container flex">
        <div className="all-topic-container flex flex-column">
          {forumMock.map(item => (
            <Topic key={item.id} {...item} />
          ))}
        </div>
        <Button
          name="createTopicBtn"
          children="Создать топик"
          className="button text-base-font-regular create-topic-btn"
          onClick={changeActive}
        />
      </div>
      <CreateTopicModal active={activeModal} handleClose={changeActive} />
    </>
  )
}

export default ForumPage
