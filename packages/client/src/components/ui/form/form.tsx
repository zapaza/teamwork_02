import Input, { InputsProps } from '../input/input'
import { useForm, Controller, UseFormProps } from 'react-hook-form'
import React from 'react'
import './form.pcss'
import Button, { ButtonsProps } from '../button/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData } from '../../../types/auth'

export type FormProps = {
  name: string
  title?: string
  inputs: Array<InputsProps>
  buttons?: Array<ButtonsProps>
  validationSchema?: any
  callback: (data: LoginData) => Promise<void >
}
const Form = (props: FormProps) => {
  const validatorSettings: UseFormProps = {
    resolver: yupResolver(props.validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  }
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = props.validationSchema ? useForm(validatorSettings) : useForm({})
  const onSubmit = () => props.callback(getValues() as LoginData)

  return (
    <div
      className={
        'form__container flex flex-column flex-jc-center flex-ai-center'
      }>
      {props.title && <h1 className={'form__header'}>{props.title}</h1>}
      <form
        className={'form__item flex flex-column flex-jc-center flex-ai-center'}
        onSubmit={handleSubmit(onSubmit)}>
        {props.inputs.map((input, index) => (
          <Controller
            //ts меня тут решил помучить, есть идеи как красиво это убрать оишбку?
            name={input.name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...input}
                //ts меня тут решил помучить, есть идеи как красиво это убрать оишбку?
                error={errors[input.name]?.message}
                key={index.toString()}
                {...field}
              />
            )}
            key={index.toString()}></Controller>
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
