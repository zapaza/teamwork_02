import { App, initAppPage } from '@/App';
import { ErrorPage } from '@/pages/error/errorPage';
import { initMainPage, MainPage } from '@/pages/main/mainPage';
import ProtectedRoute from '@/routes/protected-route';
import { ErrorBoundary } from '@/utils/ErrorBoundary';
import { ForumPage } from '@/pages/forum/forumPage';
import { ForumTopicPage } from '@/pages/forum-topic/forumTopicPage';
import { GamePage } from '@/pages/game/gamePage';
import { LeaderboardPage } from '@/pages/leaderboard/leaderboardPage';
import { LoginPage } from '@/pages/login/loginPage';
import { ProfilePage } from '@/pages/profile/profilePage';
import { SignupPage } from '@/pages/signup/signupPage';
import { AppDispatch, RootState } from '@/store';

export type PageInitContext = {
	clientToken?: string;
};

export type PageInitArgs = {
	dispatch: AppDispatch;
	state: RootState;
	ctx: PageInitContext;
};

export const routerPaths = [
	{
		element: <App/>,
		errorElement: <ErrorPage/>,
		fetchData: initAppPage,
		children: [
			{
				path: '/',
				element: <MainPage/>,
				fetchData: initMainPage,
			},
			{
				path: '/forum',
				fetchData: () => Promise.resolve(),
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
				fetchData: () => Promise.resolve(),
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
				fetchData: () => Promise.resolve(),
				element: (
					<ProtectedRoute>
						<GamePage/>
					</ProtectedRoute>
				),
			},
			{
				path: '/leaderboard',
				fetchData: () => Promise.resolve(),
				element: (
					<ProtectedRoute>
						<ErrorBoundary>
							<LeaderboardPage/>
						</ErrorBoundary>
					</ProtectedRoute>
				),
			},
			{
				path: '/login',
				fetchData: () => Promise.resolve(),
				element: <LoginPage/>
			},
			{
				path: '/profile',
				fetchData: () => Promise.resolve(),
				element: (
					<ProtectedRoute>
						<ProfilePage/>
					</ProtectedRoute>
				),
			},
			{
				path: '/signup',
				fetchData: () => Promise.resolve(),
				element: <SignupPage/> },
		],
	},
];
