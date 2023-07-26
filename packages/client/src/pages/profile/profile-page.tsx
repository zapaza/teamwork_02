import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/'
import './profile-page.pcss'  

const ProfileDetail: React.FC<{ label: string, value: string | number | null }> = ({ label, value }) => (
  <p className="profile__detail"><strong>{label}:</strong> {value}</p>
)

const ProfilePage: React.FC = () => {
  const { id, firstName, secondName, displayName, login, email, phone, avatar } 
    = useSelector((state: RootState) => state.auth);

  return (
    <div className="profile">
      <h1 className="profile__name">Profile</h1>
      {avatar && <img className="profile__avatar" src={avatar} alt="User Avatar" />}
      <ProfileDetail label="ID" value={id} />
      <ProfileDetail label="First Name" value={firstName} />
      <ProfileDetail label="Second Name" value={secondName} />
      <ProfileDetail label="Display Name" value={displayName} />
      <ProfileDetail label="Login" value={login} />
      <ProfileDetail label="Email" value={email} />
      <ProfileDetail label="Phone" value={phone} />
    </div>
  )
}

export default ProfilePage
