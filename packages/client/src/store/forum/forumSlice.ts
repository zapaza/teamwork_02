import { createSlice } from '@reduxjs/toolkit';
import { fetchAllComments, fetchAllTopics } from './forumThunk';
import { TopicType } from '@/core/api/api-forum';

export type ForumDataType = {
	topics: TopicType[];
	comments: any;
};

type StateType = {
	data: ForumDataType;
	isDataLoaded: boolean;
};

const forumMock = [
	{
		id: 1,
		header: 'Заголовок топика1',
		content:
			// eslint-disable-next-line max-len
			'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
	},
];

const initialValue = {
	data: { topics: forumMock, comments: [] },
	isDataLoaded: false,
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState: initialValue as StateType,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAllTopics.fulfilled, (state, action) => {
				state.isDataLoaded = true;
			})
			.addCase(fetchAllTopics.rejected, (state) => {
				state.isDataLoaded = false;
				console.error('fetch topics failed');
			})
			.addCase(fetchAllComments.fulfilled, (state, action) => {
				state.data.comments = action.payload;
			})
			.addCase(fetchAllComments.rejected, (state) => {
				state.data.comments = [];
				console.error('fetch comments failed');
			});
	},
});

export default forumSlice.reducer;
