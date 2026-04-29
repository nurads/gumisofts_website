import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { updateLead, deleteLead } from "@/lib/admin-actions";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "won", "lost", "archived"];

export default async function LeadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) notFound();

    const updateAction = updateLead.bind(null, id);
    const deleteAction = deleteLead.bind(null, id);

    return (
        <>
            <AdminPageHeader title={lead.fullName} description={lead.email}>
                <Link
                    href="/admin/leads"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200 hover:border-gray-300"
                >
                    <FiArrowLeft className="w-4 h-4" /> Back
                </Link>
            </AdminPageHeader>

            <div className="p-8 grid lg:grid-cols-3 gap-6 max-w-6xl">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Message
                        </div>
                        <div className="whitespace-pre-wrap text-gray-800">{lead.content}</div>
                    </div>
                    <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm">
                        <div>
                            <dt className="text-xs text-gray-500 uppercase">Email</dt>
                            <dd className="text-gray-800">{lead.email}</dd>
                        </div>
                        {lead.phone && (
                            <div>
                                <dt className="text-xs text-gray-500 uppercase">Phone</dt>
                                <dd className="text-gray-800">{lead.phone}</dd>
                            </div>
                        )}
                        {lead.company && (
                            <div>
                                <dt className="text-xs text-gray-500 uppercase">Company</dt>
                                <dd className="text-gray-800">{lead.company}</dd>
                            </div>
                        )}
                        <div>
                            <dt className="text-xs text-gray-500 uppercase">Source</dt>
                            <dd className="text-gray-800">{lead.source}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-gray-500 uppercase">Received</dt>
                            <dd className="text-gray-800">
                                {new Date(lead.createdAt).toLocaleString()}
                            </dd>
                        </div>
                    </dl>
                </div>

                <form action={updateAction} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 h-fit">
                    <h2 className="font-semibold text-gray-900">Triage</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Status
                        </label>
                        <select
                            name="status"
                            defaultValue={lead.status}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991]"
                        >
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Internal notes
                        </label>
                        <textarea
                            name="notes"
                            rows={6}
                            defaultValue={lead.notes ?? ""}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991] resize-none"
                            placeholder="Anything important about this lead..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold py-2 rounded-md transition-colors"
                    >
                        Save changes
                    </button>

                    <form action={deleteAction}>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 text-sm text-red-700 hover:bg-red-50 px-3 py-2 rounded-md border border-red-200 transition-colors"
                        >
                            <FiTrash2 className="w-4 h-4" /> Delete lead
                        </button>
                    </form>
                </form>
            </div>
        </>
    );
}
