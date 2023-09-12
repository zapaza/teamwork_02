import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllTopics } from './forumThunk';
import { TopicType } from '@/core/api/api-forum';

export type ForumDataType = {
	topics: TopicType[];
	comments: any;
};

type StateType = {
	data: ForumDataType;
	isDataLoaded: boolean;
	currentTopic: TopicType;
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
			});
	},
});

export const { setCurrentTopic } = forumSlice.actions;

export default forumSlice.reducer;
