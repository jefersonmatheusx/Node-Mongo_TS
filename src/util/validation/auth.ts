import { BCRYPT_MAX_BYTES } from './../../config/auth'
import Joi from '@hapi/joi'

const email = Joi.string().email().min(8).max(254).lowercase().trim().required()
const name = Joi.string().min(3).max(128).trim().required()
const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES, 'utf8')
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit.')
  .required()
const passwordConfirmation = Joi.valid(Joi.ref('password')).required()

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
})

export const loginSchema = Joi.object({email,password})