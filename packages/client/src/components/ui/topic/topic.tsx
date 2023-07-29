import React from 'react'
import './topic.pcss'
import { useNavigate } from 'react-router-dom'

export type TopicType = {
  id: string
  topicTitle: string
  topicText: string
}

function Topic(props: TopicType) {
  const navigate = useNavigate()
  return (
    <div
      className="topic__container flex flex-column"
      onClick={() => navigate('/forum-topic')}>
      <h3 className="topic__header">{props.topicTitle}</h3>
      <p className="topic__text text-base-font-regular">{props.topicText}</p>
    </div>
  )
}

export default Topic
