"use server"

import { z } from "zod"
import { loginSchema, registerSchema } from "@/lib/zod"
import { signIn } from "../auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from 'next/cache'

export const authenticate = async (values: z.infer<typeof loginSchema>) => {
  try {
    // Primero verificamos si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email }
    });

    if (!existingUser) {
      console.log("Usuario no existe");
      return {
        success: false,
        status: 401,
        message: "El usuario no existe",
        redirect: false
      };
    }

    await signIn("credentials", {
      ...values,
      redirect: false
    });

    return { success: true, status: 200 };
  } catch (error: any) {
    console.log("Error en autenticación:", error);
    
    let message = "Error de autenticación";
    
    if (error instanceof AuthError) {
      message = error.message;
    } else if (error.cause?.message) {
      message = error.cause.message;
    } else if (error.message) {
      message = error.message;
    }

    return {
      success: false,
      status: message === 'Email de verificacion enviado' ? 418 : 401,
      message: message,
      redirect: false
    };
  }
}

export async function handleRegister(values: z.infer<typeof registerSchema>) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email }
    });

    if (existingUser) {
      console.log("Usuario ya existe - Status: 400");
      return {
        success: false,
        message: "El usuario ya existe",
        status: 400
      };
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);
    
    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword
      }
    });

    return {
      success: true,
      message: "Usuario registrado exitosamente",
      status: 200
    };

  } catch (error) {
    console.error("Error en registro:", error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error durante el registro",
      status: 500
    };
  }
}
