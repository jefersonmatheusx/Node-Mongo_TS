/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type catchAsync = (req: Request, res: Response, next: NextFunction) => any

export const catchAsync = (fn: catchAsync) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fn(req, res, next).catch(next)
  }
}
