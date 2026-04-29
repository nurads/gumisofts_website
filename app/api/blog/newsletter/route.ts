import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const subscribeSchema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sub = await prisma.newsletterSubscriber.upsert({
        where: { email: parsed.data.email },
        update: { isActive: true, unsubscribedAt: null },
        create: { email: parsed.data.email },
    });

    return NextResponse.json({ id: sub.id, email: sub.email }, { status: 201 });
}
