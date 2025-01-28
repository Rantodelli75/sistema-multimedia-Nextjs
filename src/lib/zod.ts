import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email es invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener mas de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})

export const registerSchema = object({
  name: string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido"),
    
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email es invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener mas de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})
