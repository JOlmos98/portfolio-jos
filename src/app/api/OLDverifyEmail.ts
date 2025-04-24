import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string;

  if (!token) return res.status(400).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as { email: string };
    const email = decoded.email;

    await db.update(users)
      .set({ isVerified: true })
      .where(eq(users.email, email));

    // return res.status(200).send("Email verified successfully ✅");
    return res.redirect(302, "/en/verified?status=success");

  } catch (err) {
    console.error("Invalid token", err);
    // return res.status(400).send("Invalid or expired token ❌");
    return res.redirect(302, "/en/verified?status=error&reason=expired-or-invalid");

  }
}
