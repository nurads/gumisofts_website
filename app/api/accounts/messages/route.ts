import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const messageSchema = z.object({
    full_name: z.string().min(1),
    email: z.string().email(),
    content: z.string().min(1),
    phone: z.string().optional(),
    company: z.string().optional(),
});

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const lead = await prisma.lead.create({
        data: {
            fullName: parsed.data.full_name,
            email: parsed.data.email,
            content: parsed.data.content,
            phone: parsed.data.phone,
            company: parsed.data.company,
            source: "contact-form",
        },
    });

    return NextResponse.json({ id: lead.id, status: "received" }, { status: 201 });
}
