import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/serializers";

export async function GET() {
    const items = await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        include: { pricingTiers: true },
    });
    return NextResponse.json(items.map(serializeProduct));
}
