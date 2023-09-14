import { ApiClient } from '@/core/api/api-client';

export type TopicType = {
	id: number;
	header: string;
	content: string;
	topicId?: number;
	author: AuthorType;
};

export type NewTopicType = {
	header: string;
	content: string;
};

export type CommentType = {
	id?: number;
	topicId: number;
	author: AuthorType;
	content: string;
	date: string;
};

export type AuthorType = {
	schema: schemaType;

};

type schemaType = {
	id: number;
	name: string;
};

//TODO Заменить урл на настоящий бек
const API_ENDPOINT_FORUM = 'http://127.0.0.1:3001/api/v3';

const client = new ApiClient(API_ENDPOINT_FORUM);

export const apiForum = {
	//TODO скорее всего нужно будет убрать withCredentials
	getAllTopics: async (offset: number = 0, limit: number = 10) => {
		const response = await client.get('/topic', { offset, limit }, { withCredentials: false });
		return response?.data;
	},
	addTopic: async (data: NewTopicType) => {
		const response = await client.post('/topic', data, { withCredentials: false });
		return response?.data;
	},
	getAllComments: async (topicId: number, offset: number = 0, limit: number = 10) => {
		const response = await client.get(`/topic/${topicId}/comments`, {
			offset,
			limit,
		}, { withCredentials: false });
		return response?.data;
	},
	addComment: async (data: CommentType) => {
		const response = await client.post(`/topic/${data.topicId}/comments`, data, { withCredentials: false });
		return response?.data;
	},
};
