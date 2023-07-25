import React, { LegacyRef, useState } from 'react'
import './input.pcss'
export type InputsProps = {
  name: string
  label: string
  type: string
  placeholder: string
  value?: string
  error: string | undefined
  key?: string
}
const Input = React.forwardRef((props: InputsProps, ref) => {
  const [value, setValue] = useState('')

  return (
    <div className={'input__wrapper flex flex-column'}>
      <label className={'input__label'}>{props.label}</label>
      <input
        {...props}
        className={'input__item'}
        // onChange={event => setValue(event.target.value)}
        // value={value}
        id={props.name}
        ref={ref as LegacyRef<HTMLInputElement>}
      />
      {props.error && <p className={'input__error'}>{props.error}</p>}
    </div>
  )
})

export default Input
