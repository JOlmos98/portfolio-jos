// src/app/api/articles/[id]/tags/route.ts
import { db } from "@/db/drizzle";
import { articleTags, tags } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  
  const aParams = await params;
  const articleId = Number(aParams.id);

  if (isNaN(articleId)) return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });

  try {
    const result = await db
      .select({ id: tags.id, name: tags.name })
      .from(articleTags)
      .innerJoin(tags, eq(articleTags.tagId, tags.id))
      .where(eq(articleTags.articleId, articleId));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
