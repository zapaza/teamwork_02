import './login-page.css'
import Form from '../../components/ui/form/form'
import React, { useState, useEffect } from 'react'
import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, fetchLogin } from '../../store/auth/authSlice'
import { RootState, AppDispatch } from '../../store'

function LoginPage() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/main')
    }
  }, [auth.isLoggedIn, navigate])

  const inputs: Array<InputsProps> = [
    {
      name: 'login',
      label: 'Login',
      placeholder: 'Login',
      error: '',
      type: 'text',
      onChange: e => setLoginValue(e?.target?.value),
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      error: '',
      type: 'password',
      onChange: e => setPasswordValue(e?.target?.value), // обновляем значение в состоянии при изменении поля
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ login: loginValue, password: passwordValue })

    try {
      // ожидаем выполнения fetchLogin
      await dispatch(
        fetchLogin({ login: loginValue, password: passwordValue }) as any
      ).unwrap()
      // затем выполняем checkAuth
      await dispatch(checkAuth() as any).unwrap()
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  const goSingUpPage = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/signup')
  }

  const buttons: Array<ButtonsProps> = [
    {
      name: 'signin',
      children: 'Sign in',
      type: 'submit',
    },
    {
      name: 'signup',
      children: 'Sign up',
      onClick: goSingUpPage,
    },
  ]
  return (
    <Form
      name={'login'}
      title={'Sign in'}
      inputs={inputs}
      buttons={buttons}
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
