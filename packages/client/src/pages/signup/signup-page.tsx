import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import Form from '../../components/ui/form/form'
import React from 'react'
import { signUpSchema } from '../../core/validator'

function Signup() {
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
    {
      name: 'repeat_password',
      label: 'Repeat password',
      placeholder: 'Repeat password',
      error: '',
      type: 'password',
    },
    {
      name: 'first_name',
      label: 'First name',
      placeholder: 'First name',
      error: '',
      type: 'text',
    },
    {
      name: 'second_name',
      label: 'Second name',
      placeholder: 'Second name',
      error: '',
      type: 'text',
    },
    {
      name: 'email',
      label: 'E-mail',
      placeholder: 'E-mail',
      error: '',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: '+7(999)999-99-99',
      error: '',
      type: 'text',
    },
  ]

  const buttons: Array<ButtonsProps> = [
    {
      name: 'signup',
      children: 'Sign up',
    },
  ]
  const handleSubmit = async (data: unknown) => {
    // registration here
  }

  return (
    <Form
      name={'signup'}
      title={'Sign up'}
      inputs={inputs}
      buttons={buttons}
      validationSchema={signUpSchema}
      callback={handleSubmit}
      type="json"
    />
  )
}

export default Signup
