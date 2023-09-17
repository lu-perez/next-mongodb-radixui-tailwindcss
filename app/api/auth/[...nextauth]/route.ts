import NextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'

export const options: NextAuthOptions = {
  providers: [],
  pages: {},
  session: {},
  callbacks: {}
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
