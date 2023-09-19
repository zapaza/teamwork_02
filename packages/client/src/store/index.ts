import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import gameReducer from './game/gameSlice';
import { useDispatch } from 'react-redux';
import leaderboardReducer from './leaderboard/leaderboardSlice';
import forumReducer from './forum/forumSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	game: gameReducer,
	leaderboard: leaderboardReducer,
	forum: forumReducer,
});

export const setupStore = () => {
	let preloadedState;

	if (typeof window !== 'undefined') {
		preloadedState = window.__PRELOADED_STATE__;
	}

	return configureStore({
		reducer: rootReducer,
		preloadedState,
		devTools: process.env.NODE_ENV !== 'production',
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = setupStore();

export default store;
