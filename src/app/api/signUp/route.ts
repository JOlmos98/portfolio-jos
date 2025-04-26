import type { NextApiRequest, NextApiResponse } from "next";
import { signUpSchema } from "@/zod/signUpSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { detectLocale } from "@/lib/detectLocale";

export async function POST(req: Request) {

  if (req.method !== "POST") return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

  try {
    // const body = req.body;
    const body = await req.json();
    console.log("BODY recibido:", body);

    const parsed = signUpSchema.safeParse(body);
    console.log("PARSED:", parsed);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, password, name, last_name, phone, bio, website } = parsed.data;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      passwordHash: hashedPassword,
      name,
      lastName: last_name,
      phone: phone || null,
      bio: bio || null,
      website: website || null,
    });

    //* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ VERIFICACIÓN DE EMAIL ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 

    const verificationToken = jwt.sign(
      { email },                            // Payload, contenido del jwt
      process.env.SUPABASE_JWT_SECRET!,
      { expiresIn: "1d" }                   // Expira en un día
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verifyEmail?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const locale = detectLocale(req);

    if (locale === "es") {
      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Verifica tu cuenta",
        html: `
          <p style="text-align: center; font-size: 20px;">Verifica tu cuenta</p>
          <p style="text-align: center; font-size: 16px;">
            Haz clic en el siguiente enlace para verificar tu cuenta:
          </p>
          <a style="display: block; text-align: center; font-size: 36px;" href="${verificationUrl}">Verificar</a>
        `,
      });
    } else if (locale === "de") {
      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Bestätige deinen Account",
        html: `
          <p style="text-align: center; font-size: 20px;">Bestätige deinen Account</p>
          <p style="text-align: center; font-size: 16px;">
            Klicke auf den folgenden Link, um deinen Account zu bestätigen:
          </p>
          <a style="display: block; text-align: center; font-size: 36px;" href="${verificationUrl}">Bestätigen</a>
        `,
      });
    } else {
      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Verify your account",
        html: `
        <p style="text-align: center; font-size: 20px;">Verify your account</p>
        <p style="text-align: center; font-size: 16px;">
          Click the link below to verify your account:
        </p>
        <a style="display: block; text-align: center; font-size: 36px;" href="${verificationUrl}">Link</a>
      `,
      });
    }
    //* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ VERIFICACIÓN DE EMAIL ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("Error en registro:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

