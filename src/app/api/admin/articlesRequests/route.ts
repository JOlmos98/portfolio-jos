import { db } from "@/db/drizzle";
import { articleRequests } from "@/db/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(articleRequests);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
