import { db } from "@/db/drizzle";
import { tags } from "@/db/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allTags = await db.select().from(tags);
  return NextResponse.json(allTags);
}
