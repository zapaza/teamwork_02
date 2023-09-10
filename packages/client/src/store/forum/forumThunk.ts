import { TopicType } from '@/components/ui/topic/topic';
import { apiForum } from '@/core/api/api-forum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ForumDataType } from './forumSlice';

export const fetchAllTopics = createAsyncThunk('forum/allTopics', async (_, thunkAPI) => {
	try {
		const response = (await apiForum.getAllTopics()) as ForumDataType;
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});
