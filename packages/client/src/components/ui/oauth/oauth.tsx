import { useCallback, useEffect, useState } from 'react';
import './oauth.pcss';
import yandexOauth from '@/assets/yandex-oauth.svg';
import apiOAuth from '@/core/api/api-oauth';

const YANDEX_URI = 'https://oauth.yandex.ru/authorize';
const REDIRECT_URI = window.location.origin;

export default function OAuth() {
	const [serviceId, setServiceId] = useState<string>();

	const getServiceId = useCallback(async () => {
		const response = await apiOAuth.getServiceId();
		setServiceId(response);
	}, []);

	useEffect(() => {
		getServiceId();
	}, []);

	return serviceId ? (
		<div className="oauth">
			<a
				href={`${YANDEX_URI}?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`}
				className="oauth__link">
				<img src={yandexOauth} alt="yandex-oauth"/>
			</a>
		</div>
	) : null;
}
