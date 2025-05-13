import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select({
      id: users.id,
      name: users.name,
      last_name: users.lastName,
      email: users.email,
      password: users.passwordHash,
      phone: users.phone,
      bio: users.bio,
      website: users.website,
    }).from(users);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
