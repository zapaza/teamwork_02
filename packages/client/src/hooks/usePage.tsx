import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from '@/store';

import {
	setPageHasBeenInitializedOnServer,
	selectPageHasBeenInitializedOnServer,
} from '@/store/ssrSlice';
import { PageInitArgs, PageInitContext } from '@/routes/paths';

type PageProps = {
	initPage: (data: PageInitArgs) => Promise<unknown>;
};

const getCookie = (name: string) => {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				// eslint-disable-next-line
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)',
		),
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

const createContext = (): PageInitContext => ({
	clientToken: getCookie('token'),
});

export const usePage = async ({ initPage }: PageProps) => {
	const dispatch = useDispatch();
	const pageHasBeenInitializedOnServer = useSelector(selectPageHasBeenInitializedOnServer);
	const store = useStore();

	useEffect(() => {
		if (pageHasBeenInitializedOnServer) {
			dispatch(setPageHasBeenInitializedOnServer(false));
			return;
		}
		initPage({ dispatch, state: store.getState(), ctx: createContext() });
	}, []);
};
