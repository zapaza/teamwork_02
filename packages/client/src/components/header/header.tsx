import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/button/button'
import './header.pcss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { fetchLogout } from '../../store/auth/authSlice'

const links = [
  { path: '/main', label: 'Главная' },
  { path: '/game', label: 'Игра' },
  { path: '/forum', label: 'Форум' },
  { path: '/leaderboard', label: 'Список лидеров' },
]

const Header: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(fetchLogout() as any)
  }

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/')
    }
  }, [auth.isLoggedIn, navigate])

  return (
    <header className="header">
      <nav className="header__nav">
        {links.map(({ path, label }) => (
          <Link key={path} className="header__nav-button" to={path}>
            {label}
          </Link>
        ))}
      </nav>
      <nav className="header__nav">
        {auth.isLoggedIn ? (
          <>
            <Button
              name="Профиль"
              children="Профиль"
              onClick={() => navigate('/profile')}
            />
            <Button name="Выход" children="Выход" onClick={handleLogout} />
          </>
        ) : (
          <>
            <Button
              name="Вход"
              children="Вход"
              onClick={() => navigate('/login')}
            />
            <Button
              name="Регистрация"
              children="Регистрация"
              onClick={() => navigate('/signup')}
            />
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
