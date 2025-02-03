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
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      // Aquí traducimos los mensajes de error específicos
      switch (result.error) {
        case 'Invalid credentials':
          return { success: false, message: 'Credenciales inválidas' }
        case 'Email de verificacion enviado':
          return { success: false, message: 'Por favor verifica tu correo electrónico' }
        default:
          return { success: false, message: result.error }
      }
    }

    return { 
      success: true, 
      redirectUrl: '/dashboard'
    }
  } catch (error) {
    console.error('Error de autenticación:', error)
    return { 
      success: false, 
      message: 'Error en el servidor'
    }
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