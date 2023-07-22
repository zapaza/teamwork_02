import './login-page.css'
import Form from '../../components/ui/form/form'
import React from 'react'
import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
function LoginPage() {
  const inputs: Array<InputsProps> = [
    {
      name: 'Login',
      placeholder: 'Login',
      error: '',
      type: 'text',
    },
    {
      name: 'Password',
      placeholder: 'Password',
      error: '',
      type: 'password',
    },
  ]
  const buttons: Array<ButtonsProps> = [
    {
      name: 'signin',
      children: 'Sign in',
    },
    {
      name: 'signup',
      children: 'Sign up',
      href: '/signup',
    },
  ]
  return (
    <Form name={'login'} title={'Sign in'} inputs={inputs} buttons={buttons} />
  )
}

export default LoginPage
