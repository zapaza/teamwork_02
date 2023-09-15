import { TopicType } from '@/components/ui/topic/topic';
import { apiForum } from '@/core/api/api-forum';
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

export const fetchTopicById = createAsyncThunk('forum/topicById', async (id: number, thunkAPI) => {
	try {
		const response = (await apiForum.getTopicById(id)) as TopicType;
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});
