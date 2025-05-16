import { db } from "@/db/drizzle";
import { articleTags, tags } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const articleId = Number(id);
  if (isNaN(articleId)) return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });

  try {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(articleTags)
      .innerJoin(tags, eq(articleTags.tagId, tags.id))
      .where(eq(articleTags.articleId, articleId));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error fetching article tags:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
