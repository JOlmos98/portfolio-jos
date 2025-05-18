import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = "asimov1891998@gmail.com";

export async function POST(req: Request) {
  try {
    const { fullName, email, content } = await req.json();

    if (!fullName || !email || !content) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

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
      html: `
        <h2><strong style="color: blue;">Nombre:</strong> ${fullName}</h2>
        <h2><strong style="color: blue;">Email:</strong> ${email}</h2>
        <h2><strong style="color: blue;">Mensaje:</strong> ${content}</h2>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Correo enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { error: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
