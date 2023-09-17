import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import UserModel from '@/models/user'
import { User } from '@/types/user'
import { signUpValidator } from '@/lib/validations/signup-validator'
import { connectDB } from '@/lib/db/db'
import { z } from 'zod'

export async function POST(req: Request): Promise<NextResponse> {

  try {
    const body = await req.json()
    const { email, password, fullName } = signUpValidator.parse(body)

    await connectDB()

    const userFound: User | null = await UserModel.findOne({ email })
    if (userFound) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const savedUser: User = await UserModel.create({
      email,
      password: hashedPassword,
      fullName
    })

    return NextResponse.json(savedUser)

  } catch (error) {
    console.error('Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request payload' }, { status: 422 })
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }

}