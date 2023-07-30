import { FC, ReactNode } from 'react'
import './wrapper.pcss'

type OwnProps = {
  children?: ReactNode
}

type WrapperProps = FC<OwnProps>

const Wrapper: WrapperProps = props => {
  return (
    <div className="wrapper flex flex-column gap-16">
      {props.children}
    </div>
  )
}

export default Wrapper
