import { db } from "@/db/drizzle";
import { articles, articleTags } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  // const body = await req.json();
  // const { articleId, tagIds }: { articleId: number; tagIds: number[] } = body;

  const { articleId, tagIds, imageUrl } = await req.json();

  if (!articleId || !Array.isArray(tagIds)) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  if (tagIds) {
    await db.delete(articleTags).where(eq(articleTags.articleId, articleId));

    const values = tagIds.map((tagId) => ({ articleId, tagId }));
    await db.insert(articleTags).values(values);
  }

  if (imageUrl) {
    await db.update(articles)
      .set({ imageUrl })
      .where(eq(articles.id, articleId));
  }


  return NextResponse.json({ message: "Tags assigned successfully" }, { status: 200 });
}
