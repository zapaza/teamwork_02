import React from 'react'
import './createTopicModal.pcss'
import Button from '../button/button'
import Input from '../input/input'

type modalPropsType = {
  active: boolean
  handleClose: () => void
}

function CreateTopicModal(props: modalPropsType) {
  return (
    <div className={`create-topic-modal ${props.active ? 'active' : 'hide'}`}>
      <form className="form__container modal__form">
        <div className="close text-xl-font-bold" onClick={props.handleClose}>
          X
        </div>
        <Input
          name="TopicTheme"
          placeholder=""
          label="Тема"
          error=""
          type="text"
        />
        <textarea className="modal__textarea text-base-font-regular"></textarea>
        <Button
          name="addTopicBtn"
          children="Создать топик"
          className="button"
          onClick={e => {
            e.preventDefault()
          }}
        />
      </form>
    </div>
  )
}

export default CreateTopicModal
