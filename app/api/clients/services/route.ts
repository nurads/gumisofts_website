import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeService } from "@/lib/serializers";

export async function GET() {
    const items = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
    return NextResponse.json(items.map(serializeService));
}
