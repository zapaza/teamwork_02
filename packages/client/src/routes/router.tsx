import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error';
import App from '../App';
import ForumPage from '../pages/forum';
import ForumTopicPage from '../pages/forum-topic';
import GamePage from '../pages/game';
import LeaderBoardPage from '../pages/leaderboard';
import LoginPage from '../pages/login';
import MainPage from '../pages/main';
import ProfilePage from '../pages/profile';
import SignupPage from '../pages/signup';
import ProtectedRoute from './protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/main', element: <ProtectedRoute><MainPage /></ProtectedRoute> },
      { path: '/forum', element: <ProtectedRoute><ForumPage /></ProtectedRoute> },
      { path: '/forum-topic', element: <ProtectedRoute><ForumTopicPage /></ProtectedRoute> },
      { path: '/game', element: <ProtectedRoute><GamePage /></ProtectedRoute> },
      { path: '/leaderboard', element: <ProtectedRoute><LeaderBoardPage /></ProtectedRoute> },
      { path: '/login', element: <LoginPage /> },
      { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
])

export default router;
