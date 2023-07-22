import React, { LegacyRef, useState } from 'react'
import './input.css'
export type InputsProps = {
  name: string
  type: string
  placeholder: string
  value?: string
  error: string | undefined
  key?: string
}
const Input = React.forwardRef((props: InputsProps, ref) => {
  const [value, setValue] = useState('')
  return (
    <div className={'input__wrapper'}>
      <label className={'input__label'} id={props.name}>
        {' '}
        {props.name}
      </label>
      <input
        {...props}
        className={'input'}
        onChange={event => setValue(event.target.value)}
        value={value}
        ref={ref as LegacyRef<HTMLInputElement>}
      />
      {props.error && <p className={'input__error'}>{props.error}</p>}
    </div>
  )
})

export default Input
