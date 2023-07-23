import './login.css'
import Form from '../../components/ui/form/form'
import React from 'react'
import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()

  const inputs: Array<InputsProps> = [
    {
      name: 'login',
      label: 'Login',
      placeholder: 'Login',
      error: '',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      error: '',
      type: 'password',
    },
  ]

  const goSingUpPage = () => {
    navigate('/signup')
  }

  const buttons: Array<ButtonsProps> = [
    {
      name: 'signin',
      children: 'Sign in',
    },
    {
      name: 'signup',
      children: 'Sign up',
      onClick: goSingUpPage,
    },
  ]
  return (
    <Form name={'login'} title={'Sign in'} inputs={inputs} buttons={buttons} />
  )
}

export default Login
