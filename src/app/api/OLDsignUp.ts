import type { NextApiRequest, NextApiResponse } from "next";
import { signUpSchema } from "@/zod/signUpSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body;
    console.log("BODY recibido:", body);

    const parsed = signUpSchema.safeParse(body);
    console.log("PARSED:", parsed);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { email, password, name, last_name, phone, bio, website } = parsed.data;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
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
    
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/en/api/verifyEmail?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Verify your account",
      html: `
        <p style="text-align: center; font-size: 20px;">Verify your account</p>
        <p style="text-align: center; font-size: 16px;">
          Click the link below to verify your account:
        </p>
        <a style="text-align: center; font-size: 36px;" href="${verificationUrl}">Link</a>
      `,
    });

    //* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ VERIFICACIÓN DE EMAIL ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 

    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error en registro:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}





// import { NextResponse } from "next/server";
// import { signUpSchema } from "@/zod/signUpSchema";
// import bcrypt from "bcryptjs";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // Validar con Zod (servidor)
//     const parsed = signUpSchema.safeParse(body);
//     if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

//     const { email, password, name, last_name, phone, bio, website } = parsed.data;

//     // Verificar si ya existe el email
//     const { data: existingUser, error: findError } = await supabase
//       .from("users")
//       .select("id")
//       .eq("email", email)
//       .single();

//     if (existingUser) {
//       return NextResponse.json({ error: "Email already exists" }, { status: 409 });
//     }

//     // Encriptar la contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insertar nuevo usuario
//     const { error: insertError } = await supabase.from("users").insert({
//       email,
//       password: hashedPassword,
//       name,
//       last_name,
//       phone: phone || null,
//       bio: bio || null,
//       website: website || null,
//       created_at: new Date().toISOString(),
//     });

//     if (insertError) {
//       console.error(insertError);
//       return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//     }

//     return NextResponse.json({ message: "User created" }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
