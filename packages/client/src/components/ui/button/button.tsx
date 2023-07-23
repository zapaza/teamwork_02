import './button.pcss'
import React, { memo } from 'react'
export interface ButtonsProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string
  key?: string
}
const Button = memo((props: ButtonsProps) => {
  return <button className="button" {...props} />
})

export default Button
