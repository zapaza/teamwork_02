import React from 'react'
import './input.pcss'
export type InputsProps = {
  name: string
  label: string
  type: string
  placeholder: string
  error: string | undefined
  key?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = (props: InputsProps) => {
  return (
    <div className={'input__wrapper flex flex-column'}>
      <label className={'input__label'} htmlFor={props.name}>{props.label}</label>
      <input
        {...props}
        className={'input__item'}
        id={props.name}
      />
      {props.error && <p className={'input__error'}>{props.error}</p>}
    </div>
  )
}

export default Input
