import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import gameReducer from './game/gameSlice';
import { useDispatch } from 'react-redux';
import leaderboardSlice from './leaderboard/leaderboardSlice';

declare global {
	interface Window {
		APP_INITIAL_STATE: RootState;
	}
}

export const rootReducer = combineReducers({
	auth: authReducer,
	game: gameReducer,
	leaderboard: leaderboardSlice,
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

export const store = setupStore();
