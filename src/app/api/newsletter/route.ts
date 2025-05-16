import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { newsletterSubscribers } from "@/db/drizzle/schema";
import { newsletterSchema } from "@/zod/newsletterSchema";
// import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Comprobar si ya existe el email
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Este email ya está suscrito" },
        { status: 409 }
      );
    }

    // Enviar email de bienvenida con Resend
    await resend.emails.send({
      from: "Jesús Olmos <onboarding@resend.dev>", // o dominio verificado
      to: email,
      subject: "Hello World, I’m Jesús",
      html: `
        <div style="font-family: sans-serif; padding: 1rem">
          <h2>Thank you for subscribing!</h2>
          <p>We welcome you to <strong>Jesús Olmos' IT newsletter</strong>.</p>
          <p>You'll soon receive updates on web development, programming, and technology.</p>
          <p>See you soon!</p>
        </div>
      `,
    });

    // Guardar suscripción
    await db.insert(newsletterSubscribers).values({ email });

    return NextResponse.json(
      { message: "Suscripción completada con éxito" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
