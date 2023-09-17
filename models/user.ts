import { User } from '@/types/user'
import { Schema, model } from 'mongoose'

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid',
      ]
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: [6, 'password must be at least 6 characters'],
      select: false,
    },
    fullName: {
      type: String,
      required: [true, 'fullname is required'],
      minLength: [3, 'fullname must be at least 3 characters'],
      maxLength: [20, 'fullname must be at most 20 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model<User>('User', UserSchema)
