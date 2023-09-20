export const removeSpecChars = (text: string) => {
	return text.replace(/[^a-zA-Zа-яА-яё0-9Ё\s!,.\-?()]/g, '');
};
