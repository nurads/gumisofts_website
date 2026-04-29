import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
    const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return (
        <>
            <AdminPageHeader
                title="Testimonials"
                description={`${items.length} client testimonials`}
                actionLabel="New Testimonial"
                actionHref="/admin/testimonials/new"
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Position</th>
                                <th className="px-4 py-3 text-left font-medium">Rating</th>
                                <th className="px-4 py-3 text-left font-medium">Approved</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">No testimonials yet.</td></tr>}
                            {items.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{t.position}{t.company ? ` — ${t.company}` : ""}</td>
                                    <td className="px-4 py-3 text-gray-600">{"★".repeat(t.rating)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${t.isApproved ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                                            {t.isApproved ? "approved" : "pending"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/admin/testimonials/${t.id}`} className="text-[#2b3991] hover:text-[#1f2a6b] font-medium">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
