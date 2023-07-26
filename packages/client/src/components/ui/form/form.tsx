import Input, { InputsProps } from '../input/input'
import React from 'react'
import './form.pcss'
import Button, { ButtonsProps } from '../button/button'

export type FormProps = {
  name: string
  title?: string
  inputs: Array<InputsProps>
  buttons?: Array<ButtonsProps>
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}
const Form = (props: FormProps) => {
  return (
    <div
      className={
        'form__container flex flex-column flex-jc-center flex-ai-center'
      }>
      {props.title && <h1 className={'form__header'}>{props.title}</h1>}
      <form
        className={'form__item flex flex-column flex-jc-center flex-ai-center'}
        onSubmit={props.onSubmit}>
        {props.inputs.map((input, index) => (
          <Input {...input} key={index.toString()} />
        ))}
        <div className={'form__button-wrapper'}>
          {props.buttons?.map((button, index) => (
            <Button {...button} key={index.toString()} />
          ))}
        </div>
      </form>
    </div>
  )
}

export default Form
