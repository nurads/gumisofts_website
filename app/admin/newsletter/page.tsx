import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { deleteSubscriber, toggleSubscriber } from "@/lib/admin-actions";
import { FiTrash2 } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
    const subs = await prisma.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: "desc" },
    });

    const activeCount = subs.filter((s) => s.isActive).length;

    return (
        <>
            <AdminPageHeader
                title="Newsletter"
                description={`${activeCount} active · ${subs.length} total subscribers`}
            />
            <div className="p-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Subscribed</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {subs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-12 text-center text-gray-400">
                                        No subscribers yet.
                                    </td>
                                </tr>
                            )}
                            {subs.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{s.email}</td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">
                                        {new Date(s.subscribedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${s.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {s.isActive ? "active" : "unsubscribed"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <form action={toggleSubscriber.bind(null, s.id)}>
                                                <button
                                                    type="submit"
                                                    className="text-xs px-2 py-1 rounded border border-gray-200 hover:border-[#2b3991] hover:text-[#2b3991]"
                                                >
                                                    {s.isActive ? "Unsubscribe" : "Resubscribe"}
                                                </button>
                                            </form>
                                            <form action={deleteSubscriber.bind(null, s.id)}>
                                                <button
                                                    type="submit"
                                                    className="text-xs p-1.5 rounded border border-gray-200 hover:border-red-300 hover:text-red-700"
                                                    aria-label="Delete"
                                                >
                                                    <FiTrash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </form>
                                        </div>
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
