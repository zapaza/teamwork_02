import { TopicType } from '@/components/ui/topic/topic';
import { ApiClient } from '@/core/api/api-client';

export type NewTopicType = Omit<TopicType, 'id'>;

//TODO добавить ссылку
const API_ENDPOINT_FORUM = '';

const client = new ApiClient(API_ENDPOINT_FORUM);

export const apiForum = {
	getAllTopics: async (offset: number = 0, limit: number = 10) => {
		const response = await client.get('/topic', { offset, limit });
		return response?.data;
	},
	addTopic: async (data: NewTopicType) => {
		const response = await client.post('/topic', data);
		return response?.data;
	},
	getTopicById: async (id: number) => {
		const response = await client.get(`/topic/${id}`);
		return response?.data;
	},
};
