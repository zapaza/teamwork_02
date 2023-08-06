import { InputsProps } from '../../components/ui/input/input'
import Wrapper from '../../components/ui/wrapper/wrapper'
import './profile-page.pcss'
import profileLogo from '../../assets/profile_logo.svg'
import { useEffect, useMemo, useState } from 'react'
import ProfileField from '../../components/ui/profile-field/profile-field'
import SubButton from '../../components/ui/sub-button/sub-button'
import useModal from '../../hooks/use-modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { RESOURCES_URL } from '../../core/api/api-client'
import getProfileFieldsProps from '../../utils/get-profile-fields-props'
import UpdateProfileModal from '../../components/modal/update-profile-modal/update-profile-modal'
import UpdatePasswordModal from '../../components/modal/update-password-modal/update-password-modal'
import UpdateAvatarModal from '../../components/modal/update-avatar-modal/update-avatar-modal'

type ModalType = 'profile' | 'avatar' | 'password'

//TODO после добавление API на получения результата игры, будет убрано отсюда
const otherFields: InputsProps[] = [
  {
    name: 'high_score',
    type: 'text',
    label: 'High score',
    placeholder: 'High score',
    value: '56',
  },
]

function ProfilePage() {
  const { isOpen, toggle } = useModal()
  const [modalType, setModalType] = useState<ModalType>()
  const profileData = useSelector((state: RootState) => state.auth)
  const [profileFields, setProfileFields] = useState(
    getProfileFieldsProps(profileData)
  )

  useEffect(() => {
    setProfileFields(getProfileFieldsProps(profileData))
  }, [profileData])

  const onClick = (currentModalType: ModalType) => {
    setModalType(currentModalType)
    toggle()
  }

  const renderedProfileFields = useMemo(() => {
    return (
      <>
        {profileFields.concat(otherFields).map((field, index) => (
          <ProfileField key={index} label={field.label} value={field.value} />
        ))}
      </>
    )
  }, [profileFields])

  const renderedViewSettings = useMemo(() => {
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
  }, [])

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
              {renderedProfileFields}
            </div>
          </section>
        </Wrapper>
        <section className="profile__settings">
          <Wrapper>{renderedViewSettings}</Wrapper>
        </section>
      </div>
      {modalType == 'profile' ? (
        <UpdateProfileModal isOpen={isOpen} toggle={toggle} />
      ) : modalType == 'password' ? (
        <UpdatePasswordModal isOpen={isOpen} toggle={toggle} />
      ) : modalType == 'avatar' ? (
        <UpdateAvatarModal isOpen={isOpen} toggle={toggle} />
      ) : null}
    </main>
  )
}

export default ProfilePage
