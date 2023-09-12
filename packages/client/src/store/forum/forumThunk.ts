import { TopicType, apiForum } from '@/core/api/api-forum';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTopics = createAsyncThunk('forum/allTopics', async (_, thunkAPI) => {
	try {
		const response = (await apiForum.getAllTopics()) as TopicType[];
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});
