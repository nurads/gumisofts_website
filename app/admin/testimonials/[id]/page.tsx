import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await prisma.testimonial.findUnique({ where: { id } });
    if (!t) notFound();
    return <TestimonialForm testimonial={t} />;
}
