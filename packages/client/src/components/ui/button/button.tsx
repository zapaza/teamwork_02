import './button.pcss'
import { useNavigate } from 'react-router-dom'
export type ButtonsProps = {
  name: string
  children: string
  href?: string
  key?: string
}
const Button = (props: ButtonsProps) => {
  const navigate = useNavigate()
  const clickHandler = (e: MouseEvent) => {
    if (props.href) {
      e.preventDefault()
      navigate(props.href)
    }
  }
  return <button className={'button'} {...props} onClick={clickHandler} />
}

export default Button
