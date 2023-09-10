import { ApiClient } from '@/core/api/api-client';

export type TopicType = {
	id: number;
	header: string;
	content: string;
};

const API_ENDPOINT_FORUM = '';

const client = new ApiClient(API_ENDPOINT_FORUM);

export const apiForum = {
	getAllTopics: async (offset: number = 0, limit: number = 10) => {
		const response = await client.get('/topic', { offset, limit });
		return response?.data;
	},
};
