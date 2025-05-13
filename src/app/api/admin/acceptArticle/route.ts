
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import type { ArticleRequestDTO } from "@/types/dto";
import { db } from "@/db/drizzle";
import { articleRequests, articles } from "@/db/drizzle/schema";

export async function POST(req: NextRequest) {
  try {
    const body: Pick<ArticleRequestDTO, "id"> = await req.json();
    const requestId = body.id;

    if (!requestId) {
      return NextResponse.json({ error: "Missing request ID" }, { status: 400 });
    }

    // Obtener el artículo solicitado
    const [articleRequest] = await db
      .select()
      .from(articleRequests)
      .where(eq(articleRequests.id, requestId));

    if (!articleRequest) {
      return NextResponse.json({ error: "Article request not found" }, { status: 404 });
    }

    // Insertar en la tabla de artículos
    await db.insert(articles).values({
      userId: articleRequest.userId,
      url: articleRequest.url,
      title: articleRequest.title,
      description: articleRequest.description || null,
    });

    // Actualizar estado a "accepted"
    await db.update(articleRequests)
      .set({ status: "accepted" })
      .where(eq(articleRequests.id, requestId));

    return NextResponse.json({ message: "Article accepted and inserted" }, { status: 200 });
  } catch (error) {
    console.error("Error accepting article:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
