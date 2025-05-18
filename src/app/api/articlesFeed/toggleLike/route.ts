import { db } from "@/db/drizzle";
import { userSavedArticles } from "@/db/drizzle/schema";
import { authOptions } from "@/lib/authOptions";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);
  const { articleId } = await req.json();

  if (!articleId || isNaN(articleId)) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  try {
    const existing = await db
      .select()
      .from(userSavedArticles)
      .where(and(eq(userSavedArticles.userId, userId), eq(userSavedArticles.articleId, articleId)));

    if (existing.length > 0) {
      await db.delete(userSavedArticles).where(
        and(eq(userSavedArticles.userId, userId), eq(userSavedArticles.articleId, articleId))
      );
      return NextResponse.json({ liked: false });
    } else {
      await db.insert(userSavedArticles).values({ userId, articleId });
      return NextResponse.json({ liked: true });
    }
  } catch (err) {
    console.error("Error toggling like:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
