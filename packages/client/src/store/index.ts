// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authReducer from './auth/auth-slice';
// import gameReducer from './game/gameSlice';
// import { useDispatch } from 'react-redux';
// import leaderboardSlice from './leaderboard/leaderboardSlice';
//
// declare global {
// 	interface Window {
// 		APP_INITIAL_STATE: RootState;
// 	}
// }
//
// export const rootReducer = combineReducers({
// 	auth: authReducer,
// 	game: gameReducer,
// 	leaderboard: leaderboardSlice,
// });
//
// export const setupStore = () => {
// 	let preloadedState;
//
// 	if (typeof window !== 'undefined') {
// 		preloadedState = window.__PRELOADED_STATE__;
// 	}
//
// 	return configureStore({
// 		reducer: rootReducer,
// 		preloadedState,
// 		devTools: process.env.NODE_ENV !== 'production',
// 	});
// };
//
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
//
// export const store = setupStore();

import {
	useDispatch as useDispatchBase,
	useSelector as useSelectorBase,
	TypedUseSelectorHook,
	useStore as useStoreBase,
} from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ssrReducer from '@/store/ssrSlice';
import { authSlice } from '@/store/auth/auth-slice';
import { gameSlice } from '@/store/game/gameSlice';
import { leaderboardSlice } from '@/store/leaderboard/leaderboardSlice';

declare global {
	interface Window {
		APP_INITIAL_STATE: RootState;
	}
}

export const reducer = combineReducers({
	auth: authSlice.reducer,
	game: gameSlice.reducer,
	leaderboard: leaderboardSlice.reducer,
	ssr: ssrReducer,
});

export const store = configureStore({
	reducer,
	preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export const useStore: () => typeof store = useStoreBase;
