import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProject } from "@/lib/serializers";

export async function GET() {
    const items = await prisma.project.findMany({
        where: { isFeatured: true },
        orderBy: { order: "asc" },
    });
    return NextResponse.json(items.map(serializeProject));
}
