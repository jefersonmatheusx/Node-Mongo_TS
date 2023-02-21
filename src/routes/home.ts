import { User } from '@src/models/User'
import { auth } from './../middleware/auth'
import { catchAsync } from './../middleware/errors'
import { Request, Response, Router } from 'express'

const router = Router()

router.get(
  '/home',
  auth,
  catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.session.userId)
    res.json(user)
  }),
)
export default router
