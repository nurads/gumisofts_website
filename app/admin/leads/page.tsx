import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-amber-100 text-amber-800",
    qualified: "bg-purple-100 text-purple-800",
    won: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
    archived: "bg-gray-100 text-gray-600",
};

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <>
            <AdminPageHeader
                title="Leads"
                description={`${leads.length} contact form messages and inbound inquiries`}
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Message</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Received</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                                        No leads yet.
                                    </td>
                                </tr>
                            )}
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {lead.fullName}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                                    <td className="px-4 py-3 text-gray-600 max-w-md truncate">
                                        {lead.content}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_BADGE[lead.status] ?? STATUS_BADGE.new
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">
                                        {new Date(lead.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/admin/leads/${lead.id}`}
                                            className="text-[#2b3991] hover:text-[#1f2a6b] font-medium"
                                        >
                                            View
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
