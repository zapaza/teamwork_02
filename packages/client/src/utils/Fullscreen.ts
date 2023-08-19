import { useEffect, useState } from 'react';

interface FSDocument extends Document {
	msExitFullscreen?: () => Promise<void>;
	webkitExitFullscreen?: () => Promise<void>;
	msFullscreenElement?: Element;
	webkitFullscreenElement?: Element;
	mozCancelFullScreen?: () => Promise<void>;
	mozFullScreenElement?: Element;
}

interface FSHTMLElement extends HTMLElement {
	msRequestFullscreen?: () => Promise<void>;
	webkitRequestFullscreen?: () => Promise<void>;
}

export const toggleFullscreen = (element: HTMLElement | undefined) => {
	if (!element) {
		return;
	}
	if (!document.fullscreenElement) {
		activateFullscreen(element as FSHTMLElement);
	} else {
		deactivateFullscreen();
	}
};
const activateFullscreen = (element: FSHTMLElement) => {
	if (element.requestFullscreen) {
		element
			.requestFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to activate fullscreen:', error);
			});
	} else if (element.webkitRequestFullscreen) {
		element
			.webkitRequestFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to activate fullscreen:', error);
			});
	} else if (element.msRequestFullscreen) {
		element
			.msRequestFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to activate fullscreen:', error);
			});
	} else {
		console.error('Fullscreen API is not supported in this browser');
	}
};
const deactivateFullscreen = () => {
	const document: FSDocument = window.document;
	if (document.exitFullscreen) {
		document
			.exitFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to deactivate fullscreen:', error);
			});
	} else if (document.webkitExitFullscreen) {
		document
			.webkitExitFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to deactivate fullscreen:', error);
			});
	} else if (document.msExitFullscreen) {
		document
			.msExitFullscreen()
			.then()
			.catch(error => {
				console.error('Failed to deactivate fullscreen:', error);
			});
	} else {
		console.error('Fullscreen API is not supported in this browser');
	}
};
export const useIsFullscreen = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	useEffect(() => {
		const handleFullscreen = () => {
			const fullscreenElement =
				(document as FSDocument).fullscreenElement ||
				(document as FSDocument).mozFullScreenElement ||
				(document as FSDocument).webkitFullscreenElement;

			setIsFullscreen(!!fullscreenElement);
		};
		document.addEventListener('fullscreenchange', handleFullscreen);
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreen);
		};
	}, []);
	return isFullscreen;
};
