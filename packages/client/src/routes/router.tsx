import { createBrowserRouter, redirect } from 'react-router-dom'
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
import ProtectedRoute from './protected-route'
import ErrorBoundary from '../utils/ErrorBoundary'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/forum',
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ForumPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: '/forum-topic',
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ForumTopicPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: '/game',
        element: (
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/leaderboard',
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <LeaderBoardPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      { path: '/login', element: <LoginPage /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
])

export default router
