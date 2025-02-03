import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/zod"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { sendEmail } from "@/lib/email"


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

        if (!user.emailVerified) {

          const emailToken = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email || ''
            },
          })

          if (emailToken?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                  identifier: user.email || ''
              },
            })
          }

          const token = randomUUID()

          await prisma.verificationToken.create({
            data: {
              identifier: user.email || '',
              token: token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          })

          await sendEmail(user.email || '', token)

          throw new Error("Email de verificacion enviado")
        }

        return user

      },
    }),
  ],
} satisfies NextAuthConfig
  