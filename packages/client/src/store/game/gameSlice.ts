import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from './gameStatus';

interface GameState {
	status: GameStatus;
}

const initialState: GameState = {
	status: GameStatus.START,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<GameStatus>) => {
			state.status = action.payload;
		},
	},
});

export default gameSlice.reducer;
