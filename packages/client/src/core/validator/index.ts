import * as yup from 'yup'

export const signUpSchema = yup.object({
  login: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z0-9-_]*$/, {
      message: 'Can contain only latin symbol or numbers',
    })
    .test('notNumbers', 'Can\'t contain only numbers', value => {
      if (!value) {
        return false
      }
      return !value.match(/^[0-9]*$/)
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
        return !!value.match(/[0-9]/) && !!value.match(/[A-Z]/)
      }
    ),
  repeat_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  first_name: yup
    .string()
    .required()
    .matches(/^[a-zA-Zа-яА-Я-]*$/, {
      message: 'Can\'t contain space and special symbols',
    })
    .test(
      'firstSymbolUpperCase',
      'First symbol must be to upper case',
      value => {
        if (!value) {
          return;
        }
        return !!value[0].match(/^[A-ZА-Я]*$/)
      }
    ),
  second_name: yup
    .string()
    .required()
    .matches(/^[a-zA-Zа-яА-Я-]*$/, {
      message: 'Can\'t contain space and special symbols',
    })
    .test(
      'firstSymbolUpperCase',
      'First symbol must be to upper case',
      value => {
        if (!value) {
          return;
        }
        return !!value[0].match(/^[A-ZА-Я]*$/)
      }
    ),
  email: yup
    .string()
    .required()
    .matches(/.+@.+\..+/, 'Invalid email'),
  phone: yup
    .string()
    .required()
    .matches(
      /\d+|\+\d+|\+\d\(\d{3}\)\d{7}/,
      'Can be only numbers, may start from +'
    )
    .min(10)
    .max(15),
})
