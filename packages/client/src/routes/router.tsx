import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { ForumPage } from '@/pages/forum/forumPage';
import { ForumTopicPage } from '@/pages/forum-topic/forumTopicPage';
import { GamePage } from '@/pages/game/gamePage';
import { LeaderboardPage } from '@/pages/leaderboard/leaderboard-page';
import { LoginPage } from '@/pages/login/loginPage';
import { MainPage } from '@/pages/main/mainPage';
import { ProfilePage } from '@/pages/profile/profilePage';
import { SignupPage } from '@/pages/signup/signupPage';
import ProtectedRoute from './protected-route';
import { ErrorPage } from '@/pages/error/errorPage';
import { ErrorBoundary } from '@/utils/ErrorBoundary';

const router = createBrowserRouter([
	{
		element: <App/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: '/',
				element: <MainPage/>,
			},
			{
				path: '/forum',
				element: (
					<ProtectedRoute>
						<ErrorBoundary>
							<ForumPage/>
						</ErrorBoundary>
					</ProtectedRoute>
				),
			},
			{
				path: '/forum-topic',
				element: (
					<ProtectedRoute>
						<ErrorBoundary>
							<ForumTopicPage/>
						</ErrorBoundary>
					</ProtectedRoute>
				),
			},
			{
				path: '/game',
				element: (
					<ProtectedRoute>
						<GamePage/>
					</ProtectedRoute>
				),
			},
			{
				path: '/leaderboard',
				element: (
					<ProtectedRoute>
						<ErrorBoundary>
							<LeaderboardPage/>
						</ErrorBoundary>
					</ProtectedRoute>
				),
			},
			{ path: '/login', element: <LoginPage/> },
			{
				path: '/profile',
				element: (
					<ProtectedRoute>
						<ProfilePage/>
					</ProtectedRoute>
				),
			},
			{ path: '/signup', element: <SignupPage/> },
		],
	},
]);

export default router;
