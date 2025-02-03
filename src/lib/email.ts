import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "NextAuth <onboarding@resend.dev>",
      to: email,
      subject: 'Verificación de correo electrónico',
      html: `<p>entra en el enlace para verificar tu correo electrónico: 
      <a href="${process.env.NEXT_PUBLIC_URL}api/auth/verify-email?token=${token}">Verificar correo electrónico</a>
      </p>`,
    })

    return { success: true }

  } catch (error) {
    console.error(error)
    return { success: false }
  }
}