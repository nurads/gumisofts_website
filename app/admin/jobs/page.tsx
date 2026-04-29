import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
    const jobs = await prisma.job.findMany({
        orderBy: { postedAt: "desc" },
        include: { _count: { select: { applications: true } } },
    });

    return (
        <>
            <AdminPageHeader
                title="Jobs"
                description={`${jobs.length} job postings`}
                actionLabel="New Job"
                actionHref="/admin/jobs/new"
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Title</th>
                                <th className="px-4 py-3 text-left font-medium">Department</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Applications</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {jobs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                                        No jobs yet.
                                    </td>
                                </tr>
                            )}
                            {jobs.map((j) => (
                                <tr key={j.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{j.title}</td>
                                    <td className="px-4 py-3 text-gray-600">{j.department}</td>
                                    <td className="px-4 py-3 text-gray-600">{j.type}</td>
                                    <td className="px-4 py-3 text-gray-600">{j._count.applications}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${j.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {j.isActive ? "active" : "draft"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/admin/jobs/${j.id}`}
                                            className="text-[#2b3991] hover:text-[#1f2a6b] font-medium"
                                        >
                                            Edit
                                        </Link>
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
