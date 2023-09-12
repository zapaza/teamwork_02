import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from '@/routes/paths';

export const render = (url: string) => {
	return renderToString(
		<StaticRouter location={url}>
			<RouterProvider router={routerPaths}/>
		</StaticRouter>,
	);
};
