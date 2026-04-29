import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const items = await prisma.testimonial.findMany({
        where: { isApproved: true },
        orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
}
