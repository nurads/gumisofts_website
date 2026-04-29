import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeJob } from "@/lib/serializers";

export async function GET() {
    const items = await prisma.job.findMany({
        where: { isActive: true },
        orderBy: { postedAt: "desc" },
    });
    return NextResponse.json(items.map(serializeJob));
}
