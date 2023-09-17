import { RequestHandler } from 'express';
import { YANDEX_API } from '../const';
import axios from 'axios';

export const checkAuth: RequestHandler = async (req, res, next) => {
	if (req.headers.cookie) {
		axios(`${YANDEX_API}/auth/user`, {
			headers: {
				Cookie: req.headers.cookie,
			},
		})
			.then(response => {
				res.locals.user = response.data;
			})
			.catch(error => {
				console.error('ERROR:', error.message);
			})
			.finally(next);
	} else {
		next();
	}
};
