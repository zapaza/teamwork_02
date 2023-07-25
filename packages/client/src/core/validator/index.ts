import * as yup from 'yup'

export const AuthSchema = yup
  .object({
    login: yup.string().required().min(4).max(20),
  })
  .required()
