export const stringToInt = (str: string) =>
	/^[0-9]+$/.test(str) ? Number.parseInt(str) : undefined;
