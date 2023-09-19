import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllTopics, fetchTopicById } from './forumThunk';
import { TopicType } from '@/components/ui/topic/topic';

export type ForumDataType = {
	topics: TopicType[];
	comments: any;
};

const initialValue = {
	data: {
		topics: [
			{
				id: 0,
				header: '',
				content: '',
			},
		],
		comments: [],
	},
	isDataLoaded: false,
	currentTopic: {
		id: 0,
		header: '',
		content: '',
	},
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
			.addCase(fetchAllTopics.fulfilled, (state, action: PayloadAction<TopicType[]>) => {
				state.data.topics = action.payload;
				state.isDataLoaded = true;
			})
			.addCase(fetchAllTopics.rejected, () => {
				console.error('fetch topics failed');
			})
			.addCase(fetchTopicById.fulfilled, (state, action: PayloadAction<TopicType>) => {
				state.currentTopic = action.payload;
				state.isDataLoaded = true;
			})
			.addCase(fetchTopicById.rejected, () => {
				console.error('fetch topic failed');
			});
	},
});

export const { setCurrentTopic } = forumSlice.actions;

export default forumSlice.reducer;
