import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import Form from '../../components/ui/form/form'
import React from 'react'
import { signUpSchema } from '../../core/validator'
import { useTranslation } from 'react-i18next'

function Signup() {
  const { t } = useTranslation()

  const inputs: Array<InputsProps> = [
    {
      name: 'login',
      label: t('login'),
      placeholder: t('login'),
      error: '',
      type: 'text',
    },
    {
      name: 'password',
      label: t('password'),
      placeholder: t('password'),
      error: '',
      type: 'password',
    },
    {
      name: 'repeat_password',
      label: t('repeat_password'),
      placeholder: t('repeat_password'),
      error: '',
      type: 'password',
    },
    {
      name: 'first_name',
      label: t('first_name'),
      placeholder: t('first_name'),
      error: '',
      type: 'text',
    },
    {
      name: 'second_name',
      label: t('second_name'),
      placeholder: t('second_name'),
      error: '',
      type: 'text',
    },
    {
      name: 'email',
      label: t('email'),
      placeholder: t('email'),
      error: '',
      type: 'text',
    },
    {
      name: 'phone',
      label: t('phone'),
      placeholder: '+7(999)999-99-99',
      error: '',
      type: 'text',
    },
  ]

  const buttons: Array<ButtonsProps> = [
    {
      name: 'signup',
      children: t('signup'),
    },
  ]
  const handleSubmit = async (data: unknown) => {
    // registration here
  }

  return (
    <Form
      name={'signup'}
      title={t('signup')}
      inputs={inputs}
      buttons={buttons}
      validationSchema={signUpSchema}
      callback={handleSubmit}
      type="json"
    />
  )
}

export default Signup
