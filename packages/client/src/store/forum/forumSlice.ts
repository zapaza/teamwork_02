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
};

const initialValue = {
	data: { topics: [{ id: 0, header: 'Initial Header', content: 'Topic content' }], comments: [] },
	isDataLoaded: false,
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState: initialValue as StateType,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAllTopics.fulfilled, (state, action: PayloadAction<ForumDataType>) => {
				state.data = action.payload;
				state.isDataLoaded = true;
			})
			.addCase(fetchAllTopics.rejected, () => {
				console.error('fetch topics failed');
			});
	},
});

export default forumSlice.reducer;
