import { auth, guest } from './../middleware/auth'
import { logIn, logOut } from './shared/auth'
import { Unauthorized } from './../errors/index'
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@src/models/User'
import { catchAsync } from './../middleware/errors'
import { Router } from 'express'
import { validate, loginSchema } from '../util/validation'
const router = Router()
router.post(
  '/login',
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body)

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.matchesPassword(password as string)) {
      throw new Unauthorized('Incorrect email or password')
    }

    logIn(req, user.id as string)
    res.json({ message: 'Ok' })
  }),
)
router.post(
  '/logout',
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res)
    res.json({ message: 'Ok' })
  }),
)

export default router
