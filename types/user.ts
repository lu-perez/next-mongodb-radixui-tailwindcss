export type User = {
  _id: string
  email: string
  password: string
  fullName: string
}

export type NewUser = Omit<User, '_id'>
