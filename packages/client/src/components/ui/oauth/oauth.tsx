import { useCallback, useEffect, useState } from 'react';
import './oauth.pcss';
import yandexOauth from '@/assets/yandex-oauth.svg';
import { apiOAuth } from '@/core/api/api-oauth';
import { getOrigin } from '@/utils/get-origin';

const YANDEX_URI = 'https://oauth.yandex.ru/authorize';

export const OAuth = () => {
	const [serviceId, setServiceId] = useState<string>();
	const [redirectUri] = useState(getOrigin());

	const getServiceId = useCallback(async () => {
		const response = await apiOAuth.getServiceId();
		setServiceId(response);
	}, []);

	useEffect(() => {
		getServiceId();
	}, []);

	const getYandexOauthButton = useCallback(() => {
		const href = `${YANDEX_URI}?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
		console.log(href);
		return (
			<a href={href} className="oauth__link">
				<img src={yandexOauth} alt="yandex-oauth"/>
			</a>
		);
	}, [serviceId]);

	return <div className="oauth">{serviceId && getYandexOauthButton()}</div>;
};
