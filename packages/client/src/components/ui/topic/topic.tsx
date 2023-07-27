import React from 'react'
import './topic.pcss'

export type TopicType = {
  id: string;
  topicTitle: string;
  topicText: string;
}

function Topic(props: TopicType) {
  return (
    <div className="topic__container flex flex-column">
      <h3 className='topic__header'>{props.topicTitle}</h3>
      <p>{props.topicText}</p>
    </div>
  )
}

export default Topic
