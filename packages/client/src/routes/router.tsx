import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/error-page'
import App from '../App'
import ForumPage from '../pages/forum-page'
import ForumTopicPage from '../pages/forum-topic-page'
import GamePage from '../pages/game-page'
import LeaderBoardPage from '../pages/leaderboard-page'
import LoginPage from '../pages/login-page'
import MainPage from '../pages/main-page'
import ProfilePage from '../pages/profile-page'
import RegistrationPage from '../pages/registration-page'

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
