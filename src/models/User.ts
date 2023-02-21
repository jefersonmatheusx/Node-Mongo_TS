/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BCRYPT_WORK_FACTOR } from './../config/auth'
import { compare, hash } from 'bcrypt'
import { Schema, model, Document } from 'mongoose'

export interface UserDocument extends Document {
  email: string
  name: string
  password: string
  matchesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  {
    timestamps: true,
  },
)

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
  }
})

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password as string)
}

userSchema.set('toJSON', {
  transform: (_doc, { __v, password, ...rest }, _options) => rest,
})

export const User = model<UserDocument>('User', userSchema)
