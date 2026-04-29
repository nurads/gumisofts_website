import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeCompanyInfo } from "@/lib/serializers";

export async function GET() {
    const company = await prisma.companyInfo.findFirst({
        where: { isDefault: true },
    });
    if (!company) {
        return NextResponse.json({ error: "No default company configured" }, { status: 404 });
    }
    return NextResponse.json(serializeCompanyInfo(company));
}
