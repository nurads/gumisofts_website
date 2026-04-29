import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeCompanyStats } from "@/lib/serializers";

export async function GET() {
    const company = await prisma.companyInfo.findFirst({
        where: { isDefault: true },
    });
    if (!company) return NextResponse.json([]);
    return NextResponse.json([serializeCompanyStats(company)]);
}
