import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer')

// Recomendado: usa variables de entorno para evitar exponer tu contraseña
const EMAIL_FROM = process.env.EMAIL_FROM || "tucorreo@hotmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "tu-contraseña";
const EMAIL_TO = "soler8@hotmail.es"; // receptor fijo

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Método no permitido");

  const { fullName, email, content } = req.body;

  // Validación mínima de campos
  if (!fullName || !email || !content) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail", // también puedes usar 'Outlook365' si usas cuenta pro
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `Nuevo mensaje de contacto de ${fullName}`,
      text: `Nombre: ${fullName}\nEmail: ${email}\n\nMensaje:\n${content}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}
