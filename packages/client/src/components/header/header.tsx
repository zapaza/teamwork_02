import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/button/button'
import './header.pcss'

const links = [
  { path: '/main', label: 'Главная' },
  { path: '/game', label: 'Игра' },
  { path: '/forum', label: 'Форум' },
  { path: '/leaderboard', label: 'Список лидеров' },
]

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className="header">
      <nav className="header__nav">
        {links.map(({ path, label }) => (
          <Link key={path} className="header__nav-button" to={path}>
            {label}
          </Link>
        ))}
      </nav>
      {/* TODO: отображать кнопки иначе, если пользователь залогинился */}
      <nav className="header__nav">
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
      </nav>
    </header>
  )
}

export default Header
