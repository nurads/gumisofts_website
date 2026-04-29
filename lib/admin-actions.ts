"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function requireAdmin() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    return session;
}

const toJsonArray = (raw: FormDataEntryValue | null) => {
    const text = (raw as string | null) ?? "";
    return JSON.stringify(
        text
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
    );
};

const toInt = (raw: FormDataEntryValue | null) => {
    const v = raw == null ? null : String(raw).trim();
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
};

// ---------- Leads ----------

export async function updateLead(id: string, formData: FormData) {
    await requireAdmin();
    await prisma.lead.update({
        where: { id },
        data: {
            status: String(formData.get("status") ?? "new"),
            notes: (formData.get("notes") as string | null) || null,
        },
    });
    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLead(id: string) {
    await requireAdmin();
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
    redirect("/admin/leads");
}

// ---------- Newsletter ----------

export async function deleteSubscriber(id: string) {
    await requireAdmin();
    await prisma.newsletterSubscriber.delete({ where: { id } });
    revalidatePath("/admin/newsletter");
}

export async function toggleSubscriber(id: string) {
    await requireAdmin();
    const sub = await prisma.newsletterSubscriber.findUnique({ where: { id } });
    if (!sub) return;
    await prisma.newsletterSubscriber.update({
        where: { id },
        data: {
            isActive: !sub.isActive,
            unsubscribedAt: sub.isActive ? new Date() : null,
        },
    });
    revalidatePath("/admin/newsletter");
}

// ---------- Job Applications ----------

export async function updateApplication(id: string, formData: FormData) {
    await requireAdmin();
    await prisma.jobApplication.update({
        where: { id },
        data: {
            status: String(formData.get("status") ?? "pending"),
            notes: (formData.get("notes") as string | null) || null,
        },
    });
    revalidatePath("/admin/applications");
    revalidatePath(`/admin/applications/${id}`);
}

export async function deleteApplication(id: string) {
    await requireAdmin();
    await prisma.jobApplication.delete({ where: { id } });
    revalidatePath("/admin/applications");
    redirect("/admin/applications");
}

// ---------- Jobs ----------

export async function saveJob(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        title: String(formData.get("title") ?? ""),
        department: String(formData.get("department") ?? ""),
        location: String(formData.get("location") ?? ""),
        type: String(formData.get("type") ?? "full-time"),
        experience: String(formData.get("experience") ?? ""),
        description: String(formData.get("description") ?? ""),
        requirements: toJsonArray(formData.get("requirements")),
        responsibilities: toJsonArray(formData.get("responsibilities")),
        benefits: toJsonArray(formData.get("benefits")),
        salaryMin: toInt(formData.get("salaryMin")),
        salaryMax: toInt(formData.get("salaryMax")),
        salaryCurrency: String(formData.get("salaryCurrency") || "USD"),
        deadline: new Date(String(formData.get("deadline") || new Date().toISOString())),
        isActive: formData.get("isActive") === "on",
    };

    if (id) {
        await prisma.job.update({ where: { id }, data });
    } else {
        await prisma.job.create({ data });
    }
    revalidatePath("/admin/jobs");
    redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
    await requireAdmin();
    await prisma.job.delete({ where: { id } });
    revalidatePath("/admin/jobs");
    redirect("/admin/jobs");
}

// ---------- Products ----------

export async function saveProduct(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        slug: String(formData.get("slug") ?? ""),
        name: String(formData.get("name") ?? ""),
        tagline: String(formData.get("tagline") ?? ""),
        description: String(formData.get("description") ?? ""),
        icon: String(formData.get("icon") || "FiBox"),
        features: toJsonArray(formData.get("features")),
        benefits: toJsonArray(formData.get("benefits")),
        demoUrl: String(formData.get("demoUrl") ?? ""),
        order: toInt(formData.get("order")) ?? 0,
        isActive: formData.get("isActive") === "on",
    };

    if (id) {
        await prisma.product.update({ where: { id }, data });
    } else {
        await prisma.product.create({ data });
    }
    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await requireAdmin();
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    redirect("/admin/products");
}

// ---------- Services ----------

export async function saveService(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        title: String(formData.get("title") ?? ""),
        shortDescription: String(formData.get("shortDescription") ?? ""),
        description: String(formData.get("description") ?? ""),
        icon: String(formData.get("icon") || "FiCloud"),
        category: String(formData.get("category") || "Development"),
        features: toJsonArray(formData.get("features")),
        pricingBasic: toInt(formData.get("pricingBasic")),
        pricingPremium: toInt(formData.get("pricingPremium")),
        pricingEnterprise: toInt(formData.get("pricingEnterprise")),
        order: toInt(formData.get("order")) ?? 0,
        isActive: formData.get("isActive") === "on",
    };

    if (id) {
        await prisma.service.update({ where: { id }, data });
    } else {
        await prisma.service.create({ data });
    }
    revalidatePath("/admin/services");
    redirect("/admin/services");
}

export async function deleteService(id: string) {
    await requireAdmin();
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    redirect("/admin/services");
}

// ---------- Projects ----------

export async function saveProject(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        image: String(formData.get("image") ?? ""),
        category: String(formData.get("category") || "Web"),
        technologies: toJsonArray(formData.get("technologies")),
        demoUrl: (formData.get("demoUrl") as string | null) || null,
        githubUrl: (formData.get("githubUrl") as string | null) || null,
        isFeatured: formData.get("isFeatured") === "on",
        order: toInt(formData.get("order")) ?? 0,
    };

    if (id) {
        await prisma.project.update({ where: { id }, data });
    } else {
        await prisma.project.create({ data });
    }
    revalidatePath("/admin/projects");
    redirect("/admin/projects");
}

export async function deleteProject(id: string) {
    await requireAdmin();
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    redirect("/admin/projects");
}

// ---------- Testimonials ----------

export async function saveTestimonial(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        name: String(formData.get("name") ?? ""),
        position: String(formData.get("position") ?? ""),
        company: String(formData.get("company") ?? ""),
        avatar: String(formData.get("avatar") ?? ""),
        comment: String(formData.get("comment") ?? ""),
        rating: toInt(formData.get("rating")) ?? 5,
        isApproved: formData.get("isApproved") === "on",
        order: toInt(formData.get("order")) ?? 0,
    };

    if (id) {
        await prisma.testimonial.update({ where: { id }, data });
    } else {
        await prisma.testimonial.create({ data });
    }
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    await requireAdmin();
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

// ---------- Blog ----------

export async function saveBlog(id: string | null, formData: FormData) {
    await requireAdmin();
    const data = {
        slug: String(formData.get("slug") ?? ""),
        title: String(formData.get("title") ?? ""),
        excerpt: String(formData.get("excerpt") ?? ""),
        content: String(formData.get("content") ?? ""),
        authorName: String(formData.get("authorName") || "Gumisofts"),
        authorBio: String(formData.get("authorBio") ?? ""),
        category: String(formData.get("category") || "Technology"),
        tags: toJsonArray(formData.get("tags")),
        image: String(formData.get("image") ?? ""),
        readTime: toInt(formData.get("readTime")) ?? 5,
        featured: formData.get("featured") === "on",
        isPublished: formData.get("isPublished") === "on",
    };

    if (id) {
        await prisma.blogPost.update({ where: { id }, data });
    } else {
        await prisma.blogPost.create({ data });
    }
    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

export async function deleteBlog(id: string) {
    await requireAdmin();
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

// ---------- Company info ----------

export async function saveCompany(formData: FormData) {
    await requireAdmin();
    const data = {
        companyName: String(formData.get("companyName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        address: String(formData.get("address") ?? ""),
        companyLocation: String(formData.get("address") ?? ""),
        yearsOfExprience: toInt(formData.get("yearsOfExprience")) ?? 0,
        clientSatisficationRate: toInt(formData.get("clientSatisficationRate")) ?? 0,
        numberOfProjectsCompleted: toInt(formData.get("numberOfProjectsCompleted")) ?? 0,
        numberOfHappyClients: toInt(formData.get("numberOfHappyClients")) ?? 0,
        numberOfYearsInBusiness: toInt(formData.get("numberOfYearsInBusiness")) ?? 0,
        numberOfEmployees: toInt(formData.get("numberOfEmployees")) ?? 0,
        numberOfServices: toInt(formData.get("numberOfServices")) ?? 0,
        scheduleUrl: String(formData.get("scheduleUrl") ?? ""),
        linkedinUrl: String(formData.get("linkedinUrl") ?? ""),
        githubUrl: String(formData.get("githubUrl") ?? ""),
        telegramUrl: String(formData.get("telegramUrl") ?? ""),
        facebookUrl: String(formData.get("facebookUrl") ?? ""),
        instagramUrl: String(formData.get("instagramUrl") ?? ""),
        whatsappUrl: String(formData.get("whatsappUrl") ?? ""),
        youtubeUrl: String(formData.get("youtubeUrl") ?? ""),
    };

    const existing = await prisma.companyInfo.findFirst({ where: { isDefault: true } });
    if (existing) {
        await prisma.companyInfo.update({ where: { id: existing.id }, data });
    } else {
        await prisma.companyInfo.create({ data: { ...data, isDefault: true } });
    }
    revalidatePath("/admin/company");
}

// ---------- Users ----------

export async function createUser(formData: FormData) {
    await requireAdmin();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const name = String(formData.get("name") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const role = String(formData.get("role") || "admin");

    if (!email || !password) throw new Error("email and password required");

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: { email, name, password: passwordHash, role },
    });
    revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
    await requireAdmin();
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
}

export async function resetUserPassword(id: string, formData: FormData) {
    await requireAdmin();
    const password = String(formData.get("password") ?? "");
    if (!password) throw new Error("password required");
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id }, data: { password: passwordHash } });
    revalidatePath("/admin/users");
}
