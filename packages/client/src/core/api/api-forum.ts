import { DBNewTopicType, TopicType } from '@/components/ui/topic/topic';
import { ApiClient } from '@/core/api/api-client';

export type NewTopicType = Omit<TopicType, 'id'>;

//TODO добавить ссылку
const API_ENDPOINT_FORUM = 'http://localhost:3002/api';

const client = new ApiClient(API_ENDPOINT_FORUM);

export const apiForum = {
	//TODO 0 10
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
};
