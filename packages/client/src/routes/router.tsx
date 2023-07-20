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
    path: '/forum-page',
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forum-topic-page',
    element: <ForumTopicPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/game-page',
    element: <GamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/leaderboard-page',
    element: <LeaderBoardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login-page',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/main-page',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile-page',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/registration-page',
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
])

export default router
