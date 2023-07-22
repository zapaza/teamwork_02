import './button.css'
export type LinkButtonsProps = {
  name: string
  href: string
  children: string
  key?: string
}
const LinkButtons = (props: LinkButtonsProps) => {
  return <a className={'button'} {...props} />
}

export default LinkButtons
