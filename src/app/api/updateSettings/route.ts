import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { updateSettingsSchema } from "@/zod/updateSettingsSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("BODY recibido:", body);

        const parsed = updateSettingsSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const { userId, avatarUrl, phone, bio, website } = parsed.data;

        await db
            .update(users)
            .set({
                avatarUrl,
                ...(phone !== undefined && { phone }),
                ...(bio !== undefined && { bio }),
                ...(website !== undefined && { website }),
            })
            .where(eq(users.id, Number(userId)));

        return NextResponse.json({ message: "Settings updated successfully" });

    } catch (err) {
        console.error("Error updating settings:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
