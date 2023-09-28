import { ApiClient } from '@/core/api/api-client';

export type ScoreType = {
	userName: string;
	score: number;
};

export type LeaderDataType = {
	data: ScoreType;
	ratingFieldName: string;
	teamName: string;
};

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';
const client = new ApiClient(API_ENDPOINT);

export const ApiLeaderboard = {
	updateScore: async (data: LeaderDataType) => {
		const response = await client.post('/leaderboard', data);
		return response?.data;
	},
	getLeaders: async () => {
		const response = await client.post('/leaderboard/GOLOVOLOMKA', {
			ratingFieldName: 'score',
			cursor: 0,
			limit: 10,
		});
		return response?.data;
	},
};
