import { apiForum } from '@/core/api/api-forum';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTopics = createAsyncThunk('forum/allTopics', async (_, thunkAPI) => {
	try {
		return await apiForum.getAllTopics();
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});
export const fetchAllComments = createAsyncThunk(
	'forum/allComments',
	async (data: Record<string, any>, thunkAPI) => {
		try {
			return await apiForum.getAllComments(data.id, data.offset, data.limit);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: (error as Error | null)?.message,
			});
		}
	},
);
