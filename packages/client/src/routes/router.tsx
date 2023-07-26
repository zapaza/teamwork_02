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
import SignupPage from '../pages/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/main', element: <MainPage /> },
      { path: '/forum', element: <ForumPage /> },
      { path: '/forum-topic', element: <ForumTopicPage /> },
      { path: '/game', element: <GamePage /> },
      { path: '/leaderboard', element: <LeaderBoardPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
])

export default router
