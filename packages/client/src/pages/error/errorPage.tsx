import { Link, useRouteError } from 'react-router-dom';
import './error-page.pcss';

export const ErrorPage = () => {
	const error = useRouteError();
	//console.error(error)
	const is404 = (error as any)?.status === 404;

	return (
		<div
			id="error-page"
			className="error-page__container flex flex-column flex-ai-center flex-jc-center">
			<h1 className="text-9-xl-font-bold">{is404 ? '404' : '500'}</h1>
			<p className="text-xl-font-regular error-page__description">
				{is404
					? 'То, что вы ищете, не создано или куда-то пропало'
					: 'Ой, что-то не так :('}
			</p>
			<Link
				to="/"
				className="navigation-link text-base-font-bold flex flex-ai-center flex-jc-center">
				На главную
			</Link>
		</div>
	);
};
