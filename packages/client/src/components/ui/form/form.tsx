import Input, { InputsProps } from '../input/input'
import { useForm } from "react-hook-form"
import React from 'react'
import './form.pcss'
import Button, { ButtonsProps } from '../button/button'

export type FormProps = {
  name: string
  title?: string
  inputs: Array<InputsProps>
  buttons?: Array<ButtonsProps>
}
const Form = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
  })
  const onSubmit = () => console.log(getValues())

  return (
    <div
      className={
        'form__container flex flex-column flex-jc-center flex-ai-center'
      }>
      {props.title && <h1 className={'form__header'}>{props.title}</h1>}
      <form
        className={'form__item flex flex-column flex-jc-center flex-ai-center'}
        onSubmit={handleSubmit(onSubmit)}
      >
        {props.inputs.map((input, index) => (
          <Input {...input} {...register(input.name)} key={index.toString()} />
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
