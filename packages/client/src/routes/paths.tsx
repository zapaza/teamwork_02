import { App } from '@/App';
import { ErrorPage } from '@/pages/error/errorPage';
import { MainPage } from '@/pages/main/mainPage';
import ProtectedRoute from '@/routes/protected-route';
import { ErrorBoundary } from '@/utils/ErrorBoundary';
import { ForumPage } from '@/pages/forum/forumPage';
import { ForumTopicPage } from '@/pages/forum-topic/forumTopicPage';
import { GamePage } from '@/pages/game/gamePage';
import { LeaderboardPage } from '@/pages/leaderboard/leaderboardPage';
import { LoginPage } from '@/pages/login/loginPage';
import { ProfilePage } from '@/pages/profile/profilePage';
import { SignupPage } from '@/pages/signup/signupPage';

export const routerPaths = [
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
				search: 'id=:id',
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
];
