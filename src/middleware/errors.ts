/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Request, Response, NextFunction } from 'express'

type catchAsync = (req: Request, res: Response, next: NextFunction) => any

export const catchAsync = (fn: catchAsync) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export const notFound = (_: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' })
}

export const serverError = (err: any, _: Request, res: Response, _next: NextFunction) => {
  if (!err.status) {
    console.error(err.stack)
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal server error.' })
}
