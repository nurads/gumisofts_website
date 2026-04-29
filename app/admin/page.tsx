import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
    FiInbox,
    FiMail,
    FiUserCheck,
    FiBriefcase,
    FiBox,
    FiTool,
    FiFolder,
    FiStar,
    FiBookOpen,
    FiArrowRight,
} from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const [
        leadsTotal,
        leadsNew,
        newsletterTotal,
        applicationsPending,
        applicationsTotal,
        jobsActive,
        productsActive,
        servicesActive,
        projectsTotal,
        testimonialsTotal,
        blogTotal,
        recentLeads,
        recentApplications,
    ] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "new" } }),
        prisma.newsletterSubscriber.count({ where: { isActive: true } }),
        prisma.jobApplication.count({ where: { status: "pending" } }),
        prisma.jobApplication.count(),
        prisma.job.count({ where: { isActive: true } }),
        prisma.product.count({ where: { isActive: true } }),
        prisma.service.count({ where: { isActive: true } }),
        prisma.project.count(),
        prisma.testimonial.count(),
        prisma.blogPost.count(),
        prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.jobApplication.findMany({
            orderBy: { appliedAt: "desc" },
            take: 5,
            include: { job: { select: { title: true } } },
        }),
    ]);

    const stats = [
        { label: "New leads", value: leadsNew, sub: `${leadsTotal} total`, icon: FiInbox, href: "/admin/leads", accent: true },
        { label: "Pending applications", value: applicationsPending, sub: `${applicationsTotal} total`, icon: FiUserCheck, href: "/admin/applications", accent: true },
        { label: "Newsletter subscribers", value: newsletterTotal, sub: "active", icon: FiMail, href: "/admin/newsletter" },
        { label: "Active jobs", value: jobsActive, sub: "live postings", icon: FiBriefcase, href: "/admin/jobs" },
    ];

    const contentStats = [
        { label: "Products", value: productsActive, icon: FiBox, href: "/admin/products" },
        { label: "Services", value: servicesActive, icon: FiTool, href: "/admin/services" },
        { label: "Projects", value: projectsTotal, icon: FiFolder, href: "/admin/projects" },
        { label: "Testimonials", value: testimonialsTotal, icon: FiStar, href: "/admin/testimonials" },
        { label: "Blog posts", value: blogTotal, icon: FiBookOpen, href: "/admin/blog" },
    ];

    return (
        <>
            <AdminPageHeader
                title="Dashboard"
                description="Snapshot of your CRM, content, and inbound activity"
            />

            <div className="p-8 space-y-8">
                {/* Primary CRM stats */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                        CRM
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <Link
                                key={s.label}
                                href={s.href}
                                className={`group bg-white rounded-xl border ${s.accent ? "border-[#2b3991]" : "border-gray-200"
                                    } p-5 hover:shadow-md transition-all`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-9 h-9 bg-[#2b3991]/10 text-[#2b3991] rounded-lg flex items-center justify-center">
                                        <s.icon className="w-5 h-5" />
                                    </div>
                                    <FiArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2b3991] group-hover:translate-x-0.5 transition-all" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-0.5">
                                    {s.value}
                                </div>
                                <div className="text-sm text-gray-600">{s.label}</div>
                                <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Content stats */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                        Content
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {contentStats.map((s) => (
                            <Link
                                key={s.label}
                                href={s.href}
                                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-[#2b3991] transition-all"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <s.icon className="w-4 h-4 text-[#2b3991]" />
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {s.label}
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recent activity */}
                <section className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">Recent leads</h3>
                            <Link
                                href="/admin/leads"
                                className="text-xs text-[#2b3991] hover:text-[#1f2a6b] font-medium"
                            >
                                View all
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {recentLeads.length === 0 && (
                                <li className="px-5 py-6 text-sm text-gray-400 text-center">
                                    No leads yet
                                </li>
                            )}
                            {recentLeads.map((lead) => (
                                <li key={lead.id} className="px-5 py-3 hover:bg-gray-50">
                                    <Link href={`/admin/leads/${lead.id}`} className="block">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="font-medium text-sm text-gray-900 truncate">
                                                {lead.fullName}
                                            </div>
                                            <span
                                                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${lead.status === "new"
                                                    ? "bg-[#2b3991]/10 text-[#2b3991]"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {lead.email}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1 line-clamp-1">
                                            {lead.content}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Recent applications
                            </h3>
                            <Link
                                href="/admin/applications"
                                className="text-xs text-[#2b3991] hover:text-[#1f2a6b] font-medium"
                            >
                                View all
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {recentApplications.length === 0 && (
                                <li className="px-5 py-6 text-sm text-gray-400 text-center">
                                    No applications yet
                                </li>
                            )}
                            {recentApplications.map((a) => (
                                <li key={a.id} className="px-5 py-3 hover:bg-gray-50">
                                    <Link href={`/admin/applications/${a.id}`} className="block">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="font-medium text-sm text-gray-900 truncate">
                                                {a.fullName}
                                            </div>
                                            <span
                                                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${a.status === "pending"
                                                    ? "bg-[#2b3991]/10 text-[#2b3991]"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {a.status}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {a.email}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            for <span className="font-medium">{a.job?.title}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
