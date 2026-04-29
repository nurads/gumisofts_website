import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { updateApplication, deleteApplication } from "@/lib/admin-actions";
import { FiArrowLeft, FiTrash2, FiDownload, FiLinkedin } from "react-icons/fi";

const STATUS_OPTIONS = ["pending", "reviewed", "interview", "hired", "rejected"];

export default async function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const application = await prisma.jobApplication.findUnique({
        where: { id },
        include: { job: true },
    });
    if (!application) notFound();

    const updateAction = updateApplication.bind(null, id);
    const deleteAction = deleteApplication.bind(null, id);

    return (
        <>
            <AdminPageHeader
                title={application.fullName}
                description={`Application for ${application.job?.title ?? "—"}`}
            >
                <Link
                    href="/admin/applications"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200"
                >
                    <FiArrowLeft className="w-4 h-4" /> Back
                </Link>
            </AdminPageHeader>

            <div className="p-8 grid lg:grid-cols-3 gap-6 max-w-6xl">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-xs text-gray-500 uppercase mb-0.5">Email</div>
                            <a className="text-gray-800" href={`mailto:${application.email}`}>
                                {application.email}
                            </a>
                        </div>
                        {application.linkedIn && (
                            <div>
                                <div className="text-xs text-gray-500 uppercase mb-0.5">LinkedIn</div>
                                <a
                                    href={application.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2b3991] hover:underline inline-flex items-center gap-1"
                                >
                                    <FiLinkedin className="w-4 h-4" /> Profile
                                </a>
                            </div>
                        )}
                        <div>
                            <div className="text-xs text-gray-500 uppercase mb-0.5">Applied</div>
                            <div className="text-gray-800">
                                {new Date(application.appliedAt).toLocaleString()}
                            </div>
                        </div>
                        {application.resumeUrl && (
                            <div>
                                <div className="text-xs text-gray-500 uppercase mb-0.5">Resume</div>
                                <a
                                    href={application.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2b3991] hover:underline inline-flex items-center gap-1"
                                >
                                    <FiDownload className="w-4 h-4" /> Download
                                </a>
                            </div>
                        )}
                    </div>

                    {application.coverLetter && (
                        <div className="pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-500 uppercase mb-2">Cover letter</div>
                            <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
                                {application.coverLetter}
                            </div>
                        </div>
                    )}
                </div>

                <form
                    action={updateAction}
                    className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 h-fit"
                >
                    <h2 className="font-semibold text-gray-900">Hiring status</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Status
                        </label>
                        <select
                            name="status"
                            defaultValue={application.status}
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
                            defaultValue={application.notes ?? ""}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991] resize-none"
                            placeholder="Interview feedback, next steps..."
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
                            className="w-full inline-flex items-center justify-center gap-2 text-sm text-red-700 hover:bg-red-50 px-3 py-2 rounded-md border border-red-200"
                        >
                            <FiTrash2 className="w-4 h-4" /> Delete application
                        </button>
                    </form>
                </form>
            </div>
        </>
    );
}
