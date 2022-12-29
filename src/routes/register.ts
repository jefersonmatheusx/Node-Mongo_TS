import { BadRequest } from './../errors/index';
import { guest } from './../middleware/auth'
import { logIn } from './shared/auth'
import { UserDocument, User } from '@src/models/User'
import { Router } from 'express'
import { validate, registerSchema } from '../util/validation'
import { catchAsync } from '@src/middleware'
import { Request, Response } from 'express-serve-static-core'
const router = Router()

router.post(
  '/register',
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(registerSchema, req.body)
    const { email, password, name } = req.body as UserDocument

    const found = await User.exists({ email })
    if (found) {
      throw new BadRequest('Invalid email.')
    }

    const user = await User.create({ email, name, password })

    logIn(req, user.id as string)
    res.json(user)
  }),
)
export default router
