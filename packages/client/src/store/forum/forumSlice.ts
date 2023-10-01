import { createSlice } from '@reduxjs/toolkit';
import { fetchAllTopics, fetchTopicById, fetchUserById } from './forumThunk';
import { TopicType } from '@/components/ui/topic/topic';

export type ForumDataType = {
	topics: TopicType[];
	comments: any;
};

const initialReactionValue = {};

const initialValue = {
	data: {
		topics: [
			{
				id: 0,
				header: '',
				content: '',
			},
		],
		comments: [
			{
				id: 0,
				topicId: 0,
				content: '',
				userId: 0,
				created_at: '',
				updated_at: '',
				replies: [],
			},
		],
	},
	isDataLoaded: false,
	currentTopic: {
		content: '',
		created_at: '',
		header: '',
		id: 0,
		updated_at: '',
		userId: 0,
		comments: [],
	},
	user: [
		{
			id: 0,
			first_name: '',
			second_name: '',
			display_name: '',
			login: '',
			avatar: '',
		},
	],
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState: initialValue,
	reducers: {
		setCurrentTopic: (state, action) => {
			state.currentTopic = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAllTopics.fulfilled, (state, action: any) => {
				state.data.topics = action.payload.data;
				state.isDataLoaded = true;
			})
			.addCase(fetchAllTopics.rejected, () => {
				console.error('fetch topics failed');
			})
			.addCase(fetchTopicById.fulfilled, (state, action: any) => {
				state.currentTopic = action.payload.data;
				state.isDataLoaded = true;
			})
			.addCase(fetchTopicById.rejected, () => {
				console.error('fetch topic failed');
			})
			.addCase(fetchUserById.fulfilled, (state, action: any) => {
				const unique = state.user.filter(
					(item, index) => state.user.findIndex(elem => elem.id === item.id) === index,
				);
				state.user = [...unique, action.payload];
				state.isDataLoaded = true;
			})
			.addCase(fetchUserById.rejected, () => {
				console.error('fetch user failed');
			});
	},
});

export const { setCurrentTopic } = forumSlice.actions;

export default forumSlice.reducer;
