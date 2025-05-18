import { db } from "@/db/drizzle";
import { userSavedArticles } from "@/db/drizzle/schema";
import { authOptions } from "@/lib/authOptions";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ liked: false }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const { id } = await params;
    const articleId = Number(id);

    if (isNaN(articleId)) {
        return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
    }

    try {
        const result = await db
            .select()
            .from(userSavedArticles)
            .where(and(eq(userSavedArticles.userId, userId), eq(userSavedArticles.articleId, articleId)));

        return NextResponse.json({ liked: result.length > 0 });
    } catch (err) {
        console.error("Error checking like:", err);
        return NextResponse.json({ liked: false }, { status: 500 });
    }
}
