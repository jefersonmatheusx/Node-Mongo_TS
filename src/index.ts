import './pre-start' // Must be the first import

import session from 'express-session'
import logger from 'jet-logger'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import mongoose from 'mongoose'
import { APP_PORT } from './config'
import EnvVars from '@src/declarations/major/EnvVars'

import { createApp } from './app'

import { REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS } from './config'
;(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  
  const RedisStore = connectRedis(session)
  
  const client = new Redis(REDIS_OPTIONS)
  
  const store = new RedisStore({ client })
  
  const app = createApp(store)
  
  // **** Start server **** //
  const msg = 'Express server started on port: ' + EnvVars.port.toString()
  app.listen(APP_PORT, () => logger.info(msg))
})()
