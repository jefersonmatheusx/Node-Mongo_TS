import { SESSION_NAME } from '@src/config'
import { Request,Response } from 'express'

export const isLoggedIn = (req: Request) => !!req.session.userId

export const logIn = (req: Request, userId: string) => {
  req.session.userId = userId
}
export const logOut = (req: Request, res: Response):Promise<Error|boolean> => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err: Error) => {
      if (err) reject(err)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      res.clearCookie(SESSION_NAME)
      resolve(true)
    })
  })
}
