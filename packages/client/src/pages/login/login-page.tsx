import './login-page.css'
import Form from '../../components/ui/form/form'
import React, { useEffect } from 'react'
import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../store/auth/auth-slice'
import { RootState, AppDispatch } from '../../store'
import { LoginData } from '../../types/auth'

function LoginPage() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

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
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      error: '',
      type: 'password',
    },
  ]

  const handleSubmit = async (data: unknown) => {
    try {
      await dispatch(fetchLogin(data as LoginData)).unwrap()
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
      callback={handleSubmit}
      type="json"
    />
  )
}

export default LoginPage
