import './button.css'
export type ButtonsProps = {
  name: string
  children: string
  key?: string
}
const Button = (props: ButtonsProps) => {
  return <button className={'button'} {...props} />
}

export default Button
