import Input, { InputsProps } from '../input/input'
import React from 'react'
import './form.css'
import Button, { ButtonsProps } from '../button/button'
import LinkButton, { LinkButtonsProps } from '../button/linkButton'

export type FormProps = {
  name: string
  title?: string
  inputs: Array<InputsProps>
  buttons?: Array<ButtonsProps>
  linkButtons?: Array<LinkButtonsProps>
}
const Form = (props: FormProps) => {
  return (
    <div className={'form__container'}>
      {props.title && <h1 className={'form__header'}>{props.title}</h1>}
      <form className={'form'}>
        {props.inputs.map((input, index) => (
          <Input {...input} key={index.toString()} />
        ))}
        <div className={'form__button-wrapper'}>
          {props.buttons?.map((button, index) => (
            <Button {...button} key={index.toString()} />
          ))}
          {props.linkButtons?.map((linkButton, index) => (
            <LinkButton {...linkButton} key={index.toString()} />
          ))}
        </div>
      </form>
    </div>
  )
}

export default Form
