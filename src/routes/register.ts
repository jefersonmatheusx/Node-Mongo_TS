import { logIn } from './shared/auth'
import { User } from '@src/models/User'
import { Router } from 'express'
import { registerSchema } from '../util/validation'
const router = Router()

router.post('/register', async (req, res) => {
  await registerSchema.validateAsync(req.body, { abortEarly: false })
  const { email, name, password } = req.body

  const found = await User.exists({ email })
  if (found) {
    throw new Error('Invalid email.')
  }

  const user = await User.create({ email, name, password })

  logIn(req, user.id)
  res.json(user)
})

export default router
