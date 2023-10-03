import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllTopics, fetchReactions, fetchTopicById, fetchUserById } from './forumThunk';
import { TopicType } from '@/components/ui/topic/topic';

export type ForumDataType = {
	topics: TopicType[];
	comments: any;
};

export type ReactionType = {
	id: number;
	topic_id: string;
	emoji: string;
	user_id: string;
	created_at: Date;
	updated_at: Date;
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
	reactions: [
		{
			id: 0,
			topic_id: '0',
			emoji: '',
			user_id: '0',
			created_at: new Date(),
			updated_at: new Date(),
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
			})
			.addCase(fetchReactions.fulfilled, (state, action: PayloadAction<any>) => {
				state.reactions = action.payload.data;
				state.isDataLoaded = true;
			})
			.addCase(fetchReactions.rejected, () => {
				console.error('fetch reactions failed');
			});
	},
});

export const { setCurrentTopic } = forumSlice.actions;

export default forumSlice.reducer;
