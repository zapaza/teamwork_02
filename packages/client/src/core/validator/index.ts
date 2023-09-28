import * as yup from 'yup';

export const signUpSchema = yup.object({
	login: yup
		.string()
		.required()
		.min(3)
		.max(20)
		.matches(/^[a-zA-Z0-9-_]*$/, {
			message: 'Can contain only latin symbol or numbers',
		})
		.test('notNumbers', 'Cannot contain only numbers', value => {
			if (!value) {
				return false;
			}
			return !value.match(/^[0-9]*$/);
		}),
	password: yup
		.string()
		.required()
		.min(8)
		.max(40)
		.test(
			'containNumberAndUpperCaseSymbol',
			'Must contain number and upper case symbol',
			value => {
				if (!value) {
					return;
				}
				return !!value.match(/[0-9]/) && !!value.match(/[A-Z]/);
			},
		),
	repeat_password: yup
		.string()
		.required()
		.oneOf([yup.ref('password')], 'Passwords must match'),
	first_name: yup
		.string()
		.required()
		.matches(/^[a-zA-Zа-яА-Я-]*$/, {
			message: 'Cannot contain space and special symbols',
		})
		.test('firstSymbolUpperCase', 'First symbol must be to upper case', value => {
			if (!value) {
				return;
			}
			return !!value[0].match(/^[A-ZА-Я]*$/);
		}),
	second_name: yup
		.string()
		.required()
		.matches(/^[a-zA-Zа-яА-Я-]*$/, {
			message: 'Cannot contain space and special symbols',
		})
		.test('firstSymbolUpperCase', 'First symbol must be to upper case', value => {
			if (!value) {
				return;
			}
			return !!value[0].match(/^[A-ZА-Я]*$/);
		}),
	email: yup
		.string()
		.required()
		.matches(/.+@.+\..+/, 'Invalid email'),
	phone: yup
		.string()
		.required()
		.matches(/\d+|\+\d+|\+\d\(\d{3}\)\d{7}/, 'Can be only numbers, may start from +')
		.min(10)
		.max(15),
});

export const updateProfileSchema = yup.object({
	login: yup
		.string()
		.required()
		.min(3)
		.max(20)
		.matches(/^[a-zA-Z0-9-_]*$/, {
			message: 'Can contain only latin symbol or numbers',
		})
		.test('notNumbers', 'Cannot contain only numbers', value => {
			if (!value) {
				return false;
			}
			return !value.match(/^[0-9]*$/);
		}),
	first_name: yup
		.string()
		.required()
		.matches(/^[a-zA-Zа-яА-Я-]*$/, {
			message: 'Cannot contain space and special symbols',
		})
		.test('firstSymbolUpperCase', 'First symbol must be to upper case', value => {
			if (!value) {
				return;
			}
			return !!value[0].match(/^[A-ZА-Я]*$/);
		}),
	second_name: yup
		.string()
		.required()
		.matches(/^[a-zA-Zа-яА-Я-]*$/, {
			message: 'Cannot contain space and special symbols',
		})
		.test('firstSymbolUpperCase', 'First symbol must be to upper case', value => {
			if (!value) {
				return;
			}
			return !!value[0].match(/^[A-ZА-Я]*$/);
		}),
	email: yup
		.string()
		.required()
		.matches(/.+@.+\..+/, 'Invalid email'),
	phone: yup
		.string()
		.required()
		.matches(/\d+|\+\d+|\+\d\(\d{3}\)\d{7}/, 'Can be only numbers, may start from +')
		.min(10)
		.max(15),
});

export const updatePasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required()
		.min(8)
		.max(40)
		.test(
			'containNumberAndUpperCaseSymbol',
			'Must contain number and upper case symbol',
			value => {
				if (!value) {
					return;
				}
				return !!value.match(/[0-9]/) && !!value.match(/[A-Z]/);
			},
		),
	newPasswordRepeat: yup
		.string()
		.required()
		.oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export const updateAvatarSchema = yup.object({
	avatar: yup
		.mixed()
		.test('file-present', 'File is required', value => (value as string)?.length > 0),
});

export const forumSchema = yup.object({
	TopicTheme: yup.string().required().min(10).max(20),
	TopicContent: yup.string().required().min(10).max(100),
	comment: yup.string().required().min(10).max(100),
});
