import { DBNewTopicType, TopicType } from '@/components/ui/topic/topic';
import { ApiClient } from '@/core/api/api-client';

export type NewTopicType = Omit<TopicType, 'id'>;

export type CommentType = {
	id: number;
	topicId: number;
	content: string;
	userId: number;
	created_at: string;
	updated_at: string;
	replies: any;
};

export type DBNewComment = {
	topicId: number;
	content: string;
	userId: number;
};

const API_ENDPOINT_FORUM = 'http://localhost:3001/api';
const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';

const client = new ApiClient(API_ENDPOINT_FORUM);
const client_user = new ApiClient(API_ENDPOINT);

export const apiForum = {
	getAllTopics: async (offset: number = 0, limit: number = 10) => {
		const response = await client.get('/topic', { offset, limit }, { withCredentials: false });
		return response?.data;
	},
	addTopic: async (data: DBNewTopicType) => {
		const response = await client.post('/topic', data, { withCredentials: false });
		return response?.data;
	},
	getTopicById: async (id: number) => {
		const response = await client.get(`/topic/${id}`, {}, { withCredentials: false });
		return response?.data;
	},
	addComment: async (data: DBNewComment) => {
		const response = await client.post('/comment', data, { withCredentials: false });
		return response?.data;
	},
	getUserById: async (id: number) => {
		const response = await client_user.get(`/user/${id}`);
		return response?.data;
	},
};
