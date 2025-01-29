"use server"

import { z } from "zod"
import { registerSchema } from "@/lib/zod"
import { signIn } from "../auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from 'next/cache'

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    })

    return { success: true, message: 'Login exitoso' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Credenciales inválidas' }
        default:
          return { success: false, message: 'Algo salió mal' }
      }
    }
    throw error
  }
}

export const handleRegister = async (
    values: z.infer<typeof registerSchema>
) => {
    try {

        const {data, success} = registerSchema.safeParse(values)

        if(!success) {
            throw new Error("Invalid credentials")
        }

        //validacion si el user existe a traves del email
        const user = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if(user) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        //creacion del usuario

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })

        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        return {
            success: true,
            message: 'Usuario registrado exitosamente'
        }
       
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error en el registro',
        }
    } finally {
        // Revalidar la ruta si es necesario
        revalidatePath('/register')
    }
}