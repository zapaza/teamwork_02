import Input, { InputsProps } from '../input/input'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import './form.pcss'
import Button, { ButtonsProps } from '../button/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthSchema } from '../../../core/validator'

export type FormProps = {
  name: string
  title?: string
  inputs: Array<InputsProps>
  buttons?: Array<ButtonsProps>
}

const Form = (props: FormProps) => {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  })
  const onSubmit = () => console.log(getValues(), errors)

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
            name={input.name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...input}
                error={errors[input.name]?.message}
                key={index.toString()}
                {...field}
              />
            )}
            key={index.toString()}
          />
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
