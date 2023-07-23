import { createBrowserRouter } from 'react-router-dom'
import Error from '../pages/error'
import App from '../App'
import Forum from '../pages/forum'
import ForumTopic from '../pages/forum-topic'
import Game from '../pages/game'
import Leaderboard from '../pages/leaderboard'
import Login from '../pages/login'
import Main from '../pages/main'
import Profile from '../pages/profile'
import Signup from '../pages/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // вот тут задаем страницу с ошибками вроде 404
    errorElement: <Error />,
  },
  {
    path: '/forum',
    element: <Forum />,
    errorElement: <Error />,
  },
  {
    path: '/forum-topic',
    element: <ForumTopic />,
    errorElement: <Error />,
  },
  {
    path: '/game',
    element: <Game />,
    errorElement: <Error />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/main',
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <Error />,
  },
])

export default router
