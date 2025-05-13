
import { db } from "@/db/drizzle";
import { articleRequests } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "Missing article request ID" }, { status: 400 });

    await db.update(articleRequests)
      .set({ status: "rejected" })
      .where(eq(articleRequests.id, id));

    return NextResponse.json({ message: "Article request rejected" }, { status: 200 });
  } catch (error) {
    console.error("Error rejecting article request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
