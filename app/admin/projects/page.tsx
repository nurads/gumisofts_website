import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

    return (
        <>
            <AdminPageHeader
                title="Projects"
                description={`${projects.length} portfolio entries`}
                actionLabel="New Project"
                actionHref="/admin/projects/new"
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Title</th>
                                <th className="px-4 py-3 text-left font-medium">Category</th>
                                <th className="px-4 py-3 text-left font-medium">Featured</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {projects.length === 0 && (
                                <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-400">No projects yet.</td></tr>
                            )}
                            {projects.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                                    <td className="px-4 py-3 text-gray-600">{p.category}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${p.isFeatured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                                            {p.isFeatured ? "featured" : "hidden"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/admin/projects/${p.id}`} className="text-[#2b3991] hover:text-[#1f2a6b] font-medium">Edit</Link>
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
