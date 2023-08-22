// eslint-disable-next-line no-var
declare var self: ServiceWorkerGlobalScope & typeof globalThis;

interface ExtendableEvent extends Event {
	waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
	clientId: string;
	request: Request;
	respondWith(response: Promise<Response> | Response): void;
}

interface InstallEvent extends Event {
	activeWorker: ServiceWorker;
	registerForeignFetch(options: { scopes: string[]; origins: string[] }): void;
	waitUntil(fn: Promise<any>): void;
}
