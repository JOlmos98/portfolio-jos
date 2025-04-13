import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { newsletterSubscribers } from "@/db/drizzle/schema";
import { newsletterSchema } from "@/zod/newsletterSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const parsed = newsletterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const { email } = parsed.data;

  try {
    // Sería: SELECT * FROM newsletter_subscribers WHERE email = newsletterSubscribers.email;
    const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));

    // Si se encuentra un registro con el mismo email, se devuelve un error 409
    if (existing.length > 0) {
      return res.status(409).json({ message: "Este email ya está suscrito" });
    }

    // Inserta el registro en la tabla newsletter_subscribers
    await db.insert(newsletterSubscribers).values({ email });
    return res.status(201).json({ message: "Suscripción completada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
