import { API_ENDPOINT, ApiClient } from '@/core/api/api-client';
import { getOrigin } from '@/utils/get-origin';

const client = new ApiClient(API_ENDPOINT);

type OAuthServiceIdRes = {
	service_id: string;
};

export const apiOAuth = {
	async getServiceId() {
		const redirectionUri = getOrigin();
		try {
			const response = await client.get<unknown, OAuthServiceIdRes>(
				`/oauth/yandex/service-id?redirect_uri=${redirectionUri}`,
			);
			return response?.data.service_id;
		} catch (error) {
			console.error(error);
		}
	},
	async loginOAuth(code: string) {
		const redirectionUri = getOrigin();
		try {
			const response = await client.post('/oauth/yandex', {
				code,
				redirect_uri: `${redirectionUri}`,
			});
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
