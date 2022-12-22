import { isLoggedIn } from './../routes/shared/auth'
import { Request, Response, NextFunction } from 'express'
export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new Error('You are already Logged in'))
  }
  next()
}
