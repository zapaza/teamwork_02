import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/error'
import App from '../App'
import ForumPage from '../pages/forum'
import ForumTopicPage from '../pages/forum-topic'
import GamePage from '../pages/game'
import LeaderBoardPage from '../pages/leaderboard'
import LoginPage from '../pages/login'
import MainPage from '../pages/main'
import ProfilePage from '../pages/profile'
import RegistrationPage from '../pages/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // вот тут задаем страницу с ошибками вроде 404
    errorElement: <ErrorPage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forum-topic',
    element: <ForumTopicPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/leaderboard',
    element: <LeaderBoardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
])

export default router
