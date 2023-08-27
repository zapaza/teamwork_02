import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiLeaderboard, ScoreType } from '@/core/api/api-leaderboard';

export type LeaderboardDataType = {
	data: ScoreType;
};

type StateType = {
	data: LeaderboardDataType[];
	isDataLoaded: boolean;
};

export const fetchLeaders = createAsyncThunk('leaderboard', async (_, thunkAPI) => {
	try {
		return (await ApiLeaderboard.getLeaders()) as LeaderboardDataType[];
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});

export const leaderboardSlice = createSlice({
	name: 'leaderboard',
	initialState: {
		data: [{ data: { score: 1, userName: 'user' } }],
		isDataLoaded: false,
	} as StateType,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(
				fetchLeaders.fulfilled,
				(state, action: PayloadAction<LeaderboardDataType[]>) => {
					state.data = action.payload;
					state.isDataLoaded = true;
				},
			)
			.addCase(fetchLeaders.rejected, () => {
				console.error('fetch leaders failed');
			});
	},
});

export default leaderboardSlice.reducer;
