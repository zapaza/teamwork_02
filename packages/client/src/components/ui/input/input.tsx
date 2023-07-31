import React, { LegacyRef } from 'react'
import './input.pcss'
export type InputsProps = {
  name: string
  label: string
  type: string
  placeholder: string
  value?: string
  error?: string
  key?: string
}
const Input = React.forwardRef((props: InputsProps, ref) => {
  return (
    <div className={'input__wrapper flex flex-column'}>
      <label className={'input__label'}>{props.label}</label>
      <input
        {...props}
        className={'input__item'}
        id={props.name}
        ref={ref as LegacyRef<HTMLInputElement>}
      />
      {props.error && <p className={'input__error'}>{props.error}</p>}
    </div>
  )
})

export default Input
