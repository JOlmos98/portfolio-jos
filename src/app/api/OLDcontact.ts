import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

//Usamos variables de entorno para más seguridad
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = "asimov1891998@gmail.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") return res.status(405).end("Método no permitido");

    const { fullName, email, content } = req.body;

    if (!fullName || !email || !content) return res.status(400).json({ error: "Faltan campos requeridos" });

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_FROM,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: `Nuevo mensaje de contacto de ${fullName}, <${email}>`,
            //text: `Nombre: ${fullName}\nEmail: ${email}\n\nMensaje:\n${content}`,
            html: "<h2><strong style=\"color: blue;\">Nombre: </strong>" + fullName + "</h2>" + "\n<h2><strong style=\"color: blue;\">Email: </strong>" + email + "</h2>" + "\n\n<h2><strong style=\"color: blue;\">Mensaje: </strong>" + content + "</h2>"
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Correo enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({ error: "Error al enviar el correo" });
    }
}
