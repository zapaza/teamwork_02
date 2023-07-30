import { InputsProps } from '../../components/ui/input/input'
import Form from '../../components/ui/form/form'
import Wrapper from '../../components/ui/wrapper/wrapper'
import './profile-page.pcss'
import profileLogo from '../../assets/profile_logo.svg'
import { useEffect, useState } from 'react'
import { ButtonsProps } from '../../components/ui/button/button'
import ProfileField from '../../components/ui/profile-field/profile-field'
import SubButton from '../../components/ui/sub-button/sub-button'
import Modal from '../../components/modal/modal'
import useModal from '../../hooks/useModal'
import {
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../../store/auth/authSlice'
import { UpdatePasswordReq, UpdateProfileReq } from '../../core/api/apiProfile'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { RESOURCES_URL } from '../../core/api/apiClient'
import { AuthState } from '../../types/auth'

type ModalType = 'profile' | 'avatar' | 'password'

const submitButton: ButtonsProps[] = [
  {
    name: 'save',
    children: 'Save',
  },
]

const avatarInputs: InputsProps[] = [
  {
    name: 'avatar',
    type: 'file',
    label: 'New Avatar',
    placeholder: '',
  },
]

const passwordsInputs: InputsProps[] = [
  {
    name: 'oldPassword',
    type: 'password',
    label: 'Old password',
    placeholder: 'Old password',
  },
  {
    name: 'newPassword',
    type: 'password',
    label: 'New password',
    placeholder: 'New password',
  },
  {
    name: 'newPasswordRepeat',
    type: 'password',
    label: 'Repeat new password',
    placeholder: 'Repeat new password',
  },
]

function culcProfileFieldsProps(profileData: AuthState): InputsProps[] {
  return [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Email',
      value: profileData.email,
    },
    {
      name: 'login',
      type: 'text',
      label: 'Login',
      placeholder: 'Login',
      value: profileData.login,
    },
    {
      name: 'first_name',
      type: 'text',
      label: 'First Name',
      placeholder: 'First Name',
      value: profileData.first_name,
    },
    {
      name: 'second_name',
      type: 'text',
      label: 'Second Name',
      placeholder: 'Second name',
      value: profileData.second_name,
    },
    {
      name: 'display_name',
      type: 'text',
      label: 'Display Name',
      placeholder: 'Display Name',
      value: profileData.display_name,
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone',
      placeholder: 'Phone',
      value: profileData.phone,
    },
    {
      name: 'high_score',
      type: 'text',
      label: 'High score',
      placeholder: 'High score',
      value: '56',
    },
  ]
}

const culcProfileInputs = (profileFields: InputsProps[]) =>
  profileFields.filter(field => field.name != 'high_score')

function ProfilePage() {
  const { isOpen, toggle } = useModal()
  const dispatch: AppDispatch = useDispatch()
  const [modalType, setModalType] = useState<ModalType>('profile')
  const [profileData, setProfileData] = useState(
    useSelector((state: RootState) => state.auth)
  )
  const [profileFields, setProfileFields] = useState(
    culcProfileFieldsProps(profileData)
  )
  const [profileInputs, setProfileInputs] = useState(
    culcProfileInputs(profileFields)
  )

  useEffect(() => {
    console.log(profileData)
    setProfileFields(culcProfileFieldsProps(profileData))
  }, [profileData])

  useEffect(() => {
    setProfileInputs(culcProfileInputs(profileFields))
  }, [profileFields])

  const onClick = (currentModalType: ModalType) => {
    setModalType(currentModalType)
    toggle()
  }

  const onSubmit = async (data: unknown) => {
    toggle()
    switch (modalType) {
      case 'profile':
        setProfileData(
          await dispatch(updateProfile(data as UpdateProfileReq)).unwrap()
        )
        break
      case 'password':
        dispatch(updatePassword(data as UpdatePasswordReq)).unwrap()
        break
      case 'avatar':
        setProfileData(await dispatch(updateAvatar(data as FormData)).unwrap())
        break
      default:
        throw new Error('Unknown type of modal for profile page')
    }
  }

  const getModalForm = () => {
    switch (modalType) {
      case 'profile':
        return (
          <Form
            name={'updateProfile'}
            title={'Update profile'}
            inputs={profileInputs}
            buttons={submitButton}
            callback={onSubmit}
            type="json"
          />
        )
      case 'password':
        return (
          <Form
            name={'updatePassword'}
            title={'Update password'}
            inputs={passwordsInputs}
            buttons={submitButton}
            callback={onSubmit}
            type="json"
          />
        )
      case 'avatar':
        return (
          <Form
            name={'updateAvatar'}
            title={'Update Avatar'}
            inputs={avatarInputs}
            buttons={submitButton}
            callback={onSubmit}
            type="formData"
          />
        )
      default:
        throw new Error('Unknown type of modal for profile page')
    }
  }

  const getProfileFields = () => {
    return (
      <>
        {profileFields.map((field, index) => (
          <ProfileField key={index} label={field.label} value={field.value} />
        ))}
      </>
    )
  }

  const getViewSettings = () => {
    return (
      <>
        <SubButton label="Edit profile" onClick={() => onClick('profile')} />
        <SubButton
          label="Change password"
          onClick={() => onClick('password')}
        />
        <SubButton label="Change avatar" onClick={() => onClick('avatar')} />
      </>
    )
  }

  return (
    <main className="profile flex flex-jc-center">
      <div className="profile__container flex gap-32">
        <Wrapper>
          <section className="profile__info flex gap-32">
            <div className="profile__logo-container flex flex-ai-center flex-jc-center">
              <img
                className="profile__logo"
                src={
                  profileData.avatar
                    ? `${RESOURCES_URL}${profileData.avatar}`
                    : profileLogo
                }
                alt="Profile Logo"
              />
            </div>
            <div className="profile__form-container flex flex-column gap-16">
              {getProfileFields()}
            </div>
          </section>
        </Wrapper>
        <section className="profile__settings">
          <Wrapper>{getViewSettings()}</Wrapper>
        </section>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        {getModalForm()}
      </Modal>
    </main>
  )
}

export default ProfilePage
