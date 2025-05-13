import { db } from "@/db/drizzle";
import { articleRequests } from "@/db/drizzle/schema";
import { articleRequestSchema } from "@/zod/articleRequestSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = articleRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { url, title, description } = parsed.data;

    await db.insert(articleRequests).values({
      userId: Number(token.id),
      url,
      title,
      description: description || null,
      status: "pending"
    });

    return NextResponse.json({ message: "Article request submitted" }, { status: 201 });
  } catch (err) {
    console.error("Error submitting article request:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
