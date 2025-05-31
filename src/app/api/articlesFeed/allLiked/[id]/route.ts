import { db } from "@/db/drizzle";
import { articles, userSavedArticles } from "@/db/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) { return NextResponse.json({ error: "Invalid user ID" }, { status: 400 }); }

  try {
    const savedArticles = await db
      .select({
        id: articles.id,
        userId: articles.userId,
        url: articles.url,
        title: articles.title,
        imageUrl: articles.imageUrl,
        description: articles.description,
        articleCreatedAt: articles.createdAt,
        savedAt: userSavedArticles.createdAt,
      })
      .from(userSavedArticles)
      .innerJoin(articles, eq(userSavedArticles.articleId, articles.id))
      .where(eq(userSavedArticles.userId, userId))
      .orderBy(desc(userSavedArticles.createdAt));

    return NextResponse.json(savedArticles);
  } catch (err) {
    console.error("Error fetching saved articles:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
