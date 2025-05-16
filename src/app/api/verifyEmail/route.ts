import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import { detectLocale } from "@/lib/detectLocale";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const locale = detectLocale(req);

  if (!token) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verifiedError`);

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as { email: string };
    const email = decoded.email;

    await db.update(users)
      .set({ isVerified: true })
      .where(eq(users.email, email));

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verifiedSuccess`);
  } catch (err) {
    console.error("Invalid or expired token:", err);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verifiedError`);
  }
}
