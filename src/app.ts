import { serverError, notFound } from './middleware/errors'

import morgan from 'morgan'
import path from 'path'
import helmet from 'helmet'
import express, { Request, Response } from 'express'
import 'express-async-errors'
import logger from 'jet-logger'
import cookieParser from 'cookie-parser'
import session, { Store } from 'express-session'

import EnvVars from '@src/declarations/major/EnvVars'
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'
import { NodeEnvs } from '@src/declarations/enums'
import { RouteError } from '@src/declarations/classes'
import { home, logIn, register } from './routes'
import { SESSION_OPTIONS } from './config'

export const createApp = (store: Store) => {
  // **** Init express **** //
  const app = express()

  app.use(
    session({
      store,
      ...SESSION_OPTIONS,
    }),
  )

  // **** Set basic express settings **** //
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser(EnvVars.cookieProps.secret))

  // Show routes called in console during development
  if (EnvVars.nodeEnv === NodeEnvs.Dev) {
    app.use(morgan('dev'))
  }

  // Security
  if (EnvVars.nodeEnv === NodeEnvs.Production) {
    app.use(helmet())
  }

  // **** Add API routes **** //
  app.use(register)
  app.use(logIn)
  app.use(home)

  // Add APIs
  app.use(notFound)

  // Setup error handler
  app.use(serverError)

  // **** Serve front-end content **** //

  // Set views directory (html)
  const viewsDir = path.join(__dirname, 'views')
  app.set('views', viewsDir)

  // Set static directory (js and css).
  const staticDir = path.join(__dirname, 'public')
  app.use(express.static(staticDir))

  // Nav to login pg by default
  app.get('/', (_: Request, res: Response) => {
    res.sendFile('login.html', { root: viewsDir })
  })

  // Redirect to login if not logged in.
  app.get('/users', (req: Request, res: Response) => {
    const jwt = req.signedCookies[EnvVars.cookieProps.key]
    if (!jwt) {
      res.redirect('/')
    } else {
      res.sendFile('users.html', { root: viewsDir })
    }
  })

  return app
}
