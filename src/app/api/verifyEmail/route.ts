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

  if (!token) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verifiedError?reason=missing-token`);

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

// return NextResponse.redirect("/en/verified?status=success");
// return NextResponse.redirect("/en/verifiedSuccess");

// return NextResponse.redirect("/en/verified?status=error&reason=expired-or-invalid");
// return NextResponse.redirect("/en/verifiedError");

// import { db } from "@/db/drizzle";
// import { users } from "@/db/drizzle/schema";
// import { eq } from "drizzle-orm";
// import jwt from "jsonwebtoken";
// import { NextApiRequest, NextApiResponse } from "next";

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const token = req.query.token as string;

//   if (!token) return res.status(400).json({ error: "Missing token" });

//   try {
//     const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as { email: string };
//     const email = decoded.email;

//     await db.update(users)
//       .set({ isVerified: true })
//       .where(eq(users.email, email));

//     // return res.status(200).send("Email verified successfully ✅");
//     return res.redirect(302, "/en/verified?status=success");

//   } catch (err) {
//     console.error("Invalid token", err);
//     // return res.status(400).send("Invalid or expired token ❌");
//     return res.redirect(302, "/en/verified?status=error&reason=expired-or-invalid");

//   }
// }
