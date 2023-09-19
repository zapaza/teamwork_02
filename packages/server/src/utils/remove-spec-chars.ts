export const removeSpecChars = (text: string) => {
	return text.replace(/[^a-zA-Zа-яА-яёЁ\s!,.\-?()0-9]/g, '');
};
