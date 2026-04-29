import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job || !job.isActive) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const contentType = req.headers.get("content-type") || "";

    let fullName = "";
    let email = "";
    let linkedIn = "";
    let coverLetter: string | undefined;
    let resumeUrl = "";

    if (contentType.includes("multipart/form-data")) {
        const form = await req.formData();
        fullName = String(form.get("full_name") ?? "");
        email = String(form.get("email") ?? "");
        linkedIn = String(form.get("linkedin") ?? "");
        const coverLetterValue = form.get("cover_letter");
        coverLetter = coverLetterValue ? String(coverLetterValue) : undefined;

        const file = form.get("resume");
        if (file instanceof File && file.size > 0) {
            const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
            await mkdir(uploadsDir, { recursive: true });
            const ext = path.extname(file.name) || ".pdf";
            const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
            const fullPath = path.join(uploadsDir, safeName);
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(fullPath, buffer);
            resumeUrl = `/uploads/resumes/${safeName}`;
        }
    } else {
        const body = await req.json().catch(() => ({}));
        fullName = body.full_name ?? "";
        email = body.email ?? "";
        linkedIn = body.linkedin ?? body.linkedIn ?? "";
        coverLetter = body.cover_letter ?? body.coverLetter;
        resumeUrl = body.resume ?? "";
    }

    if (!fullName || !email || !linkedIn) {
        return NextResponse.json(
            { error: "full_name, email and linkedin are required" },
            { status: 400 }
        );
    }

    const application = await prisma.jobApplication.create({
        data: {
            jobId: id,
            fullName,
            email,
            linkedIn,
            resumeUrl,
            coverLetter,
            status: "pending",
        },
    });

    return NextResponse.json(application, { status: 201 });
}
