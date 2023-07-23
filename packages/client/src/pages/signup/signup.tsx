import { useNavigate } from 'react-router-dom'
import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import Form from '../../components/ui/form/form'
import React from 'react'

function Signup() {
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

  const goLoginPage = () => {
    navigate('/login')
  }

  const buttons: Array<ButtonsProps> = [
    {
      name: 'signup',
      children: 'Sign up',
    },
    {
      name: 'signin',
      children: 'Sign in',
      onClick: goLoginPage,
    },
  ]
  return (
    <Form name={'signup'} title={'Sign up'} inputs={inputs} buttons={buttons} />
  )
}


export default Signup
