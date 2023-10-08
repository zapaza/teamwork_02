import { apiForum } from '@/core/api/api-forum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReactionType, TopicType } from './forumSlice';

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

export const fetchUserById = createAsyncThunk('forum/userById', async (id: number, thunkAPI) => {
	try {
		const response = (await apiForum.getUserById(id)) as TopicType;
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue({
			error: (error as Error | null)?.message,
		});
	}
});

export const fetchReactions = createAsyncThunk(
	'forum/reactionsByTopicId',
	async (topic_id: number, thunkAPI) => {
		try {
			const response = (await apiForum.getReactionsByTopicId(topic_id)) as ReactionType;
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: (error as Error | null)?.message,
			});
		}
	},
);
