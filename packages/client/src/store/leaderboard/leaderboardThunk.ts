import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiLeaderboard } from '@/core/api/api-leaderboard';
import { LeaderboardDataType } from './leaderboardSlice';

export const fetchLeaders = createAsyncThunk('leaderboard', async (_, thunkAPI) => {
	try {
		const response = (await ApiLeaderboard.getLeaders()) as LeaderboardDataType[];
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});
