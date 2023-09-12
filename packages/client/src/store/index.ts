import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import gameReducer from './game/gameSlice';
import { useDispatch } from 'react-redux';
import leaderboardReducer from './leaderboard/leaderboardSlice';
import forumReducer from './forum/forumSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		game: gameReducer,
		leaderboard: leaderboardReducer,
		forum: forumReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
