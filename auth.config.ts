import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/zod"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"


export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
       
        const {data , success } = loginSchema.safeParse(credentials)

        if(!success) { 
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if(!user) throw new Error("Invalid credentials")

          //valido la contraseña hasheada del usuario

        const passwordMatch = await bcrypt.compare(data.password, user.password!)

        if (!passwordMatch) { 
          throw new Error("Invalid credentials")
        }

        return user

      },
    }),
  ],
} satisfies NextAuthConfig