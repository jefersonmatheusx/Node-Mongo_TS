import { Unauthorized, BadRequest } from './../errors/index';
import { isLoggedIn } from './../routes/shared/auth'
import { Request, Response, NextFunction } from 'express'
export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest('You are already Logged in'))
  }
  next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized('You must be logged in'))
  }
}
