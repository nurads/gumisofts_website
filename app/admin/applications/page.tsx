import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
    pending: "bg-blue-100 text-blue-800",
    reviewed: "bg-amber-100 text-amber-800",
    interview: "bg-purple-100 text-purple-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
};

export default async function ApplicationsPage() {
    const applications = await prisma.jobApplication.findMany({
        orderBy: { appliedAt: "desc" },
        include: { job: { select: { title: true } } },
    });

    return (
        <>
            <AdminPageHeader
                title="Job Applications"
                description={`${applications.length} applications received`}
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Applicant</th>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Position</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Applied</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                                        No applications yet.
                                    </td>
                                </tr>
                            )}
                            {applications.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{a.fullName}</td>
                                    <td className="px-4 py-3 text-gray-600">{a.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{a.job?.title ?? "—"}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_BADGE[a.status] ?? STATUS_BADGE.pending
                                                }`}
                                        >
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">
                                        {new Date(a.appliedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/admin/applications/${a.id}`}
                                            className="text-[#2b3991] hover:text-[#1f2a6b] font-medium"
                                        >
                                            Review
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
