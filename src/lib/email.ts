import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

interface Credentials {
  web: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  }
}

const loadCredentials = (): Credentials => {
  try {
    const content = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error loading credentials:', err);
    throw err;
  }
};

const createTransporter = async () => {
  try {
    const credentials = loadCredentials();
    const oauth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris[0]
    );

    // Si tienes un token.json guardado, úsalo
    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
      oauth2Client.setCredentials(token);
    } else {
      // Si no tienes token, configura con las variables de entorno
      oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });
    }

    const accessToken = await new Promise<string>((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error('Error al obtener access token:', err);
          reject(err);
        }
        if (!token) {
          reject(new Error('No se pudo obtener el token de acceso'));
          return;
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    // Verifica que el transporter funcione
    await transporter.verify();
    return transporter;

  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
};

export const sendEmail = async (email: string, token: string) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"NightGrovve" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verificación de correo electrónico',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verificación de correo electrónico</h2>
          <p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
          <a href="${process.env.NEXT_PUBLIC_URL}/api/auth/authenticate?token=${token}" 
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                    color: white; text-decoration: none; border-radius: 5px;">
            Verificar correo electrónico
          </a>
          <p style="margin-top: 20px; color: #666;">
            Si no solicitaste esta verificación, puedes ignorar este correo.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado con éxito:', info.response);
    return { success: true, data: info };

  } catch (error) {
    console.error('Error en sendEmail:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido al enviar el email'
    };
  }
};