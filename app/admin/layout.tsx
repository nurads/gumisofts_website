import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import {
    FiHome,
    FiInbox,
    FiMail,
    FiUserCheck,
    FiBriefcase,
    FiBox,
    FiTool,
    FiFolder,
    FiStar,
    FiBookOpen,
    FiSettings,
    FiUsers,
    FiLogOut,
} from "react-icons/fi";

const navGroups: { title: string; items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] }[] = [
    {
        title: "Overview",
        items: [{ label: "Dashboard", href: "/admin", icon: FiHome }],
    },
    {
        title: "CRM",
        items: [
            { label: "Leads", href: "/admin/leads", icon: FiInbox },
            { label: "Newsletter", href: "/admin/newsletter", icon: FiMail },
            { label: "Job Applications", href: "/admin/applications", icon: FiUserCheck },
        ],
    },
    {
        title: "Content",
        items: [
            { label: "Products", href: "/admin/products", icon: FiBox },
            { label: "Services", href: "/admin/services", icon: FiTool },
            { label: "Projects", href: "/admin/projects", icon: FiFolder },
            { label: "Testimonials", href: "/admin/testimonials", icon: FiStar },
            { label: "Jobs", href: "/admin/jobs", icon: FiBriefcase },
            { label: "Blog", href: "/admin/blog", icon: FiBookOpen },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Company Info", href: "/admin/company", icon: FiSettings },
            { label: "Users", href: "/admin/users", icon: FiUsers },
        ],
    },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // Login page is wrapped by this layout too — when no session, just render children
    // (the login page). Middleware enforces auth for all other admin routes.
    if (!session?.user) {
        // Allow rendering of children for the login page (path /admin/login).
        // We can't read pathname here easily, so we rely on middleware to gate.
        return <main className="min-h-screen bg-gray-50">{children}</main>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-30">
                <div className="px-6 py-5 border-b border-gray-200">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#2b3991] rounded-lg flex items-center justify-center text-white font-bold">
                            G
                        </div>
                        <div>
                            <div className="text-sm font-bold text-[#2b3991] leading-tight">
                                Gumisofts
                            </div>
                            <div className="text-xs text-gray-500 leading-tight">Admin · CRM</div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {navGroups.map((group) => (
                        <div key={group.title}>
                            <div className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                {group.title}
                            </div>
                            <ul className="space-y-0.5">
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2b3991] rounded-md transition-colors"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-gray-200 p-4">
                    <div className="text-sm font-medium text-gray-900 truncate">
                        {session.user.name || session.user.email}
                    </div>
                    <div className="text-xs text-gray-500 mb-3 truncate">
                        {session.user.email}
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/admin/login" });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-200 hover:border-[#2b3991] hover:text-[#2b3991] rounded-md transition-colors"
                        >
                            <FiLogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 ml-64">{children}</div>
        </div>
    );
}
