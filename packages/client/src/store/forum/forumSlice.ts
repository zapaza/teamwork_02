import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllTopics, fetchReactions, fetchTopicById, fetchUserById } from './forumThunk';

export type ReactionType = {
	id: number;
	topic_id: string;
	emoji: string;
	user_id: string;
	created_at: Date | string;
	updated_at: Date | string;
};

export type CommentType = {
	id: number;
	content: string;
	userId: string;
	created_at: Date | string;
	updated_at: Date | string;
	topicId: number;
};

export type TopicType = {
	id: number;
	header: string;
	content: string;
	userId: number;
	created_at: Date | string;
	updated_at: Date | string;
	reactions: ReactionType[];
	comments: CommentType[];
};

const initialReactionValue = [
	[
		{
			id: 0,
			topic_id: '0',
			emoji: '',
			user_id: '0',
			created_at: '2023-09-30T18:55:14.944Z',
			updated_at: '2023-09-30T18:55:14.944Z',
		},
	],
];

const initialValue = {
	data: {
		topics: [
			{
				id: 0,
				header: '',
				content: '',
				reactions: [initialReactionValue],
				updated_at: '',
				created_at: '',
				userId: 0,
				comments: [],
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
		reactions: [],
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
			state.currentTopic.comments = action.payload.data.comments;
			state.currentTopic.content = action.payload.data.content;
			state.currentTopic.created_at = action.payload.data.created_at;
			state.currentTopic.header = action.payload.data.header;
			state.currentTopic.id = action.payload.data.id;
			state.currentTopic.updated_at = action.payload.data.updated_at;
			state.currentTopic.userId = action.payload.data.userId;
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
				if (action.payload.data[0]) {
					const topic_id = action.payload.data[0].topic_id;
					const existingTopic = state.data.topics.find(
						topic => `${topic.id}` === topic_id,
					);
					if (existingTopic) {
						existingTopic.reactions = action.payload.data;
					}
					if (state.currentTopic.id == topic_id) {
						state.currentTopic.reactions = action.payload.data;
					}
				}
				state.isDataLoaded = true;
			})
			.addCase(fetchReactions.rejected, () => {
				console.error('fetch reactions failed');
			});
	},
});

export const { setCurrentTopic } = forumSlice.actions;

export default forumSlice.reducer;
