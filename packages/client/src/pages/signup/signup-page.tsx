import { InputsProps } from '../../components/ui/input/input'
import { ButtonsProps } from '../../components/ui/button/button'
import Form from '../../components/ui/form/form'
import { signUpSchema } from '../../core/validator'
import { checkAuth, fetchSignup } from '../../store/auth/auth-slice'
import { SignupData } from '../../types/auth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const dispatch: AppDispatch = useDispatch()
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
    try {
      await dispatch(fetchSignup(data as SignupData)).unwrap()
      await dispatch(checkAuth()).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to register:', error)
    }
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
